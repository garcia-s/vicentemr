const cadena =
  '[{"id":1,"dni":17663295,"nombre":"FABIAN MARCELO","apellido":"ABADIE","cursoNumero":1,"cursoLetra":"F"},{"id":2,"dni":38724762,"nombre":"MAIRA DAIANA","apellido":"ABALOS","cursoNumero":3,"cursoLetra":"M"},{"id":3,"dni":25447357,"nombre":"NOELIA LIDIA","apellido":"ABBA","cursoNumero":2,"cursoLetra":"N"},{"id":4,"dni":27577699,"nombre":"MARÍA SOLEDAD","apellido":"ACHOR","cursoNumero":2,"cursoLetra":"M"},{"id":900,"dni":11496581,"nombre":"JOSE MIGUEL","apellido":"ARMALEO","materia":"Fisica","año":1},{"id":899,"dni":35326658,"nombre":"ROSA DEL VALLE","apellido":"LOPEZ","materia":"Lengua","año":3},{"id":898,"dni":39638351,"nombre":"DANIELA BELEN","apellido":"BROGGI D`ATENA","materia":"Matematica","año":3},{"id":897,"dni":17275566,"nombre":"PABLO ALBERTO","apellido":"ALMEIDA","materia":"Quimica","año":1}]';



const renderList = (elementId, lista, values) => {
  const elementoLista = document.getElementById(elementId);
  const listaInterna = document.createElement("tbody");
  listaInterna.classList.add("inner_list");
  const tablehead = renderHeader(values);
  listaInterna.appendChild(tablehead);
  for (let i = 0; i < lista.length; i++) {
    const fila = renderFila(lista[i], values);
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
  modificar.onclick = abrirFormulario;
  // Deberia abrir el formulario y pegar los datos del elemento

  const eliminar = document.createElement("button");
  eliminar.onclick = abrirFormulario;

  // Deberia borrar el elemento de la lista
  modificar.innerHTML = "MODIFICAR";
  eliminar.innerHTML = "ELIMINAR";
  modificarTd.appendChild(modificar);
  eliminarTd.appendChild(eliminar);
  element.appendChild(modificarTd);
  element.appendChild(eliminarTd);

  return element;
};

const crearLista = () => {
  //SIMULAR LA CONEXION
  const lista = mapearListaAClasses(traerData());
  console.log(lista);
  renderList("lista", lista, [
    "id",
    "dni",
    "apellido",
    "nombres",
    "cursoNumero",
    "cursoLetra",
    "año",
    "materia",
  ]);
};



crearLista();
