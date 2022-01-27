const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

const url =
  "mongodb+srv://db_noteapp:jdEktTpmGLRmVm1K@cluster0.pxorf.mongodb.net/db_noteapp?retryWrites=true&w=majority";

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app, path: "/api" });

  app.use((req, res) => {
    res.send("Hello this is express apollo server");
  });

  mongoose
    .connect(url)
    .then((result) => {
      console.log("Mongoose Connected. . . ");
      app.listen(4000, () => console.log("Server is running on port 4000"));
    })
    .catch((err) => console.log("err", err));

  //   app.listen(4000, () => console.log("Server is running on port 4000"));
}

startServer();
