// ==== Cargar usuarios registrados desde LocalStorage ====
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const tabla = document.getElementById("tablaAsistencias");
const inputQR = document.getElementById("codigoQR");

// ==== Registrar asistencias ====
if (inputQR) {
  inputQR.addEventListener("change", () => {
    const codigo = inputQR.value.trim();
    const usuario = usuarios.find(u => u.codigo === codigo);

    if (usuario) {
      const fecha = new Date();
      const hora = fecha.toLocaleTimeString();
      const fechaStr = fecha.toLocaleDateString('es-PE');
      const tipo = verificarTipo(usuario.dni);

      const nuevoRegistro = {
        nombre: usuario.nombre,
        dni: usuario.dni,
        tipo,
        hora,
        fecha: fechaStr
      };

      let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];
      asistencias.push(nuevoRegistro);
      localStorage.setItem("asistencias", JSON.stringify(asistencias));

      const fila = `
        <tr>
          <td>${usuario.nombre}</td>
          <td>${usuario.dni}</td>
          <td>${tipo}</td>
          <td>${hora}</td>
          <td>${fechaStr}</td>
        </tr>
      `;
      tabla.innerHTML += fila;
    } else {
      alert("⚠️ Código QR no registrado en el sistema");
    }

    inputQR.value = "";
  });
}

let historial = {};
function verificarTipo(dni) {
  if (!historial[dni] || historial[dni] === "Salida") {
    historial[dni] = "Entrada";
  } else {
    historial[dni] = "Salida";
  }
  return historial[dni];
}
