<?php
function cargarHelados()
{

    if (
        //validacion del sabois_intr
        (isset($_POST['sabor'])  && gettype($_POST['sabor']) === 'string') &&
        // validacion del precio
        isset($_POST['precio']) && is_numeric($_POST['precio']) &&
        // validacion del tipo
        isset($_POST['tipo']) && ($_POST['tipo'] === "agua" or $_POST['tipo'] === 'crema') &&
        // validacion del tipo
        isset($_POST['cantidad']) && is_numeric($_POST['cantidad']) &&
        isset($_FILES['imagen'])
    ) {
        $imagen = null;
        if (isset($_FILES['imagen'])) {
            $imagen = putFile($_FILES['imagen']);
        }
        $helado = [
            "sabor" => $_POST['sabor'],
            "tipo" => $_POST['tipo'],
            "precio" => round(doubleval($_POST['precio']), 1),
            "cantidad" => intval($_POST['cantidad']),
        ];
        $data = getData();
        $id = getId($helado, $data);

        if ($id === -1) {
            $helado['id'] = count($data);
            $helado["imagen"] = $imagen;
            array_push($data, $helado);
        } else {
            $helado['id'] = $id;
            $helado["cantidad"] = $helado["cantidad"] + $data[$id]['cantidad'];
            $helado["imagen"] = isset($imagen) ? $imagen : $data[$id]['imagen'];
            $data[$id] = $helado;
        }
        setData($data);
        header('Content-type: application/json');
        echo (json_encode($helado));
        return;
    }
    return http_response_code(400);
}


function dnd($data)
{
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
    die();
}
function putFile($file)
{
    // dnd($file)
    $carpeta = $_SERVER["DOCUMENT_ROOT"] . "/heladeria/ImagenesDeHelados/";
    $archivo = date("Y-m-d H:i:s") . $file['name'];
    $dir_archivo = $carpeta .  $archivo;
    move_uploaded_file($file['tmp_name'], $dir_archivo);
    return URL . '/ImagenesDeHelados/' . $archivo;
}
function getId($helado, $data)
{
    if (count($data) === 0)   return -1;

    for ($i =  0; $i < count($data); $i++) {
        if (
            $data[$i]["sabor"] === $helado["sabor"] &&
            $data[$i]["tipo"] === $helado["tipo"]
        ) {
            return $i;
        }
    }
    return -1;
}
function getData()
{
    $nombreArchivo = 'heladeria.json';
    $file = fopen($nombreArchivo, 'r');
    $data = json_decode(fread($file, filesize($nombreArchivo)), true);

    fclose($file);

    return array_values($data);
}

function setData($data)
{

    $nombreArchivo = 'heladeria.json';
    $file = fopen($nombreArchivo, 'w');
    fwrite($file, json_encode($data));
    fclose($file);
}
