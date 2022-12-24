import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-reunioes-cabecalho-alteracao',
  templateUrl: './reunioes-cabecalho-alteracao.component.html',
  styleUrls: ['./reunioes-cabecalho-alteracao.component.css']
})
export class ReunioesCabecalhoAlteracaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean = true;
  dataReuniao = new Date();
  columns: Array<PoTableColumn> = [];
  loadButton = false;
  labelButton = "Cadastrar nova reunião";
  isLoading: boolean = false;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  items: Array<any>;
  items2: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];
  itens2: any = [];
  idReuniao: any = "";

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getReunioesId();
  }

  getReunioesId(){
    this.idReuniao =  this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.getReunioesId(parseInt(this.idReuniao)).subscribe((mapa: Mapa) => {
      this.mapa = mapa;
    });    

  }

  Grava(){

    this.mapa.DataReuniao = this.mapa.dataReuniao.toString();
    //this.mapa.observacoes = this.mapa.Observacoes;
    //this.mapa.assuntoAbordado = this.mapa.AssuntoAbordado;
    debugger
    this.httpService.putReuniao(this.idReuniao, this.mapa).subscribe(() => {
      this.lOk = true;
      this.router.navigate(["/reunioes"]);
      this.poNotification.success("Registro alterado com sucesso!");
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
    this.router.navigate(['reunioes']);
  }

}
