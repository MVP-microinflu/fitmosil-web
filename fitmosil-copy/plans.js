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

document.querySelector('#waitlist-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled || !form.reportValidity()) return;
  const values = new FormData(form);
  values.set('_subject', `Método FM: ${values.get('interes')}`);
  const status = document.querySelector('#form-status');
  button.disabled = true;
  button.textContent = 'Enviando…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = '';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: values,
      headers: { Accept: 'application/json' },
      credentials: 'omit',
      signal: controller.signal
    });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    status.textContent = 'Solicitud enviada. Gracias por tu interés; te responderé en el email que has indicado.';
  } catch (error) {
    status.textContent = error.name === 'AbortError'
      ? 'No hemos podido confirmar el envío. Comprueba tu conexión y vuelve a intentarlo más tarde.'
      : 'No se ha podido enviar la solicitud. Tus datos siguen aquí; vuelve a intentarlo.';
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    button.textContent = 'Enviar solicitud';
    form.setAttribute('aria-busy', 'false');
  }
});
