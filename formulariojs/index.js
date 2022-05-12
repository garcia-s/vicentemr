let cadena =
  '[{"id":1,"dni":17663295,"nombre":"FABIAN MARCELO","apellido":"ABADIE","cursoNumero":1,"cursoLetra":"F"},{"id":2,"dni":38724762,"nombre":"MAIRA DAIANA","apellido":"ABALOS","cursoNumero":3,"cursoLetra":"M"},{"id":3,"dni":25447357,"nombre":"NOELIA LIDIA","apellido":"ABBA","cursoNumero":2,"cursoLetra":"N"},{"id":4,"dni":27577699,"nombre":"MARÍA SOLEDAD","apellido":"ACHOR","cursoNumero":2,"cursoLetra":"M"},{"id":900,"dni":11496581,"nombre":"JOSE MIGUEL","apellido":"ARMALEO","materia":"Fisica","año":1},{"id":899,"dni":35326658,"nombre":"ROSA DEL VALLE","apellido":"LOPEZ","materia":"Lengua","año":3},{"id":898,"dni":39638351,"nombre":"DANIELA BELEN","apellido":"BROGGI D`ATENA","materia":"Matematica","año":3},{"id":897,"dni":17275566,"nombre":"PABLO ALBERTO","apellido":"ALMEIDA","materia":"Quimica","año":1}]';

class Persona {
  constructor({ id, dni, nombre, apellido }) {
    this.id = id;
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
  }
}

class Alumno extends Persona {
  constructor({ id, dni, nombre, apellido, cursoLetra, cursoNumero }) {
    super({ id, dni, nombre, apellido });
    this.cursoLetra = cursoLetra;
    this.cursoNumero = cursoNumero;
  }
}

class Docente extends Persona {
  constructor({ id, dni, nombre, apellido, materia, año }) {
    super({ id, dni, nombre, apellido });
    this.materia = materia;
    this.año = año;
  }
}

let datos = JSON.parse(cadena).map((element) =>
  element.año != undefined ? new Docente(element) : new Alumno(element)
);
let columnas = {
  id: true,
  dni: true,
  nombre: true,
  apellido: true,
  cursoLetra: true,
  cursoNumero: true,
  materia: true,
  año: true,
};

let filtro = null;

document.getElementById("filtro").onchange = (e) => {
  filtro = e.target.value = "" ? null : e.target.value;
  renderizarTabla();
};

let checks = document.getElementsByClassName("checkbox");

for (let i = 0; i < checks.length; i++) {
  checks[i].addEventListener("change", (e) => {
    columnas[e.target.name] = !columnas[e.target.name];
    renderizarTabla();
  });
}

function renderizarTabla() {
  let tabla = document.getElementById("tabla");
  let lineas = datos.filter((el) =>
    !filtro
      ? true
      : filtro == "Docente"
      ? el instanceof Docente
      : el instanceof Alumno
  );

  let container = document.createElement("div");
  container.classList.add("table_container");
  let primerafila = document.createElement("div");
  primerafila.classList.add("table_header");
  let colnames = Object.keys(columnas);
  for (let i = 0; i < colnames.length; i++) {
    if (columnas[colnames[i]]) {
      let div = document.createElement("div");
      div.innerHTML = colnames[i];
      primerafila.appendChild(div);
    }
  }
  container.appendChild(primerafila);
  for (let i = 0; i < lineas.length; i++) {
    let fila = document.createElement("div");
    fila.classList.add("table_row");
    for (let j = 0; j < colnames.length; j++) {
      if (columnas[colnames[j]]) {
        let div = document.createElement("div");
        div.innerHTML = lineas[i][colnames[j]] ?? "";
        fila.appendChild(div);
      }
    }
    container.appendChild(fila);
  }

  tabla.replaceChildren(container);
}

renderizarTabla();
