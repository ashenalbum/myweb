<?php

$query = $_SERVER['QUERY_STRING'];

switch($query){
    case "": require "pages/album.html"; break;
    case "/three":require "pages/three.html";break;
    case "/album":require "pages/album.html";break;
    case "/album_set_provite":require "pages/album_set.html";break;
    case "/notes":require "pages/notes.html";break;
    default:require "src/404/404.html";
}

?>