import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { type Request, type Response } from "express";

const prisma = new PrismaClient();

export default {
  // Método para LISTAR
  async listar(_req: Request, res: Response) {
    try {
      const pessoas = await prisma.pessoa.findMany();
      return res.json(pessoas);
    } catch (error) {
      console.error("Erro ao listar pessoas:", error);
      return res.status(500).json({ error: "Erro ao listar pessoas." });
    }
  },

    // Método para CRIAR
  async criarPessoa(req: Request, res: Response) {
    const { nome, idade, cpf } = req.body;
    if (!nome || !idade || !cpf) {
      return res
        .status(400)
        .json({ error: "Nome, idade e CPF são obrigatórios." });
    }
    try {
      const novaPessoa = await prisma.pessoa.create({
        data: {
          nome,
          idade: Number(idade),
          cpf,
        },
      });
      return res.status(201).json(novaPessoa);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(409).json({ error: "CPF já cadastrado." });
        }
      }

      console.error("Erro desconhecido ao criar pessoa:", error);
      return res.status(500).json({ error: "Erro ao criar pessoa." });
    }
  },

// Método para DELETAR
async deletarPessoa(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const pessoaDeletada = await prisma.pessoa.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      mensagem: "Pessoa deletada com sucesso.",
      pessoa: pessoaDeletada
    });

  } catch (error: any) {

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pessoa não encontrada." });
    }

    console.error("Erro ao deletar pessoa:", error);
    return res.status(500).json({ error: "Erro ao deletar pessoa." });
  }
},

// Metodo para ATUALIZAR
async atualizarPessoa(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, idade, cpf } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (!nome && !idade) {
    return res.status(400).json({ error: "Envie ao menos 1 campo para atualizar." });
  }
  try {
    const pessoaAtualizada = await prisma.pessoa.update({
      where: { id: Number(id) },
      data: {
        nome: nome ?? undefined,
        idade: idade ? Number(idade) : undefined,
      }
    });
    return res.status(200).json({
      mensagem: "Pessoa atualizada com sucesso.",
      pessoa: pessoaAtualizada
    });
  } catch (error: any) {

    // Registro não encontrado
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Pessoa não encontrada." });
    }
    console.error("Erro ao atualizar pessoa:", error);
    return res.status(500).json({ error: "Erro ao atualizar pessoa." });
  }
}
};