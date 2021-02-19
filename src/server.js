const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.SV_PORT, () => {
    console.log("Servidor Rodando em: http://localhost:3000");
});