

const renderList = () => {

  const listaInterna = document.createElement("tbody");
  listaInterna.classList.add("inner_list");
  const tablehead = renderHeader(valoresDeLista);
  listaInterna.appendChild(tablehead);
  for (let i = 0; i < listaVehiculos.length; i++) {
    const fila = renderFila(listaVehiculos[i], valoresDeLista);
    listaInterna.appendChild(fila);
  }
  elementoLista.innerHTML = "";
  elementoLista.appendChild(listaInterna);
};

const renderHeader = (headers) => {
  const element = document.createElement("tr");

  element.classList.add("tabla_th");
  headers.forEach((el) => {
    const tableHeader = document.createElement("th");
    tableHeader.innerHTML = el.toUpperCase();
    element.appendChild(tableHeader);
  });
  const modificar = document.createElement("th");
  const eliminar = document.createElement("th");
  modificar.innerHTML = "MODIFICAR";
  eliminar.innerHTML = "ELIMINAR";
  element.appendChild(modificar);
  element.appendChild(eliminar);

  return element;
};

const renderFila = (value, keys) => {
  const element = document.createElement("tr");
  element.classList.add("tabla_td");
  element.id = value["id"];
  keys.forEach((val) => {
    const div = document.createElement("td");
    const input = document.createElement("input");
    input.value = val;
    div.innerHTML = value[val] ?? "N/A";
    element.appendChild(div);
  });
  const modificarTd = document.createElement("td");
  const eliminarTd = document.createElement("td");

  const modificar = document.createElement("button");
  modificar.onclick = () => abrirFormulario('modificar', value);
  // Deberia abrir el formulario y pegar los datos del elemento

  const eliminar = document.createElement("button");
  eliminar.onclick = () => abrirFormulario("eliminar", value)

  // Deberia borrar el elemento de la lista
  modificar.innerHTML = "MODIFICAR";
  eliminar.innerHTML = "ELIMINAR";
  modificarTd.appendChild(modificar);
  eliminarTd.appendChild(eliminar);
  element.appendChild(modificarTd);
  element.appendChild(eliminarTd);

  return element;
};




traerData()
document.getElementById("formulario_cancelar").onclick = () => {
  limpiarFormulario()
  cerrarFormulario()
}
document.getElementById('agregar_elementos').onclick = () => abrirFormulario('agregar', null)

formulario.addEventListener('submit', async (ev) => {
  try {
    ev.preventDefault()
    await procesarSolicitud()

  } catch (e) {
    console.log(e);
    renderList();
    cerrarSpinner()
    setTimeout(() => alert("No se pudo ejecutar la accion solicitada"), 200)
  }

})

const quitarLista = () =>
  elementoLista.innerHTML = '';






