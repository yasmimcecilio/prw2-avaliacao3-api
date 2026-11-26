import express from "express";
import AuthController from "../controllers/authController.js";

const routes = express.Router();

routes.post("/register", AuthController.registrarUsuario);
routes.post("/login", AuthController.loginUsuario);

export default routes;
