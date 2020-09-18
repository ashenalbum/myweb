<?php
$url = $_SERVER['QUERY_STRING'];

switch($url){
    case "":require "pages/album.html";break;
    case "/index":require "pages/index.html";break;
    case "/album":require "pages/album.html";break;
    case "/album_set_provite":require "pages/album_set.html";break;
    case "/notes":require "pages/notes.html";break;
    default:require "src/404/404.html";
}
?>