import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const userList = [];
const tweetList = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (typeof username !== "string") {
    res
      .status(400)
      .send({ error: "Username não pode ser diferente de string." });
    return;
  }
  if (typeof avatar !== "string") {
    res.status(400).send({ error: "Avatar não pode ser diferente de string." });
    return;
  }

  if (!username || !avatar) {
    res.status(400).send({ error: "Preencha todos os campos do formulário." });
    return;
  }

  const isUserExists = userList.find((user) => user.username === username);
  if (isUserExists) {
    res.status(409).send({ error: "Usuário já existe" });
    return;
  }

  userList.push({ username, avatar });

  res.status(201).send({ message: "OK" });
  console.log(userList);
});

app.post("/tweets", (req, res) => {
  const { user } = req.headers;
  const { tweet } = req.body;

  if(userList.length === 0){
    res.status(401).send({message: "UNAUTHORIZED"})
  }

  if (!user || !tweet) {
    res.status(401).send({ message: "UNAUTHORIZED" });
    return;
  }

  if (typeof tweet !== "string") {
    res.status(400).send("Tweet não pode ser diferente de string.");
    return;
  }

  tweetList.push({ username: user, tweet: tweet });

  res.status(201).send({ message: "ok" });
  console.log(tweetList);
});

app.get("/tweets", (req, res) => {
  tweetList.forEach((tweet) => {
    const { avatar } = userList.find(
      (user) => user.username === tweet.username
    );
    tweet.avatar = avatar;
  });

  res.send(tweetList.slice(-10).reverse());
});

app.get("/tweets/:USERNAME", (req, res) => {
  const { USERNAME } = req.params;
  console.log(req.params)
  const tweetsUser = tweetList.filter((tweet) => tweet.username === USERNAME);

  res.status(200).send(tweetsUser.reverse());
});




app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}.`);
});
