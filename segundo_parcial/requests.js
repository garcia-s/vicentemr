const traerData = () => {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:5000/Vehiculos/Vehiculos");
  req.send();
  req.onreadystatechange = () => {
    if (req.status === 200 && req.readyState === 4) {
      try {
        console.log(JSON.parse(req.responseText))
        listaVehiculos = mapearListaAClasses(JSON.parse(req.responseText))
        renderList();
      }
      catch (e) {
        console.error(e)
      }
    }
  }
};

const mapearListaAClasses = (lista) => {
  if (!Array.isArray(lista)) return [];
  let response = [];
  for (let i = 0; i < lista.length; i++) {
    let element;

    if (lista[i].transmision4x4) {
      //Map to docente
      element = new Camioneta(lista[i]);
    } else if (lista[i].cantidadPuertas) {
      element = new Auto(lista[i]);
    }
    if (element) {
      response.push(element);
    }
  }
  return response;
};



const eliminarElemento = async () => {
  const response = await fetch('http://localhost:5000/Vehiculos/EliminarVehiculo',
    {
      method: 'DELETE',
      body: JSON.stringify({ id: formItems.id.value }),
      headers: {
        'Content-type': "application/json"
      }
    })
  if (response.status !== 200) throw Error();
}


const modificarElemento = async () => {
  const objeto = {
    id: formItems.id.value,
    fabricante: formItems.fabricante.value,
    añoLanzamiento: formItems.añoLanzamiento.value,
    modelo: formItems.modelo.value,
  }
  if (formItems.tipo.value === "Camioneta") {
    objeto.transmision4x4 = formItems.transmision4x4.value
  } else {
    objeto.cantidadPuertas = formItems.cantidadPuertas.value
  }
  const route = formItems.tipo.value === "Camioneta" ?
    "ModificarCamioneta" : 'ModificarAuto';
  const response = await fetch('http://localhost:5000/Vehiculos/' + route, {
    method: 'POST',
    body: JSON.stringify(objeto),
    headers: {
      'Content-type': "application/json"
    }
  })
  if (response.status !== 200) throw Error();
  return objeto
}

const crearElemento = (callback) => {
  const objeto = {
    fabricante: formItems.fabricante.value,
    añoLanzamiento: formItems.añoLanzamiento.value,
    modelo: formItems.modelo.value,
  }
  if (formItems.tipo.value === "Camioneta") {
    objeto.transmision4x4 = formItems.transmision4x4.value


  } else {

    objeto.cantidadPuertas = formItems.cantidadPuertas.value
  }
  const route = formItems.tipo.value === "Camioneta" ?
    "InsertarCamioneta " : 'InsertarAuto';
  fetch('http://localhost:5000/Vehiculos/' + route, {
    method: 'PUT',
    body: JSON.stringify(objeto),
    headers: {
      'Content-type': "application/json"
    }
  }).then((response) => {
    if (response.status !== 200) throw Error()
    return response.json()
  }).then(data => {
    console.log(data)
    objeto.id = data.id
    console.log(objeto)
    callback(objeto)
  })
  return objeto
}