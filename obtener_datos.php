<?php
// Datos de conexión a la base de datos
//$servername = "sql206.infinityfree.com"; // Cambia esto por el nombre de tu servidor MySQL
//$username = "if0_36365372"; // Cambia esto por tu nombre de usuario de MySQL
//$password = "12listasi"; // Cambia esto por tu contraseña de MySQL
//$dbname = "if0_36365372_blynk"; // Cambia esto por el nombre de tu base de datos
$servername = "localhost"; // Cambia esto por el nombre de tu servidor MySQL
$username = "root"; // Cambia esto por tu nombre de usuario de MySQL
$password = ""; // Cambia esto por tu contraseña de MySQL
$dbname = "blynk"; // Cambia esto por el nombre de tu base de datos
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener los datos de la tabla
$sql = "SELECT * FROM datos";
$result = $conn->query($sql);

// Mostrar los datos en una tabla HTML
if ($result->num_rows > 0) {
    echo "<table border='1'>
    <tr>
    <th>Led</th>
    <th>Luz</th>
    <th>Temperatura</th>
    <th>Potenciómetro</th>
    <th>Infrarrojo</th>
    </tr>";
    
    // Imprimir los datos de cada fila en la tabla
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["led"]. "</td>";
        echo "<td>" . $row["infrarrojo"]. "</td>";
        echo "<td>" . $row["luz"]. "</td>";
        echo "<td>" . $row["temperatura"]. "</td>";
        echo "<td>" . $row["potenciometro"]. "</td>";
        echo "</tr>";
    }
    
    echo "</table>";
} else {
    echo "0 resultados";
}

// Cerrar la conexión
$conn->close();
?>
