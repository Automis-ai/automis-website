// Shader della rete. Colori scritti in sRGB direttamente (niente conversione in uscita):
// blu #3C91E6, azzurro #B4C2FF, oro caldo solo per l'impulso finale della catena.

const COMMON = /* glsl */ `
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  uniform vec4 uText;      // centro e raggi della zona del testo, in coordinate di schermo
  uniform float uTextDim;  // quanto resta visibile la rete dietro il testo
  float textMask(vec2 ndc) {
    vec2 q = (ndc - uText.xy) / uText.zw;
    return mix(uTextDim, 1.0, smoothstep(0.62, 1.25, length(q)));
  }
`;

// ---------- punti-nodo e bokeh ----------
export const dotsVert = /* glsl */ `
  ${COMMON}
  attribute float aSize;
  attribute float aTone;
  attribute vec2 aState; // x vita (0 invisibile, 1 pieno), y lampo (0..1)
  uniform float uScale;
  uniform float uPR;
  uniform vec2 uMouse;
  uniform float uMouseOn;
  uniform float uAspect;
  uniform vec4 uWave;    // centro (xyz) e raggio dell'onda dorata
  uniform vec2 uWaveP;   // spessore, forza
  varying float vA;
  varying float vG;
  varying float vTone;
  varying float vBand;
  varying float vMask;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vec2 ndc = gl_Position.xy / gl_Position.w;
    float dist = -mv.z;
    float far = smoothstep(12.0, 26.0, dist);
    float m = smoothstep(0.34, 0.0, length((ndc - uMouse) * vec2(uAspect, 1.0))) * uMouseOn;
    float wd = abs(distance(position, uWave.xyz) - uWave.w);
    vBand = smoothstep(uWaveP.x, 0.0, wd) * uWaveP.y;
    vG = clamp(aState.y + m * 0.85, 0.0, 1.0);
    vA = aState.x * mix(1.0, 0.5, far);
    vTone = aTone;
    vMask = textMask(ndc);
    float size = aSize * (1.0 + vG * 0.9 + vBand * 0.5);
    gl_PointSize = clamp(size * uScale * uPR / dist, 1.0, 96.0 * uPR);
  }
`;

export const dotsFrag = /* glsl */ `
  varying float vA;
  varying float vG;
  varying float vTone;
  varying float vBand;
  varying float vMask;
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float halo = pow(1.0 - d, 2.4);
    float core = smoothstep(0.36, 0.16, d);
    vec3 col = mix(BLUE, AZURE, clamp(vTone * 0.7 + vG, 0.0, 1.0));
    col = mix(col, vec3(1.0), core * (0.35 + vG * 0.5));
    col = mix(col, GOLD, clamp(vBand, 0.0, 1.0) * 0.9);
    float a = (halo * 0.62 + core * 1.0) * vA * vMask * (1.0 + vG * 1.3 + vBand * 1.1);
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;

// ---------- collegamenti: nastri sottili in spazio schermo ----------
export const linesVert = /* glsl */ `
  ${COMMON}
  attribute vec3 aOther;
  attribute float aSide;
  attribute float aDir;
  attribute vec2 aState; // x comparsa, y energia (il pacchetto è appena passato)
  uniform vec2 uRes;     // pixel del canvas
  uniform float uWidth;  // spessore in pixel
  uniform vec4 uWave;
  uniform vec2 uWaveP;
  varying float vSide;
  varying float vA;
  varying float vE;
  varying float vBand;
  void main() {
    vec4 ca = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 cb = projectionMatrix * modelViewMatrix * vec4(aOther, 1.0);
    vec2 sa = ca.xy / ca.w;
    vec2 sb = cb.xy / cb.w;
    vec2 dir = (sb - sa) * uRes * aDir;
    float len = max(length(dir), 0.0001);
    dir /= len;
    vec2 nrm = vec2(-dir.y, dir.x);
    vec2 off = nrm * aSide * uWidth / uRes;
    vec4 clip = ca;
    clip.xy += off * clip.w;
    gl_Position = clip;
    float dist = max(0.1, clip.w);
    float far = smoothstep(12.0, 26.0, dist);
    vSide = aSide;
    vE = aState.y;
    vA = aState.x * mix(1.0, 0.35, far) * textMask(sa);
    float wd = abs(distance(position, uWave.xyz) - uWave.w);
    vBand = smoothstep(uWaveP.x, 0.0, wd) * uWaveP.y;
  }
`;

export const linesFrag = /* glsl */ `
  uniform float uRest;
  varying float vSide;
  varying float vA;
  varying float vE;
  varying float vBand;
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  void main() {
    float edge = 1.0 - smoothstep(0.35, 1.0, abs(vSide));
    vec3 col = mix(mix(BLUE, AZURE, 0.22), AZURE, clamp(vE * 1.2, 0.0, 1.0));
    col = mix(col, vec3(1.0), vE * vE * 0.5);
    col = mix(col, GOLD, clamp(vBand, 0.0, 1.0) * 0.8);
    float a = (uRest + vE * 0.66 + vBand * 0.9) * vA * edge;
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;

// ---------- pacchetti di luce: testa luminosa + scia a nastro ----------
export const headsVert = /* glsl */ `
  ${COMMON}
  attribute float aSize;
  attribute float aAlpha;
  attribute float aFree; // 1: il pacchetto del filo verso il bottone, mai attenuato dalla zona del testo
  uniform float uScale;
  uniform float uPR;
  varying float vA;
  varying float vMask;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vec2 ndc = gl_Position.xy / gl_Position.w;
    float dist = -mv.z;
    // dietro il testo i pacchetti restano visibili ma più tenui (metà)
    vMask = mix(mix(0.5, 1.0, (textMask(ndc) - uTextDim) / max(1.0 - uTextDim, 0.001)), 1.0, aFree);
    vA = aAlpha;
    gl_PointSize = clamp(aSize * uScale * uPR / dist, 0.0, 64.0 * uPR);
  }
`;

export const headsFrag = /* glsl */ `
  varying float vA;
  varying float vMask;
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float halo = pow(1.0 - d, 2.2);
    float mid = smoothstep(0.62, 0.0, d);
    float core = smoothstep(0.30, 0.05, d);
    vec3 col = mix(vec3(0.30, 0.62, 1.0), AZURE, halo);
    col = mix(col, vec3(1.0), clamp(core + mid * 0.25, 0.0, 1.0));
    float a = (halo * 0.85 + mid * 0.7 + core * 1.0) * vA * vMask;
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;

export const tailsVert = /* glsl */ `
  ${COMMON}
  attribute vec3 aOther;
  attribute float aSide;
  attribute float aDir;
  attribute vec4 aT;     // x lungo la scia (0 coda, 1 testa), y larghezza in pixel alla testa, z opacità, w 1 = mai attenuata dalla zona del testo
  uniform vec2 uRes;
  uniform float uPR;
  varying float vSide;
  varying float vAlong;
  varying float vA;
  varying float vFree;
  void main() {
    vec4 ca = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 cb = projectionMatrix * modelViewMatrix * vec4(aOther, 1.0);
    vec2 sa = ca.xy / ca.w;
    vec2 sb = cb.xy / cb.w;
    vec2 dir = (sb - sa) * uRes * aDir;
    dir /= max(length(dir), 0.0001);
    vec2 nrm = vec2(-dir.y, dir.x);
    // larghezza lungo la scia: cresce dalla coda; il pacchetto del filo del bottone (aT.w) ha la forma di una cometa, che si stringe verso la testa
    float prof = mix(0.18, 1.0, aT.x);
    float comet = mix(0.14, 1.0, smoothstep(0.0, 0.72, aT.x)) * mix(1.0, 0.3, smoothstep(0.78, 1.0, aT.x));
    float w = aT.y * uPR * mix(prof, comet, aT.w);
    vec4 clip = ca;
    clip.xy += nrm * aSide * w / uRes * clip.w;
    gl_Position = clip;
    vSide = aSide;
    vAlong = aT.x;
    vFree = aT.w;
    vA = aT.z * mix(mix(0.5, 1.0, (textMask(sa) - uTextDim) / max(1.0 - uTextDim, 0.001)), 1.0, aT.w);
  }
`;

export const tailsFrag = /* glsl */ `
  varying float vSide;
  varying float vAlong;
  varying float vA;
  varying float vFree;
  void main() {
    float edge = 1.0 - smoothstep(0.2, 1.0, abs(vSide));
    vec3 col = mix(vec3(0.235, 0.569, 0.902), vec3(0.9, 0.95, 1.0), pow(vAlong, 1.4));
    // il pacchetto del filo del bottone (primo piano): anima bianca e più intensità
    float core = 1.0 - smoothstep(0.0, 0.45, abs(vSide));
    col = mix(col, vec3(1.0), core * vFree * pow(vAlong, 2.0));
    float a = pow(vAlong, 1.45) * edge * vA * 1.15 * (1.0 + vFree * 0.6);
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;

// ---------- pannello di vetro (estruso, angoli tondi) ----------
export const plateVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vNo;
  varying vec2 vL;
  void main() {
    vL = position.xy;
    vNo = normal;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const plateFrag = /* glsl */ `
  uniform vec2 uHalf;
  uniform float uRad;
  uniform float uAct;
  uniform float uOpacity;
  uniform float uGold;
  uniform float uTime;
  uniform float uBlur;   // profondità di campo: 0 a fuoco, 1 molto sfocato (primo piano)
  uniform float uDim;    // velo del fondo: 1 normale, meno = più lontano
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vNo;
  varying vec2 vL;
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  float sdRound(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    float sd = sdRound(vL, uHalf, uRad);
    vec3 rimCol = mix(mix(BLUE, AZURE, 0.3 + uAct * 0.35), GOLD, uGold);
    float fres = pow(1.0 - clamp(abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0), 2.0);
    vec4 outc;
    if (abs(vNo.z) < 0.5) {
      // fianco: il bordo spesso del vetro, illuminato
      outc = vec4(rimCol * (0.5 + uAct * 0.42 + fres * 0.25), 0.9 * (1.0 - uBlur * 0.9));
    } else if (vNo.z > 0.0) {
      float rim = exp(sd * mix(26.0, 7.0, uBlur)) * (1.0 - uBlur * 0.35);
      float g = smoothstep(-0.9, 0.9, vL.y + vL.x * 0.35);
      vec3 base = mix(vec3(0.035, 0.095, 0.185), vec3(0.115, 0.265, 0.47), g);
      float sweep = fract(uTime * 0.11 + 0.15);
      float band = smoothstep(0.16, 0.0, abs((vL.x * 0.62 + vL.y * 0.78) * 0.5 + 0.5 - (sweep * 1.5 - 0.25)));
      vec3 col = base + rimCol * rim * (0.55 + uAct * 0.9) + AZURE * band * 0.1 + BLUE * uAct * 0.1;
      float a = 0.66 + rim * 0.28 + band * 0.08 + uAct * 0.1;
      // sfocato: il bordo si scioglie verso l'interno invece di tagliare netto
      a *= 1.0 - smoothstep(-0.16 * uBlur - 0.0001, 0.0, sd) * step(0.001, uBlur);
      outc = vec4(col, a);
    } else {
      outc = vec4(vec3(0.02, 0.06, 0.12) + rimCol * 0.1, 0.42 * (1.0 - uBlur));
    }
    outc.rgb *= mix(0.78, 1.0, uDim);
    outc.a *= uOpacity * uDim;
    gl_FragColor = outc;
  }
`;

export const planeVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const iconFrag = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uAct;
  uniform float uOpacity;
  uniform float uGold;
  uniform float uBlur;
  uniform float uDim;
  varying vec2 vUv;
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  void main() {
    // la sfocatura è un livello di mipmap più alto: l'icona si scioglie senza costare un secondo passaggio
    float a = texture2D(uMap, vUv, uBlur * 4.5).a;
    vec3 col = mix(mix(AZURE, vec3(1.0), 0.28), vec3(1.0), uAct * 0.8);
    col = mix(col, mix(GOLD, vec3(1.0), 0.35), uGold);
    gl_FragColor = vec4(col, a * (0.95 + uAct * 0.05) * uOpacity * uDim * (1.0 - uBlur * 0.3));
  }
`;

export const haloFrag = /* glsl */ `
  uniform float uAct;
  uniform float uRing;   // raggio dell'anello che si espande (0..1)
  uniform float uRingA;  // forza dell'anello
  uniform float uGold;
  uniform float uOpacity;
  uniform float uBreath;
  uniform float uBlur;
  uniform float uDim;
  varying vec2 vUv;
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    float glow = exp(-r * r * mix(9.0, 6.0, uBlur)) * (0.14 + uBreath * 0.05 + uAct * 0.7);
    float ring = smoothstep(0.05 + 0.07 * uRing, 0.0, abs(r - uRing)) * uRingA;
    vec3 col = mix(mix(BLUE, AZURE, 0.35 + uAct * 0.4), GOLD, uGold);
    vec3 rcol = mix(AZURE, GOLD, uGold);
    float a = (glow + ring * 0.85) * uOpacity * uDim;
    vec3 c = mix(col, rcol, clamp(ring * 1.5, 0.0, 1.0));
    gl_FragColor = vec4(c, clamp(a, 0.0, 1.0));
  }
`;

// ---------- i collegamenti fra i moduli (la «dorsale» del sistema): sempre accesi, con impulsi che scorrono ----------
export const spineVert = /* glsl */ `
  ${COMMON}
  attribute vec3 aOther;
  attribute float aSide;
  attribute float aDir;
  attribute vec4 aState; // x disegno (0..1, dal centro verso fuori), y energia (scia dietro il pacchetto), z testa del pacchetto lungo A->B (<0: nessuno), w verso (+1 A->B, -1 B->A)
  attribute vec3 aMisc;  // x seme degli impulsi, y fattore di opacità, z orientamento (+1: A più vicino al centro dello schermo)
  attribute float aRoute; // 1: filo verso il bottone, non attenuato dalla zona del testo
  uniform vec2 uRes;
  uniform float uWidth;
  uniform float uPR;
  uniform vec4 uWave;
  uniform vec2 uWaveP;
  varying float vSide;
  varying float vU;
  varying float vLen;
  varying vec4 vS;
  varying vec3 vM;
  varying float vA;
  varying float vBand;
  void main() {
    vec4 ca = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 cb = projectionMatrix * modelViewMatrix * vec4(aOther, 1.0);
    vec2 sa = ca.xy / ca.w;
    vec2 sb = cb.xy / cb.w;
    vec2 dir = (sb - sa) * uRes * aDir;
    float len = max(length(dir), 0.0001);
    dir /= len;
    vec2 nrm = vec2(-dir.y, dir.x);
    float w = uWidth * (1.0 + 1.15 * aState.y);
    vec2 off = nrm * aSide * w / uRes;
    vec4 clip = ca;
    clip.xy += off * clip.w;
    gl_Position = clip;
    vSide = aSide;
    vU = aDir > 0.0 ? 0.0 : 1.0;
    vLen = length((sb - sa) * uRes) * 0.5 / uPR;
    vS = aState;
    vM = aMisc;
    float dist = max(0.1, clip.w);
    vA = aMisc.y * mix(1.0, 0.55, smoothstep(14.0, 28.0, dist)) * mix(textMask(sa), 1.0, aRoute);
    float wd = abs(distance(position, uWave.xyz) - uWave.w);
    vBand = smoothstep(uWaveP.x, 0.0, wd) * uWaveP.y;
  }
`;

export const spineFrag = /* glsl */ `
  uniform float uTime;
  varying float vSide;
  varying float vU;
  varying float vLen;
  varying vec4 vS;
  varying vec3 vM;
  varying float vA;
  varying float vBand;
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
  void main() {
    float u = vU;
    float uu = vM.z > 0.0 ? u : 1.0 - u;
    float draw = vS.x >= 0.999 ? 1.0 : 1.0 - smoothstep(vS.x - 0.14, vS.x, uu);
    float a1 = abs(vSide);
    float core = 1.0 - smoothstep(0.16, 0.46, a1);
    float glow = exp(-a1 * a1 * 5.0);
    // impulsi che scorrono sempre: il sistema parla, anche quando nessuna catena è in corso
    float dirSign = vM.x > 0.5 ? 1.0 : -1.0;
    float f = fract(u * vLen / 150.0 - uTime * 0.42 * dirSign + vM.x * 7.0);
    float dash = smoothstep(0.0, 0.02, f) * (1.0 - smoothstep(0.02, 0.2, f));
    // luce dietro al pacchetto che sta correndo
    float head = vS.z;
    float behind = 0.0;
    if (head >= 0.0) {
      behind = vS.w > 0.0 ? step(u, head) * smoothstep(head - 0.65, head, u) : step(head, u) * smoothstep(head + 0.65, head, u);
    }
    float lit = clamp(vS.y + behind, 0.0, 1.0);
    vec3 col = mix(mix(BLUE, AZURE, 0.2), AZURE, lit);
    col = mix(col, vec3(1.0), lit * lit * 0.55 + dash * 0.3);
    col = mix(col, GOLD, clamp(vBand, 0.0, 1.0) * 0.85);
    float rest = 0.5;
    float a = (core * (rest + dash * 0.32 + lit * 0.5 + vBand * 0.7) + glow * (0.18 + lit * 0.34)) * vA * draw;
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;
