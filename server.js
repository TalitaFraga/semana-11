const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants")
const app = require("./src/app")
const port = 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})