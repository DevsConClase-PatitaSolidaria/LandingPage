document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const showError = (input, message) => {
    input.setCustomValidity(message);
  };

  form.addEventListener("submit", function (e) {
    let isValid = true;

    if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, "Correo electrónico no válido.");
      isValid = false;
    } else {
      emailInput.setCustomValidity("");
    }

    if (!passwordPattern.test(passwordInput.value)) {
      showError(
        passwordInput,
        "Contraseña con mínimo 6 caracteres, una mayúscula y un número."
      );
      isValid = false;
    } else {
      passwordInput.setCustomValidity("");
    }

    if (!isValid) {
      e.preventDefault();
      form.reportValidity();
    }
  });
});
