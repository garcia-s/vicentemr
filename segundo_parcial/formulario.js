

const alternarCampos = (value) => {
  if (value === "Camioneta") {
    quitarCampo("cantidadPuertas");
    agregarCampo({ id: "transmision4x4", type: "number", label: "TRANSMISION", });

  } else if (value == "Auto") {
    quitarCampo("transmision4x4");
    agregarCampo({
      id: "cantidadPuertas",
      label: "CANTIDAD PUERTAS",
    });
  } else {
    quitarCampo("cantidadPuertas");
    quitarCampo("transmision4x4");

  }
};


const quitarCampo = (id) => {
  const campo = document.getElementById(id);
  if (campo) formulario.removeChild(campo);
};

const agregarCampo = (campo) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const input = formItems[campo.id];
  div.id = campo.id;
  label.innerHTML = campo.label;
  div.appendChild(label);
  div.appendChild(input);

  formulario.insertBefore(div, botonesFormulario);
  return input;
};
formItems.tipo.onchange = (e) => alternarCampos(e.target.value);

const abrirFormulario = (mode, state) => {
  accion.innerHTML = mode.toUpperCase()
  formdisplay.classList.add("show");
  formMode.value = mode;
  if (mode === "eliminar") {

    Object.values(formItems).forEach((el) => el.disabled = true);
    setItems(state)
  } else if (mode === "modificar") {
    formItems.id.disabled = true;
    formItems.tipo.disabled = true
    setItems(state)
  } else {
    formItems.id.disabled = true;
  }
};

const setItems = (state) => {
  Object.values(formItems).forEach((el) => {
    if (el.name != 'tipo') return el.value = state[el.name]
    el.selectedIndex = state instanceof Auto ? 1 : 2
    el.value = state instanceof Auto ? "Auto" : "Camioneta"
    alternarCampos(el.value);
  })
}

const cerrarFormulario = () => formdisplay.classList.remove("show");

const limpiarFormulario = () => {
  Object.values(formItems).forEach(el => {
    el.value = ''
    el.disabled = false
    if (el.name == 'tipo') alternarCampos()
  });
}
const validarFormulario = (modo) => {
  const errors = []
  if (!Number.isInteger(parseInt(formItems.id.value)) && modo !== 'agregar') errors.push('id')

  if (typeof formItems.fabricante.value !== 'string' ||
    formItems.fabricante.value == "") {
    errors.push('fabricante')
  }
  if (typeof formItems.modelo.value !== 'string' ||
    formItems.modelo.value === "") {
    errors.push('modelo')
  }
  if (formItems.añoLanzamiento.value === '' ||
    isNaN(formItems.añoLanzamiento.value) ||
    parseInt(formItems.añoLanzamiento.value) < 1920) {
    console.log(isNaN(formItems.añoLanzamiento.value))
    errors.push('añoLanzamiento')
  }
  if (formItems.tipo.value === '') errors.push('Tipo')
  if (formItems.tipo.value === 'Camioneta') {

    if (formItems.transmision4x4.value !== "NO" && formItems.transmision4x4.value !== "SI") {
      errors.push('transmision4x4')
    }
  } else if (formItems.tipo.value === 'Auto') {

    if (isNaN(formItems.cantidadPuertas.value) ||
      parseInt(formItems.cantidadPuertas.value) <= 2) { errors.push('cantidadPuertas') }
  }

  return { isValid: errors.length === 0, errors }

}

const mostrarError = (err) => {
  alert("El valor del los campos " + err.join(', ') + " es invalido")
}

const procesarSolicitud = async () => {
  const { isValid, errors } = validarFormulario(formMode.value)
  if (!isValid) return mostrarError(errors)
  quitarLista()
  abrirSpinner()
  cerrarFormulario()
  if (formMode.value == 'eliminar') {
    await eliminarElemento()
    listaVehiculos = listaVehiculos.filter((persona) =>
      persona.id !== parseInt(formItems.id.value)
    )
    renderList()
    limpiarFormulario()
    cerrarSpinner()
  } else if (formMode.value == 'modificar') {
    const element = await modificarElemento()
    index = listaVehiculos.findIndex((persona) => persona.id == parseInt(formItems.id.value));
    listaVehiculos[index] = listaVehiculos[index] instanceof Camioneta ?
      new Camioneta(element) :
      new Auto(element)
    renderList()
    limpiarFormulario()
    cerrarSpinner()
  } else {
    crearElemento((elemento) => {
      listaVehiculos = [...listaVehiculos,
      elemento.transmision4x4
        ? new Camioneta(elemento) : new Auto(elemento)
      ]
      console.log(listaVehiculos)
      console.log(formItems.tipo.value)
      renderList()
      limpiarFormulario()
      cerrarSpinner()
    });
  }

}
