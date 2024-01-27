let elementoEditando;

function agregarValor(inputId, listaId) {
  let inputValue = document.getElementById(inputId).value;
  if (inputValue.trim() !== "") {
    let lista = document.getElementById(listaId);
    let nuevoElemento = document.createElement("li");
    nuevoElemento.appendChild(document.createTextNode(inputValue));

    let iconoEditar = document.createElement("i");
    iconoEditar.className = "bi bi-pencil";
    iconoEditar.style.marginLeft = "10px";
    iconoEditar.style.cursor = "pointer";
    iconoEditar.addEventListener("click", function () {
      abrirModalEdicion(nuevoElemento);
    });

    nuevoElemento.appendChild(iconoEditar);

    lista.appendChild(nuevoElemento);
    document.getElementById(inputId).value = "";
  }
}

function abrirModalEdicion(elemento) {
  elementoEditando = elemento;
  document.getElementById("nuevoValor").value = elemento.textContent.trim();
  $("#modalEdicion").modal("show");
}

function guardarEdicion() {
  let nuevoValor = document.getElementById("nuevoValor").value;
  if (nuevoValor.trim() !== "") {
    elementoEditando.firstChild.nodeValue = nuevoValor;
    $("#modalEdicion").modal("hide");
  }
}

// Función para verificar si al menos un campo está lleno
function verificarCamposLlenos() {
  let formulario = document.getElementById("cvForm");
  let inputs = formulario.querySelectorAll("input, textarea");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type !== "hidden" && inputs[i].value.trim() !== "") {
      return true; // Si al menos un campo no está vacío, retorna true
    }
  }

  return false; // Si todos los campos están vacíos, retorna false
}

function generarCurriculum() {
  // Verifica si al menos un campo está lleno
  let camposLlenos = verificarCamposLlenos();

  if (camposLlenos) {
    // Obtiene los valores del formulario
    let datosPersonales = {
      nombreCompleto: document.getElementById("nombreCompleto").value,
      telefono: document.getElementById("telefono").value,
      correo: document.getElementById("correo").value,
      paginaWeb: document.getElementById("paginaWeb").value,
      ubicacion: document.getElementById("ubicacion").value,
    };

    let habilidadesTecnicas = obtenerLista("habilidadesTecnicasLista");
    let cualidadesGenerales = obtenerLista("cualidadesGeneralesLista");

    let puestoSolicitado = document.getElementById("puestoSolicitado").value;
    let sobreMi = document.getElementById("sobreMi").value;

    let experienciaLaboral = obtenerExperiencia(
      "fechaInicioLaboral",
      "fechaFinLaboral",
      "empresaLaboral",
      "puestoLaboral",
      "descripcionLaboral"
    );
    let educacion = obtenerExperiencia(
      "fechaInicioEducacion",
      "fechaFinEducacion",
      "institucionEducacion",
      "gradoEducacion",
      "descripcionEducacion"
    );

    // Construye la vista previa del currículum
    let vistaPrevia = `
      <h3>${datosPersonales.nombreCompleto}</h3>
      ${datosPersonales.telefono || datosPersonales.correo || datosPersonales.paginaWeb || datosPersonales.ubicacion ? `<h4>Contacto</h4>` : ``}
      ${datosPersonales.telefono && `<p><strong>Teléfono:</strong> ${datosPersonales.telefono}</p>`}
      ${datosPersonales.correo && `<p><strong>Correo Electrónico:</strong> ${datosPersonales.correo}</p>`}
      ${datosPersonales.paginaWeb && `<p><strong>Página Web:</strong> ${datosPersonales.paginaWeb}</p>`}
      ${datosPersonales.ubicacion && `<p><strong>Ubicación:</strong> ${datosPersonales.ubicacion}</p>`}

      ${habilidadesTecnicas && `<h3>Habilidades Técnicas</h3><ul>${habilidadesTecnicas}</ul>`}
      ${cualidadesGenerales && `<h3>Cualidades Generales</h3><ul>${cualidadesGenerales}</ul>`}

      ${puestoSolicitado && `<h3>Puesto Solicitado</h3><p>${puestoSolicitado}</p>`}
      ${sobreMi && `<h3>Sobre Mí</h3><p>${sobreMi}</p>`}

      ${experienciaLaboral && `<h3>Experiencia Laboral</h3>${experienciaLaboral}`}
      ${educacion && `<h3>Educación</h3>${educacion}`}
    `;

    // Muestra la vista previa en el div correspondiente
    document.getElementById("vistaPrevia").innerHTML = vistaPrevia;
  } else {
    // Si no hay campos llenos, muestra la modal de advertencia
    $("#modalAdvertencia").modal("show");
  }
}

// Función auxiliar para obtener la lista de habilidades o cualidades
function obtenerLista(listaId) {
  let lista = document.getElementById(listaId);
  let elementos = lista.getElementsByTagName("li");
  let listaItems = [];

  for (let i = 0; i < elementos.length; i++) {
    listaItems.push(elementos[i].textContent.trim());
  }

  return listaItems.length ? `<li>${listaItems.join("</li><li>")}</li>` : "";
}

// Función auxiliar para obtener la experiencia laboral o educación
function obtenerExperiencia(
    fechaInicioId,
    fechaFinId,
    nombreId,
    tituloId,
    descripcionId
  ) {
    let fechaInicio = document.getElementById(fechaInicioId).value;
    let fechaFin = document.getElementById(fechaFinId).value;
    let nombre = document.getElementById(nombreId).value;
    let titulo = document.getElementById(tituloId).value;
    let descripcion = document.getElementById(descripcionId).value;
  
    // Verifica si hay valores para nombre, título y descripción
    if (nombre.trim() !== "" && titulo.trim() !== "" && descripcion.trim() !== "") {
      // Construye el bloque solo si hay valores
      return `
        <h4>${nombre}</h4>
        <p><strong>${titulo}</strong></p>
        ${fechaInicio && `<p>${fechaInicio} - ${fechaFin}</p>`}
        <p>${descripcion}</p>
      `;
    } else {
      // Retorna una cadena vacía si no hay valores
      return '';
    }
  }
  
