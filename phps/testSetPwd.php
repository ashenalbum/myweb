<?php
header("content-type:text/html;charset=utf-8");

$key = $_POST['key'];
$obj = array();

if(!isset($key) || $key!="1049"){
    $obj['code'] = 1;
    $obj['msg'] = "口令不对";
    if($key=="天王盖地虎"){$obj['msg'] = "电视剧看多了吧";}
    echo json_encode($obj);
}else{
    $obj['code'] = 0;
    $obj['src'] = "/pages/album_set.html";
    echo json_encode($obj);
}
?>