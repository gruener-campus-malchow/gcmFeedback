<?php

require_once("../../config.php");

class Database
{
    private $connection;

    //public function __construct($host=DB_HOST, $username=DB_USER, $password=DB_PASSWORD, $database=DB_NAME)
    public function __construct()
    {
        $host=DB_HOST;
        $username=DB_USER;
        $password=DB_PASSWORD;
        $database=DB_NAME;

        try
        {
            $this->connection = new PDO("mysql:host=$host;dbname=$database", $username, $password);
        }
        catch (PDOException $e)
        {
            if (ENV == 'DEV') echo 'Database connection failed: ' . $e->getMessage();
        }
    }

    public function query($query, $values = [], $fetchMode = PDO::FETCH_ASSOC)
    {
        if (!isset($this->connection)) return false;
        $statement = $this->connection->prepare($query);
        foreach ($values as $key => $value)
        {
            $statement->bindValue($key + 1, $value);
        }
        if ($statement->execute())
        {
            return $statement->fetchAll($fetchMode);
        }
        elseif (ENV == 'DEV')
        {
            return $statement->queryString;//$statement->errorInfo();
        }
        return false;
    }

    public function getLastInsertId()
    {
        $id = $this->connection->lastInsertId();
        if (is_numeric($id)) $id = $id + 0;
        return $id;
    }
}
