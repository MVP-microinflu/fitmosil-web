const goals = {
  cut: { name: 'FM CUT', copy: 'Entrenamiento y nutrición enfocados en perder grasa, mantener tu masa muscular y construir hábitos sostenibles.', training: 'Un plan orientado a perder grasa, con registro de marcas, pesos y evolución.' },
  build: { name: 'FM BUILD', copy: 'Entrenamiento de fuerza y nutrición enfocados en construir masa muscular y progresar con una estructura clara.', training: 'Un plan de fuerza orientado a ganar músculo, con registro de marcas, pesos y evolución.' }
};
const purchase = document.querySelector('#purchase');
const dialog = document.querySelector('#checkout-dialog');
function updateGoal() {
  const selected = goals[document.querySelector('input[name="objective"]:checked').value];
  document.querySelector('#goal-copy').textContent = selected.copy;
  document.querySelector('#training-copy').textContent = selected.training;
  document.querySelector('#checkout-plan').textContent = selected.name;
  purchase.textContent = `QUIERO ${selected.name}`;
}
document.querySelectorAll('input[name="objective"]').forEach(input => input.addEventListener('change', updateGoal));
updateGoal();
purchase.addEventListener('click', () => { dialog.showModal(); document.body.classList.add('modal-open'); });
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('#back-to-pack').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
