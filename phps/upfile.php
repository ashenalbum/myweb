<?php
header("content-type:text/html;charset=utf-8");

$key = $_POST['key'];
$file = $_FILES['file'];
$urlKey = $_POST['urlKey'];
$obj = array();

if(!isset($key) || !isset($file) || $urlKey!="1049"){
    $obj['code'] = 1;
    $obj['msg'] = "参数有误";
    echo json_encode($obj);
}else  if ($file["type"] == "image/gif" || $file["type"] == "image/jpeg" || $file["type"] == "image/jpg" || $file["type"] == "image/pjpeg" || $file["type"] == "image/x-png" || $file["type"] == "image/png"){
    createDir("../src/album/medium/" . $key . "/");
    move_uploaded_file($file["tmp_name"], "../src/album/medium/" . $key . "/" . $file["name"]);
    $obj['code'] = 0;
    $obj['src'] =  $key . "/" . $file["name"];
    echo json_encode($obj);
} else {
    $obj['code'] = 1;
    $obj['msg'] = "非法格式";
    echo json_encode($obj);
}

function createDir($path){
    if (!file_exists($path)){
        createDir(dirname($path));
        mkdir($path, 0777);
    }
}
?>