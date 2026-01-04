import express from "express";
import cors from "cors";
import pessoasRoutes from "./routes/pessoasRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/pessoas", pessoasRoutes);

app.get("/", (req, res) => {
  res.send("API de Pessoas está funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});