document.addEventListener("DOMContentLoaded", function (event) {

  //Project Date
  let now = new Date().toLocaleDateString('en-us', { month:"long", day:"numeric", year:"numeric"});
  const project_page = document.querySelector('.section .project');

  if (project_page) {
    document.getElementById("datetime").innerHTML = now.toLocaleString();
  }

  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
  });

  sr.reveal(`footer`);
  sr.reveal(`.hero__heading, .hero__description, .hero__buttons, .primary-button, .button, .testimonial__heading, .testimonial__text, .client__profile, .client__info`, { interval: 300 });
  sr.reveal(`.hero__image__main`, { delay: 700, origin: "bottom" });
  sr.reveal(`.navbar__logo, .nav__link, .client__logo, .project__card, .service__card`, { interval: 100 });
  sr.reveal(`.hero__card-1`, { origin: "left" });
  sr.reveal(`.hero__card-2`, { origin: "right" });
  sr.reveal(`.projects__heading`, { origin: "top" });

  sr.reveal(`._1, ._2`, { origin: "left" });
  sr.reveal(`._3, ._4`, { origin: "right" });

  const SUBSCRIBE_API_BASE_URL = "https://database.deta.sh/v1/a0wwnrex/contactmessages/items";
  const X_API_KEY = "a0wwnrex_JeRhBybn5iFYziStv9d2M6Mchd2b4B4H";

  async function subscribe(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    showPleaseWaitMessage();

    const userMail = getUserMail();

    const datos = {
      subject: 'Suscription Form',
      email: userMail,
    };

    const body = { item: datos };

    const fetchParams = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
      body: JSON.stringify(body),
    };


    await fetch(SUBSCRIBE_API_BASE_URL, fetchParams)
      .then(async (response) => {
        if (response.status === 201) {
          hideButton();
          hideInput();
          showSubmissionMessage();
        } else {
          await showError();
        }
      })
      .catch(async () => {
        await showError();
      })
      .finally(() => {
        restoreSubscribeButton();
      });
  }


  function validateForm() {
    removeInvalidWarning();
    var form = document.querySelector(".cta-section__mail");
    form.checkValidity();
    form.reportValidity();
    var validForm = form.checkValidity() && validateEmail(getUserMail());
    if (!validForm) {
      markAsInvalidField();
    }
    return validForm;
  }
  function markAsInvalidField() {
    var mailInput = document.querySelector(".cta-section__mail-input");
    mailInput.classList.add('invalid-input');
  }
  function removeInvalidWarning() {
    var mailInput = document.querySelector(".cta-section__mail-input");
    mailInput.classList.remove('invalid-input');
  }
  var validateEmail = function (email) {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
  };
  function getUserMail() {
    var subscribeButton = document.querySelector(".cta-section__mail-input");
    return subscribeButton.value;
  }
  function showPleaseWaitMessage() {
    var subscribeButton = document.querySelector(".cta-section__subscribe-button");
    subscribeButton.innerHTML = "Please wait...";
  }
  function showSubmissionMessage() {
    var submissionMessage = document.querySelector(".cta-section .submitted-message");
    submissionMessage.classList.toggle('fade');
  }
  function hideButton() {
    var subscribeButton = document.querySelector(".cta-section__subscribe-button");
    subscribeButton.style.display = "none";
    subscribeButton.style.visibility = "hidden";
  }
  function hideInput() {
    var subscribeInput = document.querySelector(".cta-section__mail-input");
    subscribeInput.style.display = "none";
    subscribeInput.style.visibility = "hidden";
  }
  function restoreSubscribeButton() {
    var subscribeButton = document.querySelector(".cta-section__subscribe-button");
    subscribeButton.style.backgroundColor = "#072ac8";
    subscribeButton.innerHTML = "Subscribe";
  }
  function showError() {
    var subscribeButton = document.querySelector(".cta-section__subscribe-button");
    subscribeButton.innerHTML = "Something went wrong!";
    subscribeButton.style.backgroundColor = "red";
    return new Promise(function (res) {
      return setTimeout(function () { return res("Enough time to see the error"); }, 4000);
    });
  }
  window.addEventListener("load", function () {
    var subscribeButton = document.querySelector(".cta-section__subscribe-button");
    subscribeButton.addEventListener("click", subscribe);
  });


});
