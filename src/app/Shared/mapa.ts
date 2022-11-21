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


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

