const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/obtener-script', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  console.log('Petición recibida con API Key:', apiKey);

  if (apiKey !== process.env.API_KEY) {
    console.log('API Key inválida');
    return res.status(401).send('No autorizado');
  }

  try {
    const url = 'https://raw.githubusercontent.com/OkumaruSenpai/ServidorDTS/main/BiteSpider/script.lua';
    console.log('Solicitando script a:', url);

    const response = await axios.get(url);

    console.log('Script obtenido exitosamente');
    res.send(response.data);
  } catch (error) {
    console.error('Error al obtener el script:', error.message);
    res.status(500).send('Error al obtener el script');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
