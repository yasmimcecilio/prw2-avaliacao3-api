import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [];

class AuthController {
  static async registrarUsuario(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username e password são obrigatórios." });
      }

      const usuarioExistente = users.find((user) => user.username === username);
      if (usuarioExistente) {
        return res.status(400).json({ message: "Usuário já cadastrado!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ username, password: hashedPassword });
      console.log(users);

      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao registrar usuário.` });
    }
  }

  static async loginUsuario(req, res) {
    try {
      const { username, password } = req.body;

      const user = users.find((user) => user.username === username);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Login Incorreto!" });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h", algorithm: "HS256" },
      );

      console.log("Login efetuado pelo usuário " + user.username);
      res.status(200).json({ token: token });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha no login.` });
    }
  }
}

export default AuthController;
