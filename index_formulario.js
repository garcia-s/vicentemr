

    
const screen = document.getElementById('screen')
const formulario = document.getElementById('Formulario')

formulario.onsubmit = (e) => {
    e.preventDefault();


    let nombre = document.getElementById('nombre').value;
    let DNI = document.getElementById('nombre').value;

    document.getElementById('display-nombre').innerHTML = nombre
    document.getElementById('display-dni').innerHTML = DNI
    
    screen.classList.toggle('show-screen')
}

var inputenviar = document.querySelector("#enviar")

function enviardatos(){

  alert("Datos Completados")


}

inputenviar.addEventListener("click", enviardatos);

window.alert();

