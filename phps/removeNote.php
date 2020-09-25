<?php
header("content-type:text/html;charset=utf-8");

$key = $_POST['key'];
$id = $_POST['id'];
$obj = array();

if(!isset($key) || $key!="1049"){
    $obj['code'] = 1;
    $obj['msg'] = "口令不对";
    if($key=="天王盖地虎"){$obj['msg'] = "电视剧看多了吧";}
    echo json_encode($obj);
}else{    
    $con = mysql_connect("bdm256698535.my3w.com:3306","bdm256698535","1049myxmyx");
    if (!$con){die('Could not connect: ' . mysql_error());}
    mysql_select_db("bdm256698535_db", $con);

    $sql = 'DELETE FROM word WHERE id = '.$id;
    $retval = mysql_query( $sql );
    if(! $retval ){die($sql);}

    $obj['code'] = 0;
    echo json_encode($obj);
    mysqli_close();
}
?>