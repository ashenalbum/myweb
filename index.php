<?php

$query = $_SERVER['QUERY_STRING'];

if($query==""){
    require "pages/album.html";
}else{
    $len = preg_match_all('/^\/([a-zA-Z0-9\-_]+)\??(.+)?$/', $query, $matches);
    $pagepath = "pages/".$matches[1][0].".html";
    if($len>0 && file_exists($pagepath)){
        require $pagepath;
    }else{
        require "src/404/404.html";
    }
}

?>