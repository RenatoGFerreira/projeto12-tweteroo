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
    const user = req.headers
    const { username, tweet } = dados

    if (user.length === 0) {
        res.send({ menssage: "UNAUTHORIZED" })
        return
    } else {
        tweetlist.push(username, tweet)
        res.send({ menssage: "OK" })
        console.log(tweetlist)
    }
})

server.get("/tweets", (req, res) => {
    const ultimostweets = []

    for (let i = 0; i < 10; i++) {
        if (!tweetlist[i]) return
        const username = tweetlist[i].username
        const tweet = tweetlist[i].tweet
        const userInfo = userlist.find(e => e.username === tweetlist[i].username)
        const avatar = userInfo.avatar

        ultimostweets.push({ username: username, avatar: avatar, tweet: tweet })
    }

    res.send(ultimostweets.reverse());
})


server.get("/tweets/:username", (req, res) => {

    const { username } = req.params

    const onlymytweets = tweetlist.filter((tweet) => tweet.username === username)

    res.send(onlymytweets)
})

server.listen(PORT, () => {
    console.log(`Servidor funcionando normalmente na porta ${PORT}`)
})



