<?php
header("content-type:text/html;charset=utf-8");

$key = $_POST['pasword'];
$json = $_POST['json'];
$obj = array();

if(!isset($key) || !isset($json)){
    $obj['code'] = 1;
    $obj['msg'] = "参数有误";
    echo json_encode($obj);
}else if($key!=="但行好事"){
    $obj['code'] = 1;
    $obj['msg'] = "口令不对";
    if($key=="天王盖地虎"){$obj['msg'] = "电视剧看多了吧";}
    echo json_encode($obj);    
}else{
    file_put_contents('../src/album/album.json',json_encode($json));
    $content = file_get_contents('../src/album/album.json');
    $obj['code'] = 0;
    $obj['json'] = json_encode($content);
    echo json_encode($obj);
}
?>