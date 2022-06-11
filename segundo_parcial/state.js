var listaVehiculos = null;
const valoresDeLista = [
    "id",
    "fabricante",
    "modelo",
    "añoLanzamiento",
    "cantidadPuertas",
    "transmision4x4",
]
const elementoLista = document.getElementById("lista");
const formdisplay = document.getElementById("form_display");
const formulario = document.getElementById("formulario_abm");
const botonesFormulario = document.getElementById("formulario_botones");
const accion = document.getElementById('accion')

const formItems = {
    id: document.getElementById("id"),
    fabricante: document.getElementById("fabricante"),
    añoLanzamiento: document.getElementById("añoLanzamiento"),
    modelo: document.getElementById("modelo"),
    tipo: document.getElementById("tipo"),
    transmision4x4: (() => {
        element = document.createElement('input')
        element.name = 'transmision4x4'
        element.type = 'text'
        return element
    })(),
    cantidadPuertas: (() => {
        element = document.createElement('input')
        element.type = 'number'
        element.name = 'cantidadPuertas'
        return element
    })(),

};

const formMode = document.getElementById('modo')
