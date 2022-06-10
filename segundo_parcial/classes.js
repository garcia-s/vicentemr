class Persona {
  id;
  dni;
  apellido;
  nombres;

  constructor({ id, dni, apellido, nombres }) {
    this.id = id;
    this.dni = dni;
    this.apellido = apellido;
    this.nombres = nombres;
  }

  toJsonString(conId) {
    let object = {
      dni: this.dni,
      apellido: this.apellido,
      nombres: this.nombres,
    };
    if (conId) object.id = this.id;
    return JSON.stringify(object);
  }

  toString() {
    return JSON.stringify(this);
  }
}

class Alumno extends Persona {
  cursoNumero;
  cursoLetra;

  constructor({ id, dni, apellido, nombres, cursoNumero, cursoLetra }) {
    super({ id, dni, apellido, nombres });
    this.cursoNumero = cursoNumero;
    this.cursoLetra = cursoLetra;
  }

  toJsonString(conId) {
    let obj = JSON.parse(super.toJsonString(conId));
    obj.cursoLetra = this.cursoLetra;
    obj.cursoNumero = this.cursoNumero;
    return JSON.stringify(obj);
  }
}

class Docente extends Persona {
  año;
  materia;

  constructor({ id, dni, apellido, nombres, año, materia }) {
    super({ id, dni, apellido, nombres });
    this.año = año;
    this.materia = materia;
  }

  toJsonString(conId) {
    let obj = JSON.parse(super.toJsonString(conId));
    obj.año = this.año;
    obj.materia = this.materia;
    return JSON.stringify(obj);
  }
}
