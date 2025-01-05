const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverhide = require("method-override");
// const TelegramBot = require('node-telegram-bot-api');
// const {Configuration, OpenAIApi} = require("openai");

// const TOKEN = '6872487939:AAFOV48N-z1TzDXLJTbQR67dl8xkz4B2twg';
// const OPENAI = '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';

// Lines For Render index.ejs in browser.
app.use(express.urlencoded({extended: true}));
app.use(methodoverhide("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// For Exicute style.css in index.ejs

let posts = [
  {
    id: uuidv4(),
    caption: "At Sophos Lab",
    content: "I Visited A High-Tech Security Lab.",
    img: "https://5.imimg.com/data5/SELLER/Default/2023/4/300944289/VL/CE/AK/185666206/sophos-endpoint-protection.png"
  },
  {
    id: uuidv4(),
    caption: "Kelara Tour",
    content: "Summer Vacation in Kerala.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNH6NXKYsgsAEVEjXj-_NlOgcDQXV26onfBeqe2TjQbw&s"
  },
  {
    id: uuidv4(),
    caption: "Docker",
    content: "Hello, I am docker fish.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1VrymvWgkfMMHx3kOXpwcg9qB9Z2TcRGrxA&s"
  } 
];

app.get("/insta", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/insta/addpost", (req, res) => {
  res.render("newpost.ejs");
});

app.post("/insta", (req, res) => {
  let {caption, content, img} = req.body;
  let id = uuidv4();
  posts.push({id, caption, content, img});
  res.redirect("/insta");
});

app.get("/insta/:id/detail", (req, res) => {
  let {id} = req.params;
  let post = posts.find((bio) => id === bio.id);
  console.log(post);
  res.render("detail.ejs", {post});
});

app.delete("/insta/:id", (req, res) => { 
  let {id} = req.params;
  posts = posts.filter((bio) => id !== bio.id);
  res.redirect("/insta");
});

// const openai = new OpenAIApi(new Configuration({
//   apikey: OPENAI,
// }));

// const bot = new TelegramBot(TOKEN, {polling: true});

// bot.on('message',async (msg) => {
//   const chatId = msg.chat.id;
//   const reply = await OpenAIApi.createCompletion({
//     max_token: 20,
//     model: "ada",
//     prompt: msg.text
//   });
//   bot.sendMessage(chatId, reply.data.choices[0].text);
// });

app.listen(PORT, () => {
    console.log(`Server in live on http:/localhost:${PORT}/insta`);
});