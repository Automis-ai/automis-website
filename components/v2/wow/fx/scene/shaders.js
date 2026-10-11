// Shader delle hero interne. Stessa lingua visiva della hero della home (vetro con bordo che si accende, alone con anello
// di attivazione, blu #3C91E6 e azzurro #B4C2FF, oro solo per il lampo finale della catena), in versione leggera.
// Colori in sRGB direttamente (niente conversione in uscita).

const COLORS = /* glsl */ `
  const vec3 BLUE = vec3(0.2353, 0.5686, 0.9020);
  const vec3 AZURE = vec3(0.7059, 0.7608, 1.0);
  const vec3 GOLD = vec3(0.9608, 0.8039, 0.4745);
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
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vNo;
  varying vec2 vL;
  ${COLORS}
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
      outc = vec4(rimCol * (0.5 + uAct * 0.42 + fres * 0.25), 0.9);
    } else if (vNo.z > 0.0) {
      float rim = exp(sd * 26.0);
      float g = smoothstep(-0.9, 0.9, vL.y + vL.x * 0.35);
      vec3 base = mix(vec3(0.035, 0.095, 0.185), vec3(0.115, 0.265, 0.47), g);
      float sweep = fract(uTime * 0.11 + 0.15);
      float band = smoothstep(0.16, 0.0, abs((vL.x * 0.62 + vL.y * 0.78) * 0.5 + 0.5 - (sweep * 1.5 - 0.25)));
      vec3 col = base + rimCol * rim * (0.55 + uAct * 0.9) + AZURE * band * 0.1 + BLUE * uAct * 0.1;
      float a = 0.7 + rim * 0.26 + band * 0.08 + uAct * 0.1;
      outc = vec4(col, a);
    } else {
      outc = vec4(vec3(0.02, 0.06, 0.12) + rimCol * 0.1, 0.42);
    }
    outc.a *= uOpacity;
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
  varying vec2 vUv;
  ${COLORS}
  void main() {
    float a = texture2D(uMap, vUv).a;
    vec3 col = mix(mix(AZURE, vec3(1.0), 0.28), vec3(1.0), uAct * 0.8);
    col = mix(col, mix(GOLD, vec3(1.0), 0.35), uGold);
    gl_FragColor = vec4(col, a * (0.95 + uAct * 0.05) * uOpacity);
  }
`;

export const haloFrag = /* glsl */ `
  uniform float uAct;
  uniform float uRing;
  uniform float uRingA;
  uniform float uGold;
  uniform float uOpacity;
  uniform float uBreath;
  varying vec2 vUv;
  ${COLORS}
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    float glow = exp(-r * r * 9.0) * (0.16 + uBreath * 0.05 + uAct * 0.7);
    float ring = smoothstep(0.075, 0.0, abs(r - uRing)) * uRingA;
    vec3 col = mix(mix(BLUE, AZURE, 0.35 + uAct * 0.4), GOLD, uGold);
    vec3 rcol = mix(AZURE, GOLD, uGold);
    float a = (glow + ring * 0.85) * uOpacity;
    vec3 c = mix(col, rcol, clamp(ring * 1.5, 0.0, 1.0));
    gl_FragColor = vec4(c, clamp(a, 0.0, 1.0));
  }
`;

// ---------- collegamenti: tubo sottile con pacchetti di dati che corrono e lasciano una scia ----------
// uv.x corre lungo il percorso (0..1). uH0 è il pacchetto della catena, uH1 quello di sottofondo (-1 = spento).
export const edgeVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const edgeFrag = /* glsl */ `
  uniform float uDraw;
  uniform float uH0;
  uniform float uH1;
  uniform float uEn;
  uniform float uGold;
  uniform float uLen;
  uniform float uA;
  uniform float uBase;
  varying vec2 vUv;
  ${COLORS}
  float trail(float h, float x) {
    float d = h - x;
    float L = 120.0 / uLen;
    if (h < 0.0 || d < 0.0 || d > L) return 0.0;
    return pow(1.0 - d / L, 2.0);
  }
  float head(float h, float x) {
    if (h < 0.0) return 0.0;
    float d = (h - x) * uLen;
    return exp(-d * d / 80.0);
  }
  void main() {
    float x = vUv.x;
    if (x > uDraw) discard;
    float t = max(trail(uH0, x), trail(uH1, x) * 0.8);
    float hd = max(head(uH0, x), head(uH1, x) * 0.8);
    float side = 0.62 + 0.38 * abs(sin(vUv.y * 6.2831853));
    vec3 col = mix(BLUE, AZURE, 0.2 + t * 0.6 + uEn * 0.4);
    col = mix(col, vec3(1.0), hd * 0.85 + uEn * uEn * 0.3);
    col = mix(col, GOLD, uGold * (t * 0.7 + uEn * 0.5));
    float ends = smoothstep(0.0, 0.04, x) * smoothstep(1.0, 0.96, x);
    float a = (uBase + t * 0.6 + hd * 0.55 + uEn * 0.4) * uA * side * ends;
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;

// ---------- punti: pacchetti (teste), nodi di contorno, polvere in profondità ----------
export const pointsVert = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aTone;
  uniform float uPR;
  uniform float uD;
  uniform float uTime;
  varying float vA;
  varying float vTone;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = max(1.0, -mv.z);
    vA = aAlpha;
    vTone = aTone;
    gl_PointSize = clamp(aSize * uPR * (uD / dist), 1.0, 90.0 * uPR);
  }
`;

export const pointsFrag = /* glsl */ `
  varying float vA;
  varying float vTone;
  ${COLORS}
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float halo = pow(1.0 - d, 2.4);
    float core = smoothstep(0.36, 0.14, d);
    vec3 col = mix(mix(BLUE, AZURE, clamp(vTone, 0.0, 1.0)), GOLD, clamp(vTone - 1.0, 0.0, 1.0));
    col = mix(col, vec3(1.0), core * 0.55);
    gl_FragColor = vec4(col, clamp((halo * 0.6 + core) * vA, 0.0, 1.0));
  }
`;
