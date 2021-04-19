<?php

$con = mysql_connect("bdm256698535.my3w.com:3306","bdm256698535","1049myx.MYX");
if (!$con){die('Could not connect: ' . mysql_error());}
mysql_select_db("bdm256698535_db", $con);

mysql_query("set character set 'utf8'");

$search = $_GET['id'];

$result = mysql_query("SELECT * FROM essay_list WHERE id=$search");

$id = 0;
$arr = null;
$obj = array();

while($row = mysql_fetch_array($result)){
    $html = "";
    $file_path = "../../_articlePage/".$row['html'];

    if(file_exists($file_path)){
        $fp = fopen($file_path,"r");
        $html = fread($fp, filesize($file_path));
    }
    $arr = array(
        'id' => $row['id'],
        'label' => explode(",", substr($row['label'],1,-1)),
        'title' => $row['title'],
        'addtime' => $row['addtime'],
        'covertype' => $row['covertype'],
        'imgs' => explode(",",$row['imgs']),
        'content' => $html
    );
    $id++;
}
if(is_array($arr)){
    $obj['code'] = 0;
    $obj['data'] = $arr;
}else{
    $obj['code'] = 1;
    $obj['msg'] = "未找到数据";
}
echo json_encode($obj);

mysql_close($con);

?>
