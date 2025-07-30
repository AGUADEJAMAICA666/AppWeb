class Manga {
  static URL = "http://localhost:8080/api/mangas";

  static async listar() {
    try {
      const res = await fetch(this.URL);
      if (!res.ok) throw new Error("Error al obtener los mangas.");
      const data = await res.json();
      Manga.mostrarEnTabla(data);
    } catch (error) {
      console.error("Error al listar mangas:", error);
    }
  }

  static async guardar(evento) {
    evento.preventDefault();

    const id = document.getElementById("mangaId").value;
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const imagenUrl = document.getElementById("imagenUrl").value;

    const manga = { titulo, autor, genero, precio, stock, imagenUrl };

    const metodo = id ? "PUT" : "POST";
    const url = id ? `${this.URL}/${id}` : this.URL;

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manga),
      });
      if (!res.ok) throw new Error("Error al guardar el manga.");
      document.getElementById("formManga").reset();
      Manga.listar();
    } catch (error) {
      console.error("Error al guardar manga:", error);
    }
  }

  static mostrarEnTabla(lista) {
    const tbody = document.querySelector("#tablaMangas tbody");
    tbody.innerHTML = "";

    lista.forEach((m) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${m.id}</td>
        <td>${m.titulo}</td>
        <td>${m.autor}</td>
        <td>${m.genero}</td>
        <td>${m.precio}</td>
        <td>${m.stock}</td>
        <td>
          <button onclick="Manga.editar(${m.id}, '${m.titulo}', '${m.autor}', '${m.genero}', ${m.precio}, ${m.stock}, '${m.imagenUrl}')">Editar</button>
          <button onclick="Manga.eliminar(${m.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  static editar(id, titulo, autor, genero, precio, stock, imagenUrl) {
    document.getElementById("mangaId").value = id;
    document.getElementById("titulo").value = titulo;
    document.getElementById("autor").value = autor;
    document.getElementById("genero").value = genero;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
    document.getElementById("imagenUrl").value = imagenUrl;
  }

  static async eliminar(id) {
    try {
      const res = await fetch(`${this.URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar el manga.");
      Manga.listar();
    } catch (error) {
      console.error("Error al eliminar manga:", error);
    }
  }
}

window.onload = () => {
  document
    .getElementById("formManga")
    .addEventListener("submit", (e) => Manga.guardar(e));
  Manga.listar();
};
