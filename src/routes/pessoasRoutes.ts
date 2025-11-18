import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Rota de pessoas funcionando!");
});

export default router;