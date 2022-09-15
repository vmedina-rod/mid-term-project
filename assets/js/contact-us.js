document.addEventListener("DOMContentLoaded", function (event) {

    const sr = ScrollReveal({
        origin: "top",
        distance: "60px",
        duration: 2500,
        delay: 400,
    });

    sr.reveal(`footer`);
    sr.reveal(`.primary-button, .button`, { interval: 300 });
    sr.reveal(`.navbar__logo, .nav__link`, { interval: 100 });
    sr.reveal(`.contact-us-section__title, label, input, textarea, button`, { interval: 300 });



    const CONTACT_API_BASE_URL = "https://database.deta.sh/v1/a0wwnrex/contactmessages/items";
    const X_API_KEY = "a0wwnrex_JeRhBybn5iFYziStv9d2M6Mchd2b4B4H";

     async function sendForm(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        showPleaseWaitMessage();

        const fullName = getFullName().value;
        const email = getEmail().value;
        const phone = getPhone().value;
        const message = getMessage().value;

        const datos = {
            fullName: fullName,
            email: email,
            phone: phone,
            message: message,
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

     fetch(CONTACT_API_BASE_URL, fetchParams)
          .then(async (response) => {
                if (response.status === 201) {
                    hideForm();
                    showSubmissionMessage();
                } else {
                    await showError();
                }
            })
            .catch(async () => {
                await showError();

            })
            .finally(() => {
                restoreSendFormButton();
            });
    }

    function validateForm() {
        removeInvalidWarnings();
        const form = document.querySelector("#contact-us-form");
        form.checkValidity();
        form.reportValidity();
        return form.checkValidity() && fieldValidations();
    }
    function fieldValidations() {
        let valid = true;
        if (!validateNotEmpty(getFullName().value)) {
            markAsInvalidField(getFullName());
            valid = false;
        }
        if (!validateEmail(getEmail().value)) {
            markAsInvalidField(getEmail());
            valid = false;
        }
        if (!validatePhone(getPhone().value)) {
            markAsInvalidField(getPhone());
            valid = false;
        }
        if (!validateNotEmpty(getMessage().value)) {
            markAsInvalidField(getMessage());
            valid = false;
        }
        return valid;
    }
    const validatePhone = function (phone) {
        return String(phone).match(/^(\+34|0034|34)?[6789]\d{8}$/) !== null;
    };
    const validateEmail = function (email) {
        return (
            String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) !== null
        );
    };
    const validateNotEmpty = function (name) {
        if (name) return true;
    };
    function markAsInvalidField(element) {
        element.classList.add("invalid-input");
    }
    function removeInvalidWarnings() {
        const formElements = document.querySelectorAll("#contact-us-form input, #contact-us-form area");
        formElements.forEach(function (element) {
            return element.classList.remove("invalid-input");
        });
    }
    function getFullName() {
        return document.querySelector('#contact-us-form input[name="full-name"]');
    }
    function getEmail() {
        return document.querySelector('#contact-us-form input[name="email"]');
    }
    function getPhone() {
        return document.querySelector('#contact-us-form input[name="phone"]');
    }
    function getMessage() {
        return document.querySelector('#contact-us-form textarea[name="message"]');
    }
    function showPleaseWaitMessage() {
        const subscribeButton = document.querySelector(".contact-us-section__submit-button");
        subscribeButton.innerHTML = "Please wait...";
    }
    function showSubmissionMessage() {
        const submissionMessage = document.querySelector(".contact-us-section .submitted-message");
        submissionMessage.classList.toggle("fade");
    }
    function hideForm() {
        const form = document.querySelector("#contact-us-form");
        form.style.display = "none";
        form.style.visibility = "hidden";
    }
    function restoreSendFormButton() {
        const submitButton = document.querySelector(".contact-us-section__submit-button");
        submitButton.style.backgroundColor = "#072ac8";
        submitButton.innerHTML = "Submit";
    }
    function showError() {
        var submitButton = document.querySelector(".contact-us-section__submit-button");
        submitButton.innerHTML = "Something went wrong!";
        submitButton.style.backgroundColor = "red";
        return new Promise(function (res) {
            return setTimeout(function () {
                return res("Enough time to see the error");
            }, 4000);
        });
    }
    window.addEventListener("load", function () {
        var sendFormButton = document.querySelector(".contact-us-section__submit-button");

        if (sendFormButton) {
            sendFormButton.addEventListener("click", sendForm);
        }
    });
});
