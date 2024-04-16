const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blynk'
});

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta para guardar los datos en la base de datos
app.post('http://localhost:3000/api/guardar-datos', (req, res) => {
  const { v0, v1, v2, v3, v128 } = req.body;

  // Insertar los datos en la base de datos
  const query = 'INSERT INTO datos (led, infrarojo, luz, temperatura, potenciometro) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [v0, v1, v2, v3, v128], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al guardar los datos' });
    } else {
      res.json({ mensaje: 'Datos guardados correctamente' });
    }
  });
});

// Ruta para obtener los datos de la base de datos
app.get('http://localhost:3000/api/obtener-datos', (req, res) => {
  const query = 'SELECT * FROM datos';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los datos' });
    } else {
      res.json(results);
    }
  });
});

// Servir la página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

// Evento que se ejecuta cada 15 segundos
setInterval(function() {
  // Obtener los valores de los pines virtuales
  var v0 = blynk.virtualRead(0); // led
  var v1 = blynk.virtualRead(1); // infrarojo
  var v2 = blynk.virtualRead(2); // luz
  var v3 = blynk.virtualRead(3); // temperatura
  var v128 = blynk.virtualRead(128); // potenciometro

  // Enviar los datos al servidor
  fetch('http://localhost:3000/api/guardar-datos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ v0, v1, v2, v3, v128 })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}, 15000);

function obtenerDatos() {
  fetch('http://localhost:3000/api/obtener-datos')
    .then(response => response.json())
    .then(data => {
      const dataTable = document.getElementById('data-table');
      dataTable.innerHTML = '';

      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.led}</td>
          <td>${row.infrarojo}</td>
          <td>${row.luz}</td>
          <td>${row.temperatura}</td>
          <td>${row.potenciometro}</td>
        `;
        dataTable.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Obtener los datos inicialmente
obtenerDatos();

// Actualizar los datos cada 15 segundos
setInterval(obtenerDatos, 15000);