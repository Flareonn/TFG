const body = document.querySelector("body");

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    body.classList.add("webp");
  } else {
    body.classList.add("no-webp");
  }
});

const popup = `
  <div class="popup">
    <div class="popup-wrapper">
      <div class="popup__close" id="popupClose">
        <img src="./img/cross.svg" alt="cross icon" />
      </div>
      <h2 class="popup__title">Напишите нам</h2>
      <form action="#" class="popup-form">
        <div class="popup-form__input-wrapper">
          <input type="text" class="popup-form__input" placeholder="ФИО" required />
        </div>
        <div class="popup-form__input-wrapper">
          <input type="email" class="popup-form__input" placeholder="E-mail" required />
        </div>
        <div class="popup-form__input-wrapper">
          <input type="tel" class="popup-form__input" placeholder="Телефон" id="popupTel" required />
        </div>
        <div class="popup-form__input-wrapper">
          <textarea
            type="text"
            class="popup-form__input"
            placeholder="Сообщение"
            required
          ></textarea>
        </div>
        <span class="popup-form__warning">
          Нажимая на кнопку, вы даете согласие на обработку своих<br />
          персональных данных и соглашаетесь с
          <a href="#" class="popup-form__link">
            Пользовательским соглашением
          </a>
        </span>
        <input
          type="submit"
          value="Отправить"
          class="popup-form__submit button"
        />
      </form>
    </div>
  </div>
`;

contactPopup.addEventListener("click", function() {
  body.insertAdjacentHTML("afterend", popup);
  maskPhone("#popupTel");
  body.classList.add("lock");
  popupClose.addEventListener("click", popupCloser);
  document.querySelector(".popup").addEventListener("click", ({target}) => {
    if(target.classList.value === "popup") {
      document.querySelector(".popup").removeEventListener("click", popupCloser);
      popupCloser();
    }
  });
  formValidate();
});

function popupCloser() {
  body.classList.remove("lock");
  this.removeEventListener("click", popupCloser);
  document.querySelector(".popup").remove();
}

const headerBurger = body.querySelector("#headerBurger");
const headerNav = body.querySelector("#headerNav");

headerBurger.addEventListener("click", () => {
  headerBurger.classList.toggle("active");
  headerNav.classList.toggle("active");
  body.classList.toggle("lock");
});

Array
  .from(document.querySelectorAll(".faq-question"))
  .forEach(i => {
    i.addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.querySelector(".faq-question__content");
      if(panel.style.maxHeight) panel.style.maxHeight = null;
      else panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });

function formValidate() {
  Array.from(document.querySelectorAll(".popup input, .popup textarea")).forEach(el => {
    if(el.type === "submit") return;
    el.addEventListener("focus", focusHandler);
    el.addEventListener("blur", blurHandler);
  });
}

function blurHandler() {
  if(!this.value.length) this.parentNode.classList.add("empty");
}

function focusHandler() {
  this.parentNode.classList.remove("empty");
  // if(!this.classList.contains("visited")) this.classList.add("visited");
}