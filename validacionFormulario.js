const d= document;

const $response = d.querySelector(".contact-fore-response");

export default function validacionFormulario(){


}

d.addEventListener("submit",(e)=> {
    e.preventDefault;
    alert("Formulario enviado con exito");
    $response.classList.remove("none");
})



