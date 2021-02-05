document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.form-input:not(.custom)');
  const phoneInputs = document.querySelectorAll('.form-input.custom.phone');
  const cleavePhone = new Cleave('.form-input.custom.phone', {
    phone: true,
    delimiter: '-',
    phoneRegionCode: 'MX',
  });

  // Cargar iconos de aceptacion y error para cada input
  document.querySelectorAll('.form-input').forEach((input) => {
    const errorIcon = document.createElement('i');
    errorIcon.className = 'fas fa-times';
    const goodIcon = document.createElement('i');
    goodIcon.className = 'fas fa-check';

    input.parentElement.appendChild(errorIcon);
    input.parentElement.appendChild(goodIcon);
  });

  // Cada input se validara de la misma forma al escribir y salir del input
  inputs.forEach((input) => {
    input.addEventListener('blur', validateEmpty);
    input.addEventListener('input', validateEmpty);
  });

  phoneInputs.forEach((input) => {
    input.addEventListener('blur', validatePhoneFormat);
    input.addEventListener('input', validatePhoneFormat);
  });

  // Valida el contenido del input para mostrar u ocultar los iconos y mensajes de feedback
  /**
   * @param {Event} e
   */
  function validateEmpty(e) {
    const error = e.target.parentElement.querySelector('.fa-times');
    const good = e.target.parentElement.querySelector('.fa-check');
    const validFeedback = e.target.parentElement.querySelector('.feedback .input-valid');
    const invalidFeedback = e.target.parentElement.querySelector('.feedback .input-invalid');

    if (e.target.value === '') {
      good.classList.remove('show');
      error.classList.add('show');
      if (validFeedback) validFeedback.classList.remove('show');
      if (invalidFeedback) invalidFeedback.classList.add('show');
    } else if (e.target.value !== '') {
      error.classList.remove('show');
      good.classList.add('show');
      if (invalidFeedback) invalidFeedback.classList.remove('show');
      if (validFeedback) validFeedback.classList.add('show');
    }
  }

  // Validar el formato del input para mostrar u ocultar los iconos y mensaje de feedback
  /**
   * @param {Event} e
   */
  function validatePhoneFormat(e) {
    const error = e.target.parentElement.querySelector('.fa-times');
    const good = e.target.parentElement.querySelector('.fa-check');
    const invalidFormatFeedback = e.target.parentElement.querySelector('.feedback .invalid-format');

    if (/\d{2}-(\d{4}-)(\d{4})/g.test(e.target.value)) {
      error.classList.remove('show');
      good.classList.add('show');
      if (invalidFormatFeedback) invalidFormatFeedback.classList.remove('show');
    } else {
      good.classList.remove('show');
      error.classList.add('show');
      if (invalidFormatFeedback) invalidFormatFeedback.classList.add('show');
    }
  }
});
