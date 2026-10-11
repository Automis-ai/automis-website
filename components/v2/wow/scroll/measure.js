/*
  Misure che non vengono falsate dai transform.
  Le schede in entrata sono inclinate, spostate e in scala da gsap: getBoundingClientRect() darebbe misure sbagliate.
  La catena di offsetTop / offsetLeft invece le ignora: dà la posizione «a riposo» dentro un antenato (`stop`).
*/
export function offsetIn(el, stop, axis) {
  const prop = axis === "x" ? "offsetLeft" : "offsetTop";
  let v = 0;
  let n = el;
  while (n && n !== stop) {
    v += n[prop];
    n = n.offsetParent;
  }
  if (n === stop) return v;
  // `stop` non è fra gli offsetParent (non posizionato): si ripiega sui rettangoli
  const a = el.getBoundingClientRect();
  const b = stop.getBoundingClientRect();
  return axis === "x" ? a.left - b.left : a.top - b.top;
}
