import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PessoaService {
  
    // LISTAR
    async listar() {
    return prisma.pessoa.findMany();
  }

    // CRIAR
  async criarPessoa(nome: string, idade: number, cpf: string) {
    return prisma.pessoa.create({
      data: { nome, idade, cpf }
    });
  }

  // DELETAR
  async deletarPessoa(id: number) {
    return prisma.pessoa.delete({
      where: { id }
    });
  }

  // ATUALIZAR
  async atualizarPessoa(id: number, dados: { nome?: string; idade?: number }) {
    return prisma.pessoa.update({
      where: { id },
      data: dados
    });
  }
}