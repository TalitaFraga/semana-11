const musicas = require("../models/musicas.json")
const fs = require("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(musicas)
}

const getById = (req, res) => {
    const id = req.params.id

    const musica = musicas.find((musica) => musica.id == id)

    if (musica) {
        res.status(200).send(musica)
    } else {
        res.status(404).send("Música não encontrada")
    }
    
}

const getByArtists = (req, res) => {
    const artists = req.params.artists

    const musicasEncontradas = musicas.filter((musica) => musica.artists.includes(artists))

    if(musicasEncontradas.length > 0) {
        res.status(200).send(musicasEncontradas)
    } else {
        res.status(404).send("Artista não encontrado")
    }
}

const getByYear = (req, res) => {
    const launchYear = req.params.launchYear

    const musicasEncontradas = musicas.filter((musica) => musica.launchYear >= launchYear)

    if(musicasEncontradas.length > 0) {
        res.status(200).send(musicasEncontradas)
    } else {
        res.status(404).send("Músicas não encontradas")
    }
}

const postMusicas = (req, res) => {

    const { title, duration, launchYear, favorited, artists } = req.body

    musicas.push({ id:musicas.length + 1, title, duration, launchYear, favorited, artists })

    fsWriteFile(res, musicas)

    res.status(201).send(musicas)
}

const deleteMusicas = (req, res) => {
    try {
        const id = req.params.id
        const musicaFiltrada = musicas.filter(musica => musica.id != id )

        fsWriteFile(res, musicaFiltrada)
        res.status(200).send(musicaFiltrada)
    
    
    } catch (error) {   
        res.status(500).send({ message: "Erro ao deletar música"})
    }
} 

const putMusicas = (req, res) => {
    try {
        const id = req.params.id

        const newMusica = req.body

        const musicasAtualizadas = musicas.map((musica) => {
            if(musica.id == id) return newMusica
            return musica
        })

        fsWriteFile(res, musicasAtualizadas)
        res.status(200).send(musicasAtualizadas)
    
    } catch (err) {
        return res.status(424).send({ message: err })
    }
}

const patchMusicasStatus = (req, res) => {
    try {
        const id = req.params.id
        const newFavorited = req.body.favorited

        const musicaToUpdate = musicas.find(musica => musica.id == id)
        const musicaIndex = musicas.indexOf(musicaToUpdate)

        if (musicaIndex >= 0) {

            musicaToUpdate.favorited = newFavorited
            musicas.splice(musicaIndex, 1, musicaToUpdate)
            fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function(err) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log("Arquivo de filme foi atualizado com sucesso!")
                    const musicaToUpdate = musicas.find(musica => musica.id == id)
                    res.status(200).send(musicaToUpdate)
                }
            })    
        } else {
            res.status(400).send({ message: "Musica não encontrada para atualizar o status de favorita"})
        }
    } catch (err) {
        res.status(500).send("Erro na api")
    }
}

module.exports = { getAll, getById, getByArtists, getByYear, postMusicas, deleteMusicas, putMusicas, patchMusicasStatus }


const fsWriteFile = (res,data) => { 
    fs.writeFile("./src/models/musicas.json", JSON.stringify(data), 'utf8', function(err) {
    if (err) {
        console.log(err)
        return res.status(424).send({ message: err })
    }
    console.log("Arquivo atualizado com sucesso!")
})
}