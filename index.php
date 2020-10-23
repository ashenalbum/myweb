<?php
$url = $_SERVER['QUERY_STRING'];
if($url==""){
    require "pages/album.html";
}else{
    $base = preg_match("/^\/?[^?#/]+/",$url);
    if(!$base){
        require "src/404/404.html";
    }else{
        switch($base[0]){
            case "/three":require "pages/three.html";break;
            case "/album":require "pages/album.html";break;
            case "/album_set_provite":require "pages/album_set.html";break;
            case "/notes":require "pages/notes.html";break;
            default:require "src/404/404.html";
        }
    }
}
?>