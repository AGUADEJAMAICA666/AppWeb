function mostrarSeccion(seccionId) {
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach((sec) => (sec.style.display = "none"));
  document.getElementById(seccionId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  Usuario.listar();
  document
    .getElementById("formUsuario")
    .addEventListener("submit", Usuario.guardar);
});
