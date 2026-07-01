<?php

// 1. Alle Fehlerarten berichten (inkl. zukünftiger Levels)
error_reporting(E_ALL);

// 2. Fehler im Browser anzeigen
ini_set('display_errors', 1);

// 3. Auch Fehler anzeigen, die beim PHP-Start auftreten (wichtig für Parse-Fehler)
ini_set('display_startup_errors', 1);

require_once("../../lib/Database.php");

$database = new Database();


switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        get_request_handler($_GET);
        //echo "GET";
        break;
    case "POST":
        post_request_handler($_POST);
        echo "POST";
        break;
    default:
        http_response_code(405); // Wichtig für korrekte API-Antworten
        header('Allow: GET, POST'); // Informiert den Client über erlaubte Methoden
        echo "Methode nicht erlaubt";
        break;
}










function get_request_handler($query) {

    $result = array();
    $result[0]['debug'] = 'Prüfe, ob event existiert.';
    $result[0]['event'] = 'Just to do right now.';

    echo json_encode($result);
}



function post_request_handler($query){

    //$query = tidyup($_POST);

    $result = array();
    $result[0]['debug'] = 'Lege ein neues Event an oder ändere die Daten.';

    global $database;

    if (isset($query['id'])){
        $event = $database->query("SELECT * FROM events WHERE id = ?",array($query['id']));
        //echo'there is an id';
    }
    else{
        //$event = $database->query("SELECT * FROM events");
        echo'there is NO id';
    }

    $result[0]['db-result'] = $event;

    echo json_encode($result);


}
