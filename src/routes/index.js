import express from "express";
import rotasAuth from "./authRoutes.js";
import rotasAlunos from "./alunosRoutes.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).json({ message: "API de Alunos - Avaliação 3 PRW2" });
  });

  app.use(express.json());
  app.use(rotasAuth);
  app.use(authenticateJWT);
  app.use(rotasAlunos);
};

export default routes;
