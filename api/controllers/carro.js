import { db } from "../db.js";

export const getCarros = (_, res) => {
  const q =
    "SELECT carros.*, usuarios.nome AS nome_usuario FROM carros LEFT JOIN usuarios ON carros.usuario_id = usuarios.id";

  db.query(q, (err, data) => {
    console.log(res, data);
    if (err) return res.json(err);
    console.log(res, data);
    return res.status(200).json(data);
  });
};

export const addCarro = (req, res) => {
  const { marca, modelo, cor, usuario_id } = req.body;

  if (!marca || !modelo || !cor || !usuario_id) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const insertCarQuery =
    "INSERT INTO carros(`marca`, `modelo`, `cor`, `usuario_id`) VALUES (?, ?, ?, ?)";

  const values = [marca, modelo, cor, usuario_id];

  db.query(insertCarQuery, values, (err) => {
    if (err) {
      console.error("Erro ao adicionar veículo:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json("Veículo cadastrado com sucesso.");
  });
};

export const updateCarro = (req, res) => {
  const { marca, modelo, cor, usuario_id } = req.body;

  if (!marca || !modelo || !cor || !usuario_id) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const q =
    "UPDATE carros SET `marca` = ?, `modelo` = ?, `cor` = ?, `usuario_id` = ? WHERE `id` = ?";

  const values = [marca, modelo, cor, usuario_id, req.params.id];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Veículo atualizado com sucesso.");
  });
};

export const deleteCarro = (req, res) => {
  const carroId = req.params.id;

  if (!carroId) {
    return res.status(400).json({ error: "O ID do veículo é obrigatório" });
  }

  const deleteCarQuery = "DELETE FROM carros WHERE id = ?";

  db.query(deleteCarQuery, [carroId], (err, result) => {
    if (err) {
      console.error("Erro ao excluir veículo:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    return res.status(200).json("Veículo deletado com sucesso.");
  });
};
