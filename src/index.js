import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const userList = [
  {
    username: "Renato",
    avatar: "https://avatars.githubusercontent.com/u/73254662?v=4"
  },
  {
    username: 'bobesponja', 
    avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
  }
]

const tweetList = [
  {
    "username": "Renato",
    "tweet": "This is a tweet test.",
  },
  {
    "username": "Renato",
    "tweet": "Impossible its just a opinion",
  },
  {
    "username": "bobesponja",
    "tweet": "HEHEHEHEEHEEHEHEHE.",
  },
  {
    "username": "Renato",
    "tweet": "Old movies are better than new movies, change my mind",
  }, 
  {
    "username": "Renato",
    "tweet": "How can I speak that?",
  },
  {
    "username": "bobesponja",
    "tweet": "Living in a pineapple its a sweet home.",
  }
];

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
    res.status(400).send({message: "UNAUTHORIZED"})
  }

  if (!user || !tweet) {
    res.status(400).send({ message: "UNAUTHORIZED" });
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
