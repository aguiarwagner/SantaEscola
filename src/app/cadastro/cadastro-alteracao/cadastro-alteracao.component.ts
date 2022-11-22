import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-cadastro-alteracao',
  templateUrl: './cadastro-alteracao.component.html',
  styleUrls: ['./cadastro-alteracao.component.css']
})
export class CadastroAlteracaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  items: Array<any>;
  itens: any = [];
  id: any = "";
  lOk: boolean = true;

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.GetCriancas();
  }

  GetCriancas(){
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    debugger
    this.httpService.getCriancasId(parseInt(this.id)).subscribe((mapa: Mapa) => {
      this.mapa = mapa;
    });
  }

  Grava(){
    if (this.mapa.nomeCrianca == undefined || this.mapa.nomeCrianca == "") {
      this.poNotification.success("Preencha o nome da criança!");
      return;
    }
    if (this.mapa.dataNascimento == undefined) {
      this.poNotification.success("Preencha a data de nascimento!");
      return;
    }

    this.mapa.NomeCrianca = this.mapa.nomeCrianca
    this.mapa.DataNascimento = this.mapa.dataNascimento;
    this.mapa.Endereco = this.mapa.endereco;
    this.mapa.Bairro = this.mapa.bairro;
    this.mapa.CEP = this.mapa.cep;
    this.mapa.TelCrianca = this.mapa.telCrianca;
    this.mapa.NomePai = this.mapa.nomePai;
    this.mapa.TelPai = this.mapa.telPai;
    this.mapa.NomeMae = this.mapa.nomeMae;
    this.mapa.TelMae = this.mapa.telMae;
    this.mapa.Email = this.mapa.email;
    this.mapa.RestricoesAlimentares = this.mapa.restricoesAlimentares;
    this.mapa.IndicacoesMedicas = this.mapa.indicacoesMedicas;
    this.mapa.Observacoes = this.mapa.observacoes;
    this.mapa.Recno = this.mapa.recno;

    this.httpService.putCriancas(this.mapa.Recno, this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/cadastro"]);
      this.poNotification.success("Registro incluído com sucesso!");
    })
    const sleep = (milliseconds: any) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(5000).then(() => {
      if (!this.lOk) {
        this.poNotification.error("Erro na alteração!");
      }
    });



  }

  Cancel(){
    this.router.navigate(['cadastro']);
  }

}
