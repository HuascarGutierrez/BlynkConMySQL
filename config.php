<?php
// Configuración de la conexión a la base de datos MySQL
$servername = "sql206.infinityfree.com";
$username = "if0_36365372";
$password = "12Listasi";
$dbname = "if0_36365372_blynk";

// Obtener los datos de la solicitud (supongamos que recibes los datos como parámetros POST)
$led = $_POST['led'];
$infrarrojo = $_POST['luz'];
$luz = $_POST['temperatura']; 
$temperatura = $_POST['potenciometro'];
$potenciometro = $_POST['infrarrojo'];
$distancia = $_POST['distancia'];


// Crear la conexión a la base de datos MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Crear la consulta SQL para insertar los datos en la tabla 'datos'
$sql = "INSERT INTO datos (led, infrarrojo, luz, temperatura, potenciometro, distancia) VALUES ('$led', '$infrarrojo', '$luz', '$temperatura', '$potenciometro', '$distancia')";

// Ejecutar la consulta SQL
if ($conn->query($sql) === TRUE) {
    header('Location: index.html');
} else {
  echo "Error al insertar datos en la base de datos: " . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
