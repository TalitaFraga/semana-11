const musicas = require("../models/musicas.json")
const fs = require("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(musicas)
}

const getById = (req, res) => {
    const id = req.params.id

    const musica = musicas.find((musica) => musica.id == id)

    
    res.status(200).send(musica)
    
}

const postMusicas = (req, res) => {
    console.log(req.body)
    const { id, title, duration, launchYear, favorited, artists } = req.body
    musicas.push({ id, title, duration, launchYear, favorited, artists })

    fsWriteFile(res)

    res.status(201).send(musicas)

}

const deleteMusicas = (req, res) => {
    try {
        const id = req.params.id
        const musicaFiltrada = musicas.filter(musica => musica.id == id )

        fsWriteFile(res)
    
    
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Erro ao deletar música"})

    }
} 


module.exports = { getAll, getById, postMusicas, deleteMusicas }



const fsWriteFile = (res) => fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function(err) {
    if (err) {
        console.log(err)
        return res.status(424).send({ message: err })
    }
    console.log("Arquivo atualizado com sucesso!")
})