import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Mapa {
  username: string = "";
  password: string = "";
  NomeCrianca: string = "";
  DataNascimento: string = "";
  Endereco: string = "";
  Bairro: string = "";
  CEP: string = "";
  TelCrianca: string = "";
  NomePai: string = "";
  TelPai: string = "";
  NomeMae: string = "";
  TelMae: string = "";
  Email: string = "";
  RestricoesAlimentares: string = "";
  IndicacoesMedicas: string = "";
  Observacoes: string = "";
  nomeCrianca: string = "";
  dataNascimento: string = "";
  endereco: string = "";
  bairro: string = "";
  cep: string = "";
  telCrianca: string = "";
  nomePai: string = "";
  telPai: string = "";
  nomeMae: string = "";
  telMae: string = "";
  email: string = "";
  restricoesAlimentares: string = "";
  indicacoesMedicas: string = "";
  observacoes: string = "";
  DataReuniao: string = "";
  dataReuniao: string = "";
  AssuntoAbordado: string = "";
  assuntoAbordado: string = "";
  recno: number;
  Recno: number;
  RecnoCrianca: number;
  RecnoCabecalhoReuniao: number;
  DataEntrada: any;
  DataSaida: any;
  comunCongregacao: any;
  nomeVoluntario: string = "";
  telefone: string = "";
  funcao: string = "";
  tipo: any;
  igreja: string;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

