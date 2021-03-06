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
        state: 'empty',
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
        if (inputsArray.some((inp) => inp.state !== 'valid')) {
          e.target.classList.add('invalid');
          e.target.querySelector('span').innerText = 'Datos Incorrectos';
          e.target.classList.remove('loading');

          const isValid = inputsArray.some((inp) => inp.state !== 'valid');
          if (isValid) {
            inputsArray.forEach((inp) => {
              const input = document.querySelector(`#${inp.id}`);
              if (inp.state === 'empty') {
                empty(input);
              } else if (inp.state === 'invalid') {
                invalid(input);
              }
            });
          }
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
  document.querySelectorAll('.form-input.custom').forEach((input) => {
    const warnIcon = document.createElement('i');
    warnIcon.className = 'fas fa-exclamation-triangle';
    input.parentElement.appendChild(warnIcon);
  });

  // Valida el contenido del input para mostrar u ocultar los iconos y mensajes de feedback
  /**
   * @param {Event} e
   */
  function validateEmpty(e) {
    if (e.target.value === '') {
      empty(e.target);
    } else if (e.target.value !== '') {
      valid(e.target);
    }
  }

  // Validar el formato del input para mostrar u ocultar los iconos y mensaje de feedback
  /**
   * @param {Event} e
   */
  function validatePhoneFormat(e) {
    if (e.target.value === '') {
      empty(e.target);
      console.log('empty');
    } else if (/\d{2}-(\d{4}-)(\d{4})/g.test(e.target.value) && e.target.value.length === 12) {
      valid(e.target);
      console.log('valid');
    } else {
      invalid(e.target);
      console.log('invalid');
    }
  }

  function valid(e) {
    const icons = e.parentElement.querySelectorAll('.fas');
    const good = e.parentElement.querySelector('.fa-check');
    const messages = e.parentElement.querySelectorAll('.message');
    const validMessage = e.parentElement.querySelector('.feedback .message.valid');
    e.classList.remove('empty');
    e.classList.remove('invalid');
    icons.forEach((icon) => icon.classList.remove('show'));
    good.classList.add('show');
    messages.forEach((message) => message.classList.remove('show'));
    if (validMessage) validMessage.classList.add('show');
    // Cuando es valido se busca su id en los objetos y se actualiza su atributo state a verdadero
    inputsArray.forEach((inp) => {
      if (inp.id === e.id) inp.state = 'valid';
    });
  }

  function empty(e) {
    const icons = e.parentElement.querySelectorAll('.fas');
    const error = e.parentElement.querySelector('.fa-times');
    const messages = e.parentElement.querySelectorAll('.message');
    const emptyMessage = e.parentElement.querySelector('.feedback .message.empty');
    e.classList.remove('invalid');
    e.classList.add('empty');
    icons.forEach((icon) => icon.classList.remove('show'));
    error.classList.add('show');
    messages.forEach((message) => message.classList.remove('show'));
    if (emptyMessage) emptyMessage.classList.add('show');
    // Cuando es valido se busca su id en los objetos y se actualiza su atributo state a verdadero
    inputsArray.forEach((inp) => {
      if (inp.id === e.id) inp.state = 'empty';
    });
  }

  function invalid(e) {
    const icons = e.parentElement.querySelectorAll('.fas');
    const warn = e.parentElement.querySelector('.fa-exclamation-triangle');
    const messages = e.parentElement.querySelectorAll('.message');
    const invalidMessage = e.parentElement.querySelector('.feedback .message.invalid');
    icons.forEach((icon) => icon.classList.remove('show'));
    e.classList.add('invalid');
    e.classList.remove('empty');
    warn.classList.add('show');
    messages.forEach((message) => message.classList.remove('show'));
    if (invalidMessage) invalidMessage.classList.add('show');
    // Cuando es valido se busca su id en los objetos y se actualiza su atributo state a verdadero
    inputsArray.forEach((inp) => {
      if (inp.id === e.id) inp.state = 'invalid';
    });
  }

  // TODO por medio de una clase que se pueda elegir si la validacion se hace al escribir o solo al salir del input
});
