<?php

$con = mysql_connect("bdm256698535.my3w.com:3306","bdm256698535","1049myxmyx");
if (!$con){die('Could not connect: ' . mysql_error());}
mysql_select_db("bdm256698535_db", $con);

$username = $_POST['name'];
$text = $_POST['text'];
$iconid = $_POST['icon'];
$style = $_POST['style'];

if(isset($_POST['get'])){
    $Num = mysql_query("SELECT COUNT(*) FROM word");
    $n = mysql_fetch_array($Num);
    $n = $n[0];
    $obj = array();
    $arr = array();
    if($n < $setPageLen){
        $result = mysql_query("SELECT * FROM word WHERE id ORDER BY  id DESC");
        $id = 0;
        while($row = mysql_fetch_array($result)){
            foreach ($row as $k=>$v) {$row["$k"] = iconv('GB2312', 'UTF-8', $v);}
            $arr[$id] = array(
                'name' => $row['name'],
                'text' => $row['text'],
                'id' => $n-$id,
                'index' => $row['id'],
                'date' => $row['date'],
                'icon' => $row['icon'],
                'style' => $row['style']
            );
            $id++;
        }
        $obj['arr'] = $arr;
        echo json_encode($obj);
    }else{
        $p = 0;
        $len = 12;
        if(isset($_POST['page']) && preg_match("/^\d+$/",$_POST['page']) && $_POST['page']<$n){$p = $_POST['page'];}
        if(isset($_POST['limit']) && preg_match("/^\d+$/",$_POST['limit'])){$len = $_POST['limit'];}
        $result = mysql_query("SELECT * FROM word WHERE id ORDER BY  id DESC LIMIT $p,$len");

        $id = 0;
        while($row = mysql_fetch_array($result)){
            foreach ($row as $k=>$v) {$row["$k"] = iconv('GB2312', 'UTF-8', $v);}
            $txt = str_replace("&pozhehao;","——",$row['text']);
            $arr[$id] = array(
                'name' => $row['name'],
                'text' => $txt,
                'id' => $n-$p-$id,
                'index' => $row['id'],
                'date' => $row['date'],
                'icon' => $row['icon'],
                'style' => $row['style']
            );
            $id++;
        }
        $obj['pages'] = ceil($n/$len);
        $obj['arr'] = $arr;
        $obj['len'] = $n;
        echo json_encode($obj);
    }

}else if(isset($username)&&isset($text)){
    if($username=="反身而诚"&&$_POST["me"]!="1049"){echo json_encode(array(cont=>"口令错误"));}
    else if(mb_strlen($username,'utf-8')==0||mb_strlen($username,'utf-8')>10){echo json_encode(array(cont=>"名称长度非法"));}
	else if(mb_strlen($text,'utf-8')==0||mb_strlen($textname,'utf-8')>250){echo json_encode(array(cont=>"内容长度非法"));}
	else{
        if($username=="反身而诚"){$iconid=99;}
	    $username = iconv( 'UTF-8','GB2312', setcode($username));
	    $text = iconv( 'UTF-8','GB2312', setcode($text));
	    $time=date('Y-m-d H:i:s');
		mysql_query("INSERT INTO word (icon,name,text,date,style) VALUES ('$iconid','$username','$text','$time','$style')");
		echo json_encode(array(cont=>"提交成功"));
	}
}

function setcode($str){
    $s = $str;
    $s = str_replace("&","&amp;",$s);
    $s = str_replace("<","&lt;",$s);
    $s = str_replace(">","&gt;",$s);
    $s = str_replace(" ","&#32;",$s);
    $s = str_replace("\'","&#39;",$s);
    $s = str_replace('\"',"&#34;",$s);
    $s = str_replace('=',"&#61;",$s);
    $s = str_replace("——","&pozhehao;",$s);
    return $s;
}

//mysql_query("INSERT INTO word (name,text) VALUES ('ashen','这是测试')");
//mysql_query("DELETE FROM word WHERE id=''");

mysql_close($con);

?>