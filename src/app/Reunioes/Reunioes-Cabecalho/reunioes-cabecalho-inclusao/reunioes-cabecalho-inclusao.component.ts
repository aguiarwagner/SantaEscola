import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-reunioes-cabecalho-inclusao',
  templateUrl: './reunioes-cabecalho-inclusao.component.html',
  styleUrls: ['./reunioes-cabecalho-inclusao.component.css']
})
export class ReunioesCabecalhoInclusaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean = true;
  dataReuniao = new Date();

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {    
    this.dataReuniao = new Date();
  }

  Grava(){

    if (this.dataReuniao == undefined) {
      this.poNotification.information("Preencha a data da reunião!");
      return      
    }

    this.mapa.DataReuniao = this.dataReuniao.toString();
    this.mapa.dataReuniao = this.dataReuniao.toString();
    this.mapa.observacoes = this.mapa.Observacoes;
    this.mapa.assuntoAbordado = this.mapa.AssuntoAbordado;
    

    this.httpService.postReuniao(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/reunioes"]);
      this.poNotification.success("Registro incluído com sucesso!");
    })
    
    const sleep = (milliseconds: any) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(5000).then(() => {
      if (!this.lOk) {
        this.poNotification.error("Erro na inclusão!");
      }
    });

  }

  Cancel(){
    this.router.navigate(['reunioes']);
  }

}
