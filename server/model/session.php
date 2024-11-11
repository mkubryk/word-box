<?php
require_once("client.php");

class session {
    public static function clientConnected() {
        return isset($_SESSION["userName"]);
    }

    public static function clientConnecting() {
        return isset($_GET["action"]) && $_GET["action"] == "connect";
    }
}