<?php
header("content-type:text/html;charset=utf-8");

$key = $_POST['key'];
$obj = array();

if(!isset($key) || $key!="1049"){
    $obj['code'] = 1;
    $obj['msg'] = "口令不对";
    echo json_encode($obj);
}else{
    $obj['code'] = 0;
    $obj['src'] = "/album_set_provite";
    echo json_encode($obj);
}
?>