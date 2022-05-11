<?php
require("./constants.php");


$ruta = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'], '/'))[0] : null;
$metodo = $_SERVER['REQUEST_METHOD'];


if ($ruta === 'subirhelados' && $metodo === 'POST') {
    require_once('./HeladeriaAlta.php');
    cargarHelados();
    https: //www.google.com/search?q=dirname&oq=dirname&aqs=chrome..69i57.1680j0j7&sourceid=chrome&ie=UTF-8
} else if ($ruta === 'consultar' && $metodo === 'POST') {
    require_once('./PizzaConsultar.php');
    consultarPizza();
} else {
    http_response_code(400);
}
