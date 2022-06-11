class Vehiculo {
  id;
  fabricante;
  modelo;
  añoLanzamiento;

  constructor({ id, fabricante, modelo, añoLanzamiento }) {
    this.id = id;
    this.fabricante = fabricante;
    this.modelo = modelo;
    this.añoLanzamiento = añoLanzamiento;
  }

  toJsonString(conId) {
    let object = {
      fabricante: this.fabricante,
      modelo: this.modelo,
      añoLanzamiento: this.añoLanzamiento,
    };
    if (conId) object.id = this.id;
    return JSON.stringify(object);
  }

  toString() {
    return JSON.stringify(this);
  }
}

class Auto extends Vehiculo {
  cantidadPuertas;

  constructor({ id, fabricante, modelo, añoLanzamiento, cantidadPuertas }) {
    super({ id, fabricante, modelo, añoLanzamiento });
    this.cantidadPuertas = cantidadPuertas;

  }

  toJsonString(conId) {
    let obj = JSON.parse(super.toJsonString(conId));
    obj.cantidadPuertas = this.cantidadPuertas;
    return JSON.stringify(obj);
  }
}

class Camioneta extends Vehiculo {
  transmision4x4;

  constructor({ id, fabricante, modelo, añoLanzamiento, transmision4x4 }) {
    super({ id, fabricante, modelo, añoLanzamiento });
    this.transmision4x4 = transmision4x4;

  }

  toJsonString(conId) {
    let obj = JSON.parse(super.toJsonString(conId));
    obj.transmision4x4 = this.transmision4x4;
    obj.materia = this.materia;
    return JSON.stringify(obj);
  }
}
