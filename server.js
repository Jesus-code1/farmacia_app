const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar la conexión a la base de datos
/*
const db = mysql.createConnection({
  host: '34.175.46.197',     // Cambia esto a tu host de MySQL (por ejemplo, localhost)
  user: 'root',
  password : '1234',
 // socketPath:"/cloudsql/tribal-bonito-426018-v8:europe-southwest1:bbdd-farma",     
  database: 'farmacia_app'  // Asegúrate de que el nombre de la base de datos sea correcto
});

*/
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos como id', db.threadId);
});


app.get('/', (req, res) => {
    res.send("HOlaaa")
});
// Ruta de ejemplo para obtener clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM Clientes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM Productos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get('/farmacias', (req, res) => {
  db.query('SELECT * FROM Farmacias', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get('/laboratorios', (req, res) => {
  db.query('SELECT * FROM Laboratorios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


// CRUD para la tabla Clientes
const Clientes = {
  // Crear un nuevo cliente
  crearCliente: function (cliente, callback) {
    connection.query('INSERT INTO Clientes SET ?', cliente, callback);
  },

  // Obtener todos los clientes
  obtenerClientes: function (callback) {
    connection.query('SELECT * FROM Clientes', callback);
  },

  // Actualizar un cliente
  actualizarCliente: function (id, cliente, callback) {
    connection.query('UPDATE Clientes SET ? WHERE id = ?', [cliente, id], callback);
  },

  // Eliminar un cliente
  eliminarCliente: function (id, callback) {
    connection.query('DELETE FROM Clientes WHERE id = ?', id, callback);
  }
};

// CRUD para la tabla Farmacias (puedes seguir un patrón similar para otras tablas)

const Farmacias = {
  // Crear una nueva farmacia
  crearFarmacia: function (farmacia, callback) {
    connection.query('INSERT INTO Farmacias SET ?', farmacia, callback);
  },

  // Obtener todas las farmacias
  obtenerFarmacias: function (callback) {
    connection.query('SELECT * FROM Farmacias', callback);
  },

  // Actualizar una farmacia
  actualizarFarmacia: function (id, farmacia, callback) {
    connection.query('UPDATE Farmacias SET ? WHERE id = ?', [farmacia, id], callback);
  },

  // Eliminar una farmacia
  eliminarFarmacia: function (id, callback) {
    connection.query('DELETE FROM Farmacias WHERE id = ?', id, callback);
  }
};

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});