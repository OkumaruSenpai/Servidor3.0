const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/obtener-script', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const carpeta = req.query.carpeta || 'LUAU'; // puedes pasar ?carpeta=BiteSpider

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).send('No autorizado');
  }

  try {
    const githubApiUrl = `https://api.github.com/repos/OkumaruSenpai/ServidorDTS/contents/${carpeta}`;

    console.log(`Listando archivos en carpeta: ${carpeta}`);

    const listResponse = await axios.get(githubApiUrl, {
      headers: {
        'User-Agent': 'MyScriptLoader/1.0',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      timeout: 5000
    });

    const archivos = listResponse.data;

    const primerLua = archivos.find(file => file.name.endsWith('.lua'));

    if (!primerLua || !primerLua.download_url) {
      return res.status(404).send(`No se encontró archivo .lua en ${carpeta}`);
    }

    console.log(`Descargando archivo: ${primerLua.name}`);

    const scriptResponse = await axios.get(primerLua.download_url, {
      headers: {
        'User-Agent': 'MyScriptLoader/1.0'
      },
      timeout: 5000
    });

    res.send(scriptResponse.data);
  } catch (error) {
    console.error('❌ Error general:', error.code || error.message);
    res.status(500).send('Error al obtener el script');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
