<?php

$con = mysql_connect("bdm256698535.my3w.com:3306","bdm256698535","1049myx.MYX");
if (!$con){die('Could not connect: ' . mysql_error());}
mysql_select_db("bdm256698535_db", $con);

mysql_query("set character set 'utf8'");

$search = $_GET['search'];
$label = $_GET['label'];
$page = $_GET['page'];
$limit = $_GET['limit'];

$Num = mysql_query("SELECT COUNT(*) FROM essay_list");
$n = mysql_fetch_array($Num);
$n = $n[0];

$obj = array();
$arr = array();
$p = 0;
$len = 32;
if(isset($page) && preg_match("/^\d+$/",$page) && $page<$n){$p = $page;}
if(isset($limit) && preg_match("/^\d+$/",$limit)){$len = $limit;}
$start = $p * $len;

$sclabel = empty($label)?'%':'%,'.$label.',%';
$result = mysql_query("SELECT * FROM essay_list WHERE title LIKE '%".$search."%' AND label LIKE '".$sclabel."' ORDER BY id DESC LIMIT $start, $len");

$id = 0;
while($row = mysql_fetch_array($result)){
    $arr[$id] = array(
        'id' => $row['id'],
        'label' => explode(",", substr($row['label'],1,-1)),
        'title' => $row['title'],
        'addtime' => $row['addtime'],
        'cover' => $row['cover']
    );
    $id++;
}
$obj['pages'] = ceil($n/$len);
$obj['arr'] = $arr;
$obj['len'] = $n;
echo json_encode($obj);

mysql_close($con);

?>