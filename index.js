const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/obtener-script', async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).send('No autorizado');
  }

  try {
    // Cambia esta URL por la ruta exacta al archivo Lua en GitHub
    const url = 'https://raw.githubusercontent.com/OkumaruSenpai/ServidorDTS/main/BiteSpider/script.lua';

    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener el script');
    console.error('Error al obtener el script:', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
