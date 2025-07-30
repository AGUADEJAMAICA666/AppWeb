document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const error = document.getElementById("errorMensaje");

  const correoValido = "admin@manga.com";
  const claveValida = "1234";

  if (correo === correoValido && contrasena === claveValida) {
    window.location.href = "menu.html";
  } else {
    error.textContent = "Correo o contraseña incorrectos.";
  }
});
