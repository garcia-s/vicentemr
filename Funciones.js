var buttonCalificaciones1 = document.querySelector("#Calificaciones1")
var buttonCalificaciones2 = document.querySelector("#Calificaciones2")

function ObtenerCalificacion(){
    
    var Calificacion = prompt("¿Cual es tu nota");

     if(isNaN (Calificacion)){
     alert("Ingrese un numero")   
}

    else{var redondear = Math.round(Calificacion) }
     var n1 = redondear

     alert("tu nota es: "+redondear)

}

function adivinanumero(){

  var n1 = prompt("ingrese su numero")
  var Calificacion = Math.round(Calificacion*10);
  var aleatorio = Math.round(Calificacion*10)
  
  if(isNaN (n1)){
    alert("Ingrese un numero")
  }
  if( n1 == aleatorio){
      alert("los numeros son iguales" +n1+"!!!!!!!!!");

  }
  else
  alert("Los numeros son:  "+aleatorio+"y el numero ingresado"+n1)

             }




buttonCalificaciones2.addEventListener("click", ObtenerCalificacion);
buttonCalificaciones1.addEventListener("Click", adivinanumero);



