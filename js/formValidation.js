const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (userPrefersDark) {
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/dark.css">');
} else if (userPrefersLight) {
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/light.css">');
} else {
  document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/dark.css">');
}

let inputsArray = [];
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.validate-form')) {
    const submitBtn = document.querySelector('#submit');
    const inputs = document.querySelectorAll('.form-input:not(.custom)');
    const phoneInputs = document.querySelectorAll('.form-input.custom.phone');
    const cleavePhone = new Cleave('.form-input.custom.phone', {
      phone: true,
      delimiter: '-',
      phoneRegionCode: 'MX',
    });

    // Se crea un arreglo de objetos por cada input donde cada objeto tiene su id y una llave para identificar si es valido
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach((inp) => {
      const infoInput = {
        id: inp.id,
        isValid: false,
      };

      inputsArray = [...inputsArray, infoInput];
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

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.add('loading');
      setTimeout(() => {
        if (inputsArray.some((inp) => inp.isValid === false)) {
          e.target.classList.add('invalid');
          e.target.querySelector('span').innerText = 'Datos Incorrectos';
          e.target.classList.remove('loading');
        } else {
          e.target.classList.add('valid');
          e.target.querySelector('span').innerText = '\u2713 Todo bien!';
          e.target.classList.remove('loading');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 800);
        }
      }, 800);
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
    if (e.target.value === '') {
      invalid(e);
    } else if (e.target.value !== '') {
      valid(e);
    }
  }

  // Validar el formato del input para mostrar u ocultar los iconos y mensaje de feedback
  /**
   * @param {Event} e
   */
  function validatePhoneFormat(e) {
    if (/\d{2}-(\d{4}-)(\d{4})/g.test(e.target.value)) {
      valid(e);
    } else {
      invalid(e);
    }
  }

  function valid(e) {
    const error = e.target.parentElement.querySelector('.fa-times');
    const good = e.target.parentElement.querySelector('.fa-check');
    const invalidFormatFeedback = e.target.parentElement.querySelector('.feedback .input-invalid');
    const validFormatFeedback = e.target.parentElement.querySelector('.feedback .input-valid');
    good.classList.add('show');
    error.classList.remove('show');
    if (invalidFormatFeedback) invalidFormatFeedback.classList.remove('show');
    if (validFormatFeedback) validFormatFeedback.classList.add('show');
    // Cuando es valido se busca su id en los objetos y se actualiza su atributo isValid a verdadero
    inputsArray.forEach((inp) => {
      if (inp.id === e.target.id) inp.isValid = true;
    });
  }

  function invalid(e) {
    const error = e.target.parentElement.querySelector('.fa-times');
    const good = e.target.parentElement.querySelector('.fa-check');
    const invalidFormatFeedback = e.target.parentElement.querySelector('.feedback .input-invalid');
    const validFormatFeedback = e.target.parentElement.querySelector('.feedback .input-valid');
    good.classList.remove('show');
    error.classList.add('show');
    if (invalidFormatFeedback) invalidFormatFeedback.classList.add('show');
    if (validFormatFeedback) validFormatFeedback.classList.remove('show');
    inputsArray.forEach((inp) => {
      if (inp.id === e.target.id) inp.isValid = false;
    });
  }

  // TODO por medio de una clase que se pueda elegir si la validacion se hace al escribir o solo al salir del input
});
