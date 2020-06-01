import express from "express";

const port = 3333;
const app = express();

app.get("/users", (request, response) => {
  console.log("Listagem de usuários");

  response.json(["Rafael", "Cristiano", "Robson", "Diego", "daniel"]);
});

app.listen(port);
