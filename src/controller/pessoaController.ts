import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { PessoaService } from "../services/pessoaService.js";

const service = new PessoaService();

export default {
  // LISTAR
  async listar(_req: Request, res: Response) {
    try {
      const pessoas = await service.listar();
      return res.json(pessoas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar pessoas." });
    }
  },

  // CRIAR
  async criarPessoa(req: Request, res: Response) {
    const { nome, idade, cpf } = req.body;

    if (!nome || !idade || !cpf) {
      return res.status(400).json({ error: "Nome, idade e CPF são obrigatórios." });
    }

    try {
      const novaPessoa = await service.criarPessoa(nome, Number(idade), cpf);
      return res.status(201).json(novaPessoa);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        return res.status(409).json({ error: "CPF já cadastrado." });
      }
      return res.status(500).json({ error: "Erro ao criar pessoa." });
    }
  },

  // DELETAR
  async deletarPessoa(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido." });
    }

    try {
      const pessoa = await service.deletarPessoa(Number(id));
      return res.status(200).json({
        mensagem: "Pessoa deletada com sucesso.",
        pessoa
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Pessoa não encontrada." });
      }
      return res.status(500).json({ error: "Erro ao deletar pessoa." });
    }
  },

  // ATUALIZAR
  async atualizarPessoa(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, idade } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido." });
    }

    if (!nome && !idade) {
      return res.status(400).json({ error: "Envie ao menos 1 campo para atualizar." });
    }

    try {
      const pessoaAtualizada = await service.atualizarPessoa(Number(id), {
        nome: nome ?? undefined,
        idade: idade ? Number(idade) : undefined,
      });

      return res.status(200).json({
        mensagem: "Pessoa atualizada com sucesso.",
        pessoa: pessoaAtualizada,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Pessoa não encontrada." });
      }
      return res.status(500).json({ error: "Erro ao atualizar pessoa." });
    }
  }
};