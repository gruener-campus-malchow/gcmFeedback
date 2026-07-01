<?php

//require_once("../../lib/Database.php");

//$database = new Database();


function get_request_handler($query) {



    $group_id = explode(":"$query['id']);

    if ($group_id[0]==="g")
    {

        $dateipfad = '../data/'.$group_id[1].'.json';

        $result[0]['debug']='Prüfe, ob Gruppe schon existiert.';


        if (file_exists($dateipfad)) {
            // Datei existiert, öffnen
            $jsonInhalt = file_get_contents($dateipfad);
            if ($jsonInhalt !== false) {
                $daten = json_decode($jsonInhalt, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    // JSON erfolgreich eingelesen und dekodiert
                    //$result[0]['details'] = print_r($daten,true); // Beispiel: Ausgabe des Arrays

                    $result[0]['json']=$jsonInhalt;
                    $result[0]['details'] = 'Metadata: '.print_r($daten['meta'],true);
                    $result[0]['group'] = $query['id'];

                } else {
                    $result[0]['debug'].= "Fehler beim Dekodieren des JSON: " . json_last_error_msg();
                }
            } else {
                $result[0]['debug'].= "Die Datei konnte nicht gelesen werden.";
            }
        } elseif($_SESSION['role']=="manager") {

            $result[0]['debug'].=  "Die Datei existiert noch nicht. Sie wird erzeugt.";

            $foo = array();
            $foo['meta']['description']='In den Meta-Block können wir gruppenspezifische Daten speichern'.
            $foo['activities']=array();

            $inhalt = json_encode($foo);

            if (file_put_contents($dateipfad, $inhalt) !== false) {
                 $result[0]['debug'].= "Datei wurde erfolgreich erstellt und beschrieben.";
                 $result[0]['group'] = $query['id'];
            } else {
                 $result[0]['debug'].= "Fehler beim Erstellen oder Schreiben der Datei.";
            }

        }else{
            $result[0]['debug']='Kein Gruppe unter dem Namen registriert.';
        }





    }else
    {
        $result[0]['debug']='Kein Gruppencode.';
    }

    /*
    global $database;

    //$result = $database->query("SELECT * FROM personen WHERE externe_id = ?",array('$query[id]'));
    $result = $database->query("SELECT * FROM personen WHERE externe_id = ?",array($query['id']));
    $result[0]['details']='
    <h1>much more information</h1>
    <table class="data">
    <tr>
    <th>Überschrift 1</th>
    <th>Überschrift 2</th>
    <th>Überschrift 3</th>
    <th>Überschrift 4</th>
    </tr>
    <tr>
    <td>Eintrag Erste Zeile 1</td>
    <td>Eintrag Erste Zeile 2</td>
    <td>Eintrag Erste Zeile 3</td>
    <td>Eintrag Erste Zeile 4</td>
    </tr>
    <tr>
    <td>Eintrag Zeile 1</td>
    <td>Eintrag Zeile 2</td>
    <td>Eintrag Zeile 3</td>
    <td>Eintrag Zeile 4</td>
    </tr>
    <tr>
    <td>Eintrag Letzte Zeile 1</td>
    <td>Eintrag Letzte Zeile 2</td>
    <td>Eintrag Letzte Zeile 3</td>
    <td>Eintrag Letzte Zeile 4</td>
    </tr>';

    */





    echo json_encode($result);
}


switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        get_request_handler($_GET); break;
    default: echo "";
}
