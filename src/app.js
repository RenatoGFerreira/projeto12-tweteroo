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

    tweetlist.push(username, tweet)
    res.send({ menssage: "OK" })

})


server.get("/tweets", (req, res) => {

    tweetlist.forEach((tweet) => {
        const avatar = userlist.find((u) => u.username === tweet.username)
        console.log(avatar)
        tweet.avatar = avatar
    })

    res.send(tweetlist)
})


server.listen(PORT, () => {
    console.log(`Servidor funcionando normalmente na porta ${PORT}`)
})
