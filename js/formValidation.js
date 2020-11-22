document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.validate-form');
  const inputs = document.querySelectorAll('.form-input:not(.custom)');
  const customInputs = document.querySelectorAll('.custom');
  const customPhone = document.querySelector('.custom.phone');
  const cleavePhone = new Cleave('.form-input.custom.phone', {
    phone: true,
    delimiter: '-',
    phoneRegionCode: 'MX',
  });

  function createIconElements(e) {
    let good, wrong;
    const wrongIcon = e.target.parentElement.querySelector('.fas.fa-times');
    if (e.target.value === '' && wrongIcon) {
      good = document.createElement('i');
      good.className = 'fas fa-check';
      e.target.parentElement.appendChild(good);
    } else if (e.target.value === '') {
      good = document.createElement('i');
      good.className = 'fas fa-check';
      e.target.parentElement.appendChild(good);

      wrong = document.createElement('i');
      wrong.className = 'fas fa-times';
      e.target.parentElement.appendChild(wrong);
    }
  }
  function showCheckedIcon(e, option) {
    let good;
    let wrong;
    if (e.target) {
      good = e.target.parentElement.querySelector('.fas.fa-check');
      wrong = e.target.parentElement.querySelector('.fas.fa-times');
    }
    if (option === 'good') {
      good.classList.add('checked');
    } else if (option === 'wrong') {
      wrong.classList.add('checked');
    }
  }
  function removeCheckedIcon(e, option) {
    let good;
    let wrong;
    if (e.target) {
      good = e.target.parentElement.querySelector('.fas.fa-check');
      wrong = e.target.parentElement.querySelector('.fas.fa-times');
    }

    if (option === 'good') {
      good.classList.remove('checked');
    } else if (option === 'wrong') {
      wrong.classList.remove('checked');
    }
  }
  function removeGood(e) {
    const good = e.target.parentElement.querySelector('.fas.fa-check');
    good.remove();
  }
  function removeWrong(e) {
    const wrong = e.target.parentElement.querySelector('.fas.fa-times');
    wrong.remove();
  }

  inputs.forEach((input) => {
    input.addEventListener('focus', (e) => createIconElements(e));

    input.addEventListener('blur', (e) => {
      if (e.target) {
        if (e.target.value === '') {
          removeGood(e);
          showCheckedIcon(e, 'wrong');
        }
      }
    });
    input.addEventListener('input', (e) => {
      if (e.target.value !== '') {
        removeCheckedIcon(e, 'wrong');
        showCheckedIcon(e, 'good');
      } else {
        removeCheckedIcon(e, 'good');
        showCheckedIcon(e, 'wrong');
      }
    });
  });

  customInputs.forEach((custom) => {
    custom.addEventListener('focus', (e) => createIconElements(e));
    custom.addEventListener('blur', (e) => {
      if (e.target) {
        if (e.target.value === '') {
          removeGood(e);
          removeWrong(e);
        }
      }
    });
  });

  customPhone.addEventListener('input', (e) => {
    if (/\d{2}-(\d{4}-)(\d{4})/g.test(e.target.value)) {
      removeCheckedIcon(e, 'wrong');
      showCheckedIcon(e, 'good');
    } else {
      removeCheckedIcon(e, 'good');
      showCheckedIcon(e, 'wrong');
    }
  });
});
