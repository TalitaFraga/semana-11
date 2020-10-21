const musicas = require("../models/musicas.json")
const fs = require("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(musicas)
}

const getById = (req, res) => {
    const id = req.params.id

    const musica = musicas.find((musica) => musica.id == id)

    
    res.sendStatus(200).send(musica)
    
}



module.exports = { getAll, getById }