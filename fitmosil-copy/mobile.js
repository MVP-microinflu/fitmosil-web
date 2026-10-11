(() => {
  const viewport = window.matchMedia('(max-width: 760px)');
  let undo = [];
  let active = false;

  // Save exact insertion points so resizing restores the existing desktop DOM.
  function move(node, parent, before = null) {
    const marker = document.createComment('mobile-position');
    node.before(marker);
    parent.insertBefore(node, before);
    undo.push(() => marker.replaceWith(node));
  }

  function text(node, value) {
    const original = node.textContent;
    node.textContent = value;
    undo.push(() => { node.textContent = original; });
  }

  function render() {
    if (viewport.matches === active) return;
    if (!viewport.matches) {
      undo.reverse().forEach(restore => restore());
      undo = [];
      active = false;
      return;
    }
    active = true;
    const hidden = document.createDocumentFragment();
    const advisory = document.querySelector('.advisory-heading');
    move(document.querySelector('.service-comparison'), advisory.parentNode, advisory);
    text(document.querySelector('.section-heading > p:last-child'), 'Elige tu objetivo. Tu entrenamiento y nutrición, en una misma app.');
    move(document.querySelector('.plan-details > .eyebrow'), hidden);
    move(document.querySelector('.plan-details h3'), hidden);
    move(document.querySelector('.plan-photo span'), hidden);
    const price = document.querySelector('.plan-price');
    const cta = document.querySelector('#pack-contact');
    move(cta, price.parentNode, price.nextSibling);
    const note = document.createElement('p');
    note.className = 'payment-note';
    note.textContent = 'Continúa al pago en Harbiz';
    cta.after(note);
    undo.push(() => note.remove());
    const included = document.createElement('div');
    included.className = 'pack-included';
    note.after(included);
    undo.push(() => included.remove());
    move(document.querySelector('.plan-details h4'), included);
    move(document.querySelector('.plan-features'), included);
    move(document.querySelector('.plan-note'), hidden);
    const step = document.querySelectorAll('.pack-steps li')[1];
    text(step.querySelector('h3'), 'Completa tu compra');
    text(step.querySelector('p'), 'Continúa a Harbiz para revisar tu pack y completar el pago.');
    const eyebrow = advisory.querySelector('.eyebrow');
    move(document.querySelector('.status-label'), eyebrow.parentNode, eyebrow.nextSibling);
    move(document.querySelector('.advisory-status'), hidden);
    const more = document.createElement('details');
    more.className = 'advisory-more';
    const summary = document.createElement('summary');
    summary.textContent = 'Conoce la asesoría Método FM';
    more.append(summary);
    advisory.after(more);
    undo.push(() => more.remove());
    move(document.querySelector('.method'), more);
    move(document.querySelector('.program'), more);
    move(document.querySelector('.steps'), more);
  }

  render();
  viewport.addEventListener('change', render);
  window.addEventListener('load', () => {
    if (!viewport.matches) return;
    const id = window.location.hash.slice(1);
    if (['hero', 'planes', 'pack-completo', 'app', 'asesoria'].includes(id)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    }
  }, { once: true });
})();
