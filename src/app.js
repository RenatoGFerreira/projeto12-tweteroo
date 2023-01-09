import express from "express"
import cors from "cors"

const server = express()
const PORT = 5000
const userlist = []
const tweetlist = []

server.use(cors())
server.use(express.json())



server.post("/sign-up", (req, res) => {
    console.log("chamado via post")

    const dados = req.body
    const { username, avatar } = dados

    userlist.push({ username, avatar })
    res.send({ menssage: "OK" })
})

server.post("/tweets", (req, res) => {
    const dados = req.body
    const { username, tweet } = dados
    if (userlist.length === 0) {
        res.send({menssage: "UNAUTHORIZED"})
        return
    }else{   
        tweetlist.push(username, tweet)
        res.send({ menssage: "OK" })
    }
})


server.get("/tweets", (req, res) => {

    tweetlist.forEach((tweet) => {
        const { avatar } = userlist.find(user => user.username === tweet.username)
        tweet.avatar = avatar
    })

    res.send(tweetlist.slice(tweetlist.length - 10).reverse())
})


server.listen(PORT, () => {
    console.log(`Servidor funcionando normalmente na porta ${PORT}`)
})



