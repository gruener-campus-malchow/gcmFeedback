<?php

require_once("../../lib/Database.php");

$database = new Database();


function get_request_handler($query) {

    $result = array();
    $result[0]['debug'] = 'Prüfe, ob event existiert.';
    $result[0]['event'] = 'Just to do right now.';

    echo json_encode($result);
}

function post_request_handler($_POST){

    $query = tidyup($_POST);

    $result = array();
    $result[0]['debug'] = 'Lege ein neues Event an oder ändere die Daten.';

    global $database;

    if (isset($query['id']){
        $event = $database->query("SELECT * FROM events WHERE id = ?",array($query['id']));
    }else{
        $event = $database->query("SELECT * FROM events");
    }

    $result[0]['db-result'] = $event;

    echo json_encode($result);


}


function tidyup($compromised){
    // Entfernt Strings, die SQL-Keywords enthalten
    $cleanArray = array_filter($sqlArray, function($value) {
        $sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER'];
        foreach ($sqlKeywords as $keyword) {
            if (stripos($value, $keyword) !== false) {
                return false; // Entfernen, wenn Keyword gefunden
            }
        }
        return true; // Behalten, wenn kein Keyword gefunden
    });
    return $cleanArray;
}



switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        get_request_handler($_GET); break;
    case "POST":
        post_request_handler($_POST); break;
    default: echo "";
}
