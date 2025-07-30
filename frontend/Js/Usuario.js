class Usuario {
  static URL = "http://localhost:8080/api/usuarios";

  static async listar() {
    const res = await fetch(this.URL);
    const data = await res.json();
    Usuario.mostrarEnTabla(data);
  }

  static async guardar(evento) {
    evento.preventDefault();

    const id = document.getElementById("usuarioId").value;
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    const usuario = { nombre, correo, contrasena };

    const metodo = id ? "PUT" : "POST";
    const url = id ? `${this.URL}/${id}` : this.URL;

    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    document.getElementById("formUsuario").reset();
    Usuario.listar();
  }

  static mostrarEnTabla(lista) {
    const tbody = document.querySelector("#tablaUsuarios tbody");
    tbody.innerHTML = "";

    lista.forEach((u) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.correo}</td>
                <td>
                    <button onclick="Usuario.editar(${u.id}, '${u.nombre}', '${u.correo}', '${u.contrasena}')">Editar</button>
                    <button onclick="Usuario.eliminar(${u.id})">Eliminar</button>
                </td>
            `;
      tbody.appendChild(fila);
    });
  }

  static editar(id, nombre, correo, contrasena) {
    document.getElementById("usuarioId").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("correo").value = correo;
    document.getElementById("contrasena").value = contrasena;
  }

  static async eliminar(id) {
    await fetch(`${this.URL}/${id}`, { method: "DELETE" });
    Usuario.listar();
  }
}
