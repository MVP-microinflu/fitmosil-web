const packGoals = {
  muscle: {
    name: 'ganancia de músculo',
    description: 'Entrenamiento de fuerza y nutrición orientados a construir masa muscular y progresar con una estructura clara.',
    training: 'Entrenamiento orientado a ganar músculo',
    button: 'Consultar pack · ganar músculo'
  },
  fat: {
    name: 'pérdida de grasa',
    description: 'Entrenamiento y nutrición orientados a perder grasa, mantener tu masa muscular y construir hábitos sostenibles.',
    training: 'Entrenamiento orientado a perder grasa',
    button: 'Consultar pack · perder grasa'
  }
};
function updatePackGoal() {
  const selection = document.querySelector('input[name="pack-goal"]:checked').value;
  const goal = packGoals[selection];
  document.querySelector('#goal-description').textContent = goal.description;
  document.querySelector('#training-benefit').textContent = goal.training;
  const contact = document.querySelector('#pack-contact');
  contact.textContent = goal.button;
  contact.href = `https://wa.me/34674088093?text=${encodeURIComponent(`Hola Santi, quiero información sobre el pack de ${goal.name} de 20,95 € cada 4 semanas.`)}`;
}
document.querySelectorAll('input[name="pack-goal"]').forEach((input) => input.addEventListener('change', updatePackGoal));
updatePackGoal();

const waitlistDialog = document.querySelector('#lista-espera');
document.querySelectorAll('a[href="#lista-espera"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    waitlistDialog.showModal();
    document.body.classList.add('modal-open');
  });
});
waitlistDialog.querySelector('.dialog-close').addEventListener('click', () => waitlistDialog.close());
waitlistDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
waitlistDialog.addEventListener('click', (event) => {
  if (event.target !== waitlistDialog) return;
  const bounds = waitlistDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) waitlistDialog.close();
});

document.querySelector('#waitlist-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const subject = `Método FM: ${values.get('interes')}`;
  const body = `Nombre: ${values.get('nombre')}\nEmail: ${values.get('email')}\nSolicitud: ${values.get('interes')}\nObjetivo: ${values.get('objetivo')}\n\n${values.get('mensaje')}\n\nHe leído la política de privacidad y acepto que me contactes sobre esta solicitud.`;
  const emailUrl = `mailto:mosilfit@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = document.querySelector('#form-status');
  status.replaceChildren(document.createTextNode('Solicitud preparada. Envíala desde tu aplicación de correo para completar el proceso. '));
  const retry = document.createElement('a');
  retry.href = emailUrl;
  retry.textContent = 'Abrir el correo';
  status.append(retry);
  window.location.href = emailUrl;
});
