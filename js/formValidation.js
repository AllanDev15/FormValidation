const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (userPrefersDark) {
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/dark.css">');
} else if (userPrefersLight) {
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/light.css">');
} else {
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/dark.css">');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.validate-form')) {
    const inputs = document.querySelectorAll('.form-input:not(.custom)');
    const phoneInputs = document.querySelectorAll('.form-input.custom.phone');
    const cleavePhone = new Cleave('.form-input.custom.phone', {
      phone: true,
      delimiter: '-',
      phoneRegionCode: 'MX',
    });
    const correctInputs = true;

    // Cada input se validara de la misma forma al escribir y salir del input
    inputs.forEach((input) => {
      input.addEventListener('blur', validateEmpty);
      input.addEventListener('input', validateEmpty);
    });

    phoneInputs.forEach((input) => {
      input.addEventListener('blur', validatePhoneFormat);
      input.addEventListener('input', validatePhoneFormat);
    });
  }

  // Cargar iconos de aceptacion y error para cada input
  document.querySelectorAll('.form-input').forEach((input) => {
    const errorIcon = document.createElement('i');
    errorIcon.className = 'fas fa-times';
    const goodIcon = document.createElement('i');
    goodIcon.className = 'fas fa-check';

    input.parentElement.appendChild(errorIcon);
    input.parentElement.appendChild(goodIcon);
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
      good.classList.add('show');
      error.classList.remove('show');
      if (invalidFormatFeedback) invalidFormatFeedback.classList.remove('show');
    } else {
      error.classList.add('show');
      good.classList.remove('show');
      if (invalidFormatFeedback) invalidFormatFeedback.classList.add('show');
    }
  }

  // * Muestra un mensaje general de campos incorrectos

  // TODO por medio de una clase que se pueda elegir si la validacion se hace al escribir o solo al salir del input
});
