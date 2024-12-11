const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve arquivos estáticos da pasta 'src'
app.use(express.static(path.join(__dirname,)));

// Responde ao caminho raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});