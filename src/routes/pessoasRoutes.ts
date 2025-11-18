import { Router } from "express";
import pessoaController from "../controller/pessoaController.js";

const router = Router();

router.get("/pessoas", pessoaController.listar);
router.post("/pessoas", pessoaController.criarPessoa);
router.delete("/pessoas/:id", pessoaController.deletarPessoa);
router.put("/pessoas/:id", pessoaController.atualizarPessoa);

export default router;