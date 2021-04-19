<?php
header("content-type:text/html;charset=utf-8");

$file = $_FILES['file'];
$urlKey = $_POST['pwd'];
$obj = array();

if(!isset($file) || $urlKey!="1049"){
    $obj['code'] = 1;
    $obj['msg'] = "参数有误";
    echo json_encode($obj);
}else  if ($file["type"] == "image/gif" || $file["type"] == "image/jpeg" || $file["type"] == "image/jpg" || $file["type"] == "image/pjpeg" || $file["type"] == "image/x-png" || $file["type"] == "image/png"){
    $filename = time() . $file["name"];
    move_uploaded_file($file["tmp_name"], "../../_articleFile/" . $filename);
    $obj['code'] = 0;
    $obj['default'] = 'http://'.$_SERVER['SERVER_NAME'] . '/_articleFile/' . $filename;
    echo json_encode($obj);
} else {
    $obj['code'] = 1;
    $obj['msg'] = "非法格式";
    echo json_encode($obj);
}

?>