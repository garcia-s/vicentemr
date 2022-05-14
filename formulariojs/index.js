let cadena =
  '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2,"cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266,"cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666,"modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0,"cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988,"altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR","anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}]';

class Vehiculo {
  constructor({ id, modelo, añoFabricacion, velocidadMaxima }) {
    this.id = id;
    this.modelo = modelo;
    this.añoFabricacion = añoFabricacion;
    this.velocidadMaxima = velocidadMaxima;
  }
}

class Aereo extends Vehiculo {
  constructor({
    id,
    modelo,
    añoFabricacion,
    velocidadMaxima,
    alturaMaxima,
    autonomia,
  }) {
    super({ id, modelo, añoFabricacion, velocidadMaxima });
    this.alturaMaxima = alturaMaxima;
    this.autonomia = autonomia;
  }
}

class Terrestre extends Vehiculo {
  constructor({
    id,
    modelo,
    añoFabricacion,
    velocidadMaxima,
    cantidadPuertas,
    cantidadRuedas,
  }) {
    super({ id, modelo, añoFabricacion, velocidadMaxima });
    this.cantidadPuertas = cantidadPuertas;
    this.cantidadRuedas = cantidadRuedas;
  }
}

let datos = JSON.parse(cadena).map((element) =>
  element.cantRue != undefined
    ? new Terrestre({
        ...element,
        cantidadPuertas: element.cantPue,
        cantidadRuedas: element.cantRue,
        añoFabricacion: element.añoFabricacion,
        velocidadMaxima: element.velMax,
      })
    : new Aereo({
        ...element,
        alturaMaxima: element.altMax,
        añoFabricacion: element.añoFabricacion,
        velocidadMaxima: element.velMax,
      })
);
let columnas = {
  id: true,
  modelo: true,
  añoFabricacion: true,
  velocidadMaxima: true,
  alturaMaxima: true,
  autonomia: true,
  cantidadPuertas: true,
  cantidadRuedas: true,
};

let filtro = null;

let lineas;
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
  lineas = datos.filter((el) =>
    !filtro
      ? true
      : filtro == "Terrestre"
      ? el instanceof Terrestre
      : el instanceof Aereo
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

document.getElementById("abrir-formulario").onclick = () => {
  let formulario = {};
  let inputs = document.getElementsByClassName("input_formulario");
  let elementoformulario = document.getElementById("formulario");
  let botonAgregar = document.getElementById("agregar");
  let botonModificar = document.getElementById("modificar");
  let botonEliminar = document.getElementById("eliminar");
  const actualizarFormulario = (e) => {
    formulario[e.target.name] = e.target.value;
    console.log(formulario);
  };

  const cancelar = () => {
    botonAgregar.removeEventListener("click", agregar);
    botonModificar.removeEventListener("click", agregar);
    botonEliminar.removeEventListener("click", agregar);
    elementoformulario.classList.remove("show");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].removeEventListener("change", actualizarFormulario);
    }
    formulario = {};
  };

  const agregar = () => {
    datos.push(
      formulario.tipo && formulario.tipo === "Terrestre"
        ? new Terrestre(formulario)
        : new Aereo(formulario)
    );
    console.log(datos);
    renderizarTabla();
    cancelar();
  };
  const modificar = () => {
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].id === formulario.id) {
        datos[i] =
          datos[i] instanceof Aereo
            ? new Aereo({ ...datos[i], ...formulario })
            : new Terrestre({ ...datos[i], ...formulario });
      }
    }
    cancelar();
  };

  const eliminar = () => {
    datos = datos.filter((el) => el.id != formulario.id);
    renderizarTabla();
    cancelar();
  };
  botonModificar.addEventListener("click", modificar);
  botonEliminar.addEventListener("click", eliminar);
  botonAgregar.addEventListener("click", agregar);
  formularioAbierto = true;
  elementoformulario.classList.add("show");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", actualizarFormulario);
  }
  //cancelar

  document.getElementById("cancelar").addEventListener("click", cancelar);

  formularioAbierto = false;
};

document.getElementById("calcular-promedio").addEventListener("click", () => {
  let suma = 0;
  for (let i = 0; i < lineas.length; i++) {
    suma = suma + lineas[i].velocidadMaxima;
  }
  document.getElementById("promedio").innerHTML = suma / lineas.length;
});
