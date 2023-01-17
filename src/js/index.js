(function () {
  window.addEventListener('DOMContentLoaded', function () {
    console.log('test');

    // Кнопка "Позвоните мне"
    const COLLECT_CALL_BTN = this.document.getElementById('collect-call');

    // Окно "Перезвоните мне"
    const CALL_ME_POPUP_WINDOW = this.document.getElementById('call-me-pop-up-window');
    // Кнопка закрыть окно "Перезвоните мне"
    const CLOSE_CAL_ME_WINDOW = CALL_ME_POPUP_WINDOW.querySelector('.close-btn');
    // Форма "Перезвоните мне"
    const CALL_ME_FORM = this.document.forms['call-me-form'];
    // Кнопка "Перезвоните мне" из формы
    const CALL_ME_BTN = CALL_ME_FORM['call-me-button'];
    // Окно "Ваша заявка принята"
    const SUCCESS_ADD_CALL_WINDOW = this.document.getElementById('success-add-pop-up-window');
    // Кнопка закрыть окно "Ваша заявка принята"
    const CLOSE_SUCCESS_ADD_CALL_WINDOW = SUCCESS_ADD_CALL_WINDOW.querySelector('.close-btn');

    /**
     * Открыть окно "Перезвоните мне"
     */
    const clickToCollectCallBtn = () => {
      CALL_ME_POPUP_WINDOW.classList.toggle('show');
    }

    /**
     * Закрыть окно "Перезвоните мне" 
     */
    const closeCallMeWindow = () => {
      CALL_ME_POPUP_WINDOW.classList.toggle('show');
    }

    /**
     * Закрыть окно "Ваша заявка принята" 
     */
    const closeSuccessAddWindow = () => {
      SUCCESS_ADD_CALL_WINDOW.classList.toggle('show');
    }

    COLLECT_CALL_BTN.addEventListener('click', clickToCollectCallBtn);

    CLOSE_CAL_ME_WINDOW.addEventListener('click', closeCallMeWindow);

    CLOSE_SUCCESS_ADD_CALL_WINDOW.addEventListener('click', closeSuccessAddWindow);

    const PATTERN_NUMBER = /^\+[0-9]{12,14}$/;
    const PATTERN_INV_NUMBER = /[^\+\d]/;

    /**
     * Валидатор поля ввода для номера телефона.
     * Возвращает булево значение результата проверки.
     * @param {string} numbers_sting 
     * @returns {boolean}
     */
    const inputPhoneValidator = (numbers_sting) => {
      if (!numbers_sting.length || numbers_sting.length < 13) {
        CALL_ME_BTN.disabled = true;
        return false;
      };

      if (PATTERN_NUMBER.test(numbers_sting)) {
        CALL_ME_BTN.disabled = false;
        return true;
      } else {
        console.warn('Неправильный ввод.', `Найден недопустимый символ - '${numbers_sting[numbers_sting.search(PATTERN_INV_NUMBER)]}'`);
        CALL_ME_BTN.disabled = true;
        return false
      }
      return false; // Если невозможное возможно
    }

    /**
     * Слушатель на событие отжатой кнопки поля ввода телефона
     */
    CALL_ME_FORM['input-phone'].addEventListener('keyup', ({ target }) => {
      inputPhoneValidator(target.value);
    });

    /**
     * Слушатель на чекбокс
     */
    CALL_ME_FORM['check-politics'].addEventListener('change', ({ target }) => {
      console.log(inputPhoneValidator(CALL_ME_FORM['input-phone'].value));
      if (target.checked && inputPhoneValidator(CALL_ME_FORM['input-phone'].value)) {
        console.log('all good')
        CALL_ME_BTN.disabled = false;
        return true;
      } else {
        CALL_ME_BTN.disabled = true;
        return false;
      }
      return false; // Если невозможное возможно
    })

    /**
     * Блокировка отправки формы, всплытия, скрытие-показ окон
     */
    CALL_ME_FORM.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.target.checkValidity()) {
        CALL_ME_POPUP_WINDOW.classList.toggle('show');
        SUCCESS_ADD_CALL_WINDOW.classList.toggle('show');
        return true;
      }
      return false;
    })
  })
}());
