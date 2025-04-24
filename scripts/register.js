document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const showError = (input, message) => {
    input.setCustomValidity(message);
  };

  form.addEventListener("submit", function (e) {
    let isValid = true;

    if (!emailPattern.test(email.value)) {
      showError(email, "Correo electrónico no válido.");
      isValid = false;
    } else {
      email.setCustomValidity("");
    }

    if (!passwordPattern.test(password.value)) {
      showError(
        password,
        "Contraseña con mínimo 6 caracteres, una mayúscula y un número."
      );
      isValid = false;
    } else {
      password.setCustomValidity("");
    }

    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, "Las contraseñas no coinciden.");
      isValid = false;
    } else {
      confirmPassword.setCustomValidity("");
    }

    if (!terms.checked) {
      alert("Debes aceptar los términos y condiciones.");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      form.reportValidity();
    }
  });
});
