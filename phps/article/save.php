<?php
header("content-type:text/html;charset=utf-8");

$con = mysql_connect("bdm256698535.my3w.com:3306","bdm256698535","1049myx.MYX");
if (!$con){die('Could not connect: ' . mysql_error());}
mysql_select_db("bdm256698535_db", $con);

mysql_query("set character set 'utf8'");
mysql_query("set names 'utf8'");

$title = $_POST['title'];
$text = $_POST['text'];
$label = ','.$_POST['label'].',';
$cover = $_POST['cover'];
$key = $_POST['key'];

$obj = array();

if(!isset($key) || !isset($title) || !isset($text) || !isset($label)){
    $obj['code'] = 1;
    $obj['msg'] = "参数有误";
    $obj['key'] = $key;
    $obj['label'] = $label;
    $obj['text'] = $text;
    $obj['title'] = $title;
    echo json_encode($obj);
}else if($key!=="1049"){
    $obj['code'] = 1;
    $obj['msg'] = "口令不对";
    echo json_encode($obj);
}else{
    $fileName = time().'.html';
    // fopen('/_articlePage/'.$fileName);
    // file_put_contents('/_articlePage/'.$fileName, $text);

    $myfile = fopen('../../_articlePage/'.$fileName,"w") or die("创建文件错误");
    fwrite($myfile, $text);
    fclose($myfile);

    $time = date('Y-m-d H:i:s');
    mysql_query("INSERT INTO essay_list (html,label,title,addtime,cover) VALUES ('$fileName','$label','$title','$time','$cover')");

    $obj['code'] = 0;
    $obj['msg'] = "success";
    echo json_encode($obj);
}

mysql_close($con);

?>