//Selecciona el elemento HTML con id "formulario-1"
const formulario = document.getElementById('formulario-1')

const nombre = document.getElementById('nombre');
const dni = document.getElementById('dni');
const telefono = document.getElementById('telefono')
const email = document.getElementById('email')
const comentarios = document.getElementById('comentarios')



formulario.onsubmit = (e) => {
  // Previene que se ejecute la accion por defecto
  e.preventDefault();

  document.getElementById('display-nombre').innerText = nombre.value
  document.getElementById('display-dni').innerText = dni.value
  document.getElementById('display-telefono').innerText = telefono.value
  document.getElementById('display-email').innerText = email.value
  document.getElementById('display-comentarios').innerText = comentarios.value
  window.alert(`Nombre: ${nombre.value}
  DNI: ${dni.value} 
  Tefono:${telefono.value}
  Email:${email.value}
  Comentarios:${comentarios.value} 
  `)
}