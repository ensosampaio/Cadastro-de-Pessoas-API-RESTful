export class PessoaModel {
   private _id: number;
   private _nome: string;
   private _idade: number;
   private _cpf: string;

    constructor(id:number, nome:string, idade:number, cpf:string){
        this._id = id;
        this._nome = nome;
        this._idade = idade;
        this._cpf = cpf;
    }

}