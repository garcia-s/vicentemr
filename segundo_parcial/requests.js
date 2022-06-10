const traerData = () => {
  return JSON.parse(cadena);
};

const mapearListaAClasses = (lista) => {
  if (!Array.isArray(lista)) return [];
  let response = [];
  for (let i = 0; i < lista.length; i++) {
    let element;

    if (lista[i].año && lista[i].materia) {
      //Map to docente
      element = new Docente(mapearAtributosTipoPersona(lista[i]));
    } else if (lista[i].cursoNumero && lista[i].cursoLetra) {
      element = new Alumno(mapearAtributosTipoPersona(lista[i]));
    }
    if (element) {
      response.push(element);
    }
  }
  return response;
};

const mapearAtributosTipoPersona = (elemento) => {
  const objeto = {
    id: elemento.id,
    dni: elemento.dni,
    apellido: elemento.apellido,
    nombres: elemento.nombre,
  };
  if (elemento.materia) {
    objeto.año = elemento.año;
    objeto.materia = elemento.materia;
  } else if (elemento.cursoNumero) {
    objeto.cursoNumero = elemento.cursoNumero;
    objeto.cursoLetra = elemento.cursoLetra;
  }
  return objeto;
};

const abrirFormulario = (mode, state) => {
  formdisplay.classList.add("show");
  const formState = state
};
