<?php

session_start();
//Words here have to be longer than 5 characters!
$_SESSION["wordArray"]=array("aeroplane", "blitzkrieg", "poland", "motherland");

$wordArray=$_SESSION["wordArray"];
$rand=rand(0, count($_SESSION["word"]));
$_SESSION["word"]=$wordArray[$rand];
$long=strlen($_SESSION["word"]);

//We give to the controller, the random word from the list, and the lenght of it.
echo '{"Word":"' . $_SESSION["word"] . '","longitude":"' . $long . '"}';
