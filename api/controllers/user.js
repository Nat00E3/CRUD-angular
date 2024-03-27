import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  // Gerar um UUID único
  const userId = uuidv4();

  const q =
    "INSERT INTO usuarios(`id`, `nome`, `CPF`, `data_nasc`) VALUES(?, ?, ?, ?)";

  const values = [userId, req.body.nome, req.body.CPF, req.body.data_nasc];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Erro ao adicionar usuário:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `CPF` = ?, `data_nasc` = ? WHERE `id` = ?";

  const values = [req.body.nome, req.body.CPF, req.body.data_nasc];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
