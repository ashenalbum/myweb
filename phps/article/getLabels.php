<?php
header("content-type:text/html;charset=utf-8");

$con = mysql_connect("bdm256698535.my3w.com:3306","bdm256698535","1049myx.MYX");
if (!$con){die('Could not connect: ' . mysql_error());}
mysql_select_db("bdm256698535_db", $con);


mysql_query("set character set 'utf8'");
mysql_query("set names 'utf8'");

$result = mysql_query("SELECT * FROM essay_labels WHERE id ORDER BY num DESC");
$obj = array();
$arr = array();
$id = 0;
while($row = mysql_fetch_array($result)){
    $arr[$id] = array(
        'id' => (int)$row['id'],
        'text' => $row['text'],
        'num' => (int)$row['num']
    );
    $id++;
}
$obj['arr'] = $arr;
echo json_encode($obj);

mysql_close($con);

?>