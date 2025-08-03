const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta que obtiene un archivo Lua desde una carpeta del repo
app.get('/obtener-script', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).send('No autorizado');
  }

  try {
    // URL para listar archivos en la carpeta LUAU
    const githubApiUrl = 'https://api.github.com/repos/OkumaruSenpai/ServidorDTS/contents/BiteSpider';

    // 1. Obtener lista de archivos
    const listResponse = await axios.get(githubApiUrl, {
      headers: {
        'User-Agent': 'MyScriptLoader/1.0'
      }
    });

    const archivos = listResponse.data;

    // 2. Buscar el primer archivo .lua (o el que tú quieras)
    const primerLua = archivos.find(file => file.name.endsWith('.lua'));

    if (!primerLua || !primerLua.download_url) {
      return res.status(404).send('No se encontró archivo .lua en LUAU');
    }

    // 3. Descargar el archivo usando download_url
    const scriptResponse = await axios.get(primerLua.download_url, {
      headers: {
        'User-Agent': 'MyScriptLoader/1.0'
      }
    });

    res.send(scriptResponse.data);
  } catch (error) {
    console.error('Error al obtener el script:', error.message);
    res.status(500).send('Error al obtener el script');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
