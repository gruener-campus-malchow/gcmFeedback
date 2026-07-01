# Erläuterungen zur API

- Die API lebt im Verzeichnis ./api
- Die Einsprungpunkte werden durch Unterverzeichnisse realisiert, in welchen mindestens eine index.php liegt

## Events

### GET mit id

Gibt alle Infos zu einem Event zurück. Bei falscher ID gibt es ein False zurück.

### GET ohne id

Gibt alle Events zurück.

### POST ohne id

Erstellt ein neues Event mit dem Wert aus $_POST['description'] oder einem Zufallswert, wenn der POST-Wert leer ist. Gibt die neue ID zurück und alle Event-Daten

### POST mit id

Ändern des Events, das unter $_POST['id'] zu finden ist. Bei falscher ID gibt es ein False zurück.
