const formdisplay = document.getElementById("form_display");
const formulario = document.getElementById("formulario_abm");
const botonesFormulario = document.getElementById("formulario_botones");

const formItems = {
  id: document.getElementById("id"),
  dni: document.getElementById("dni"),
  nombres: document.getElementById("nombres"),
  apellido: document.getElementById("apellido"),
  tipo: document.getElementById("tipo"),
};


const alternarCampos = (value) => {
  if (value === "Docente") {
    quitarCampo("cursoNumero");
    quitarCampo("cursoLetra");
    agregarCampo({ id: "año", name: "año", type: "number", label: "AÑO" });
    agregarCampo({
      id: "materia",
      name: "materia",
      type: "text",
      label: "Materia",
    });
  } else if (value == "Alumno") {
    quitarCampo("año");
    quitarCampo("materia");
    agregarCampo({
      id: "cursoLetra",
      name: "cursoLetra",
      type: "text",
      label: "CursoLetra",
    });
    agregarCampo({
      id: "cursoNumero",
      name: "cursoNumero",
      type: "number",
      label: "Curso Numero",
    });
  } else {
    quitarCampo("cursoNumero");
    quitarCampo("cursoLetra");
    quitarCampo("año");
    quitarCampo("materia");
  }
};

const quitarCampo = (id) => {
  const campo = document.getElementById(id);
  if (campo) formulario.removeChild(campo);
};

const agregarCampo = (campo) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  div.id = campo.id;
  input.name = campo.name;
  input.type = campo.type;
  label.innerHTML = campo.label;

  div.appendChild(label);
  div.appendChild(input);

  formulario.insertBefore(div, botonesFormulario);
};
formItems.tipo.onchange = (e) => alternarCampos(e.target.value);

document.getElementById("formulario_cancelar").onclick = () => {
  formdisplay.classList.remove("show");
};
