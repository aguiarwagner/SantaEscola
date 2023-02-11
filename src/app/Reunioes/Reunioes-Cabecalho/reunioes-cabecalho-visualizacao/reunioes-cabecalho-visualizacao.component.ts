import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-reunioes-cabecalho-visualizacao',
  templateUrl: './reunioes-cabecalho-visualizacao.component.html',
  styleUrls: ['./reunioes-cabecalho-visualizacao.component.css']
})
export class ReunioesCabecalhoVisualizacaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean = true;
  dataReuniao = new Date();
  columns: Array<PoTableColumn> = [];
  columns3: Array<PoTableColumn> = [];
  loadButton = false;
  labelButton = "Cadastrar nova reunião";
  isLoading: boolean = false;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  itemsFiltered3: Array<any>;
  items: Array<any>;
  items2: Array<any>;
  items3: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];
  itens2: any = [];
  itens3: any = [];
  idReuniao: any = "";

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getReunioesId();
    this.getItensReuniao();
    this.getItensVoluntarios();
    this.itemsFiltered = [];
    this.itemsFiltered3 = [];
    this.columns = [
      { property: 'recno', label: 'Código', type: 'string', width: '10%'},
      { property: 'nomeCrianca', label: 'Nome criança', type: 'string', width: '60%'},
      { property: 'dataEntrada', label: 'Entrada', type: 'string', width: '15%' },
      { property: 'dataSaida', label: 'Saída', type: 'string', width: '15%'}
    ];

    this.columns3 = [
      { property: 'recno', label: 'Código', type: 'string'},
      { property: 'nomeVoluntario', label: 'Nome do Voluntário', type: 'string'},
      { property: 'dataEntrada', label: 'Entrada', type: 'string' },
      { property: 'dataSaida', label: 'Saída', type: 'string'}
    ];

  }

  private changeColor(row: any, column: any) {
    const valor = Number(row[column]); // Valor do indicador

    switch (true) {
      case column == 'dataEntrada':
        return valor ==  undefined == true ? 'color-07' : 'color-10';
      case column == 'dataSaida':
        return valor ==  undefined == true ? 'color-07' : 'color-10';

    }
  }

  getReunioesId(){
    this.idReuniao =  this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.getReunioesId(parseInt(this.idReuniao)).subscribe((mapa: Mapa) => {
      this.mapa = mapa;
    });

  }

  getItensReuniao(){
    this.idReuniao =  this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.getEntradaSaida(2, parseInt(this.idReuniao), 0, ).subscribe(dados => {
      this.itens2 = [];
      this.itens2 = dados
      debugger
      this.items2 = this.itens2
     .map( (data: {   recno: any, dataEntrada: any, nomeCrianca: any, dataSaida: any}) => {
        return {
          recno: data.recno,
          nomeCrianca: data.nomeCrianca,
          dataSaida: data.dataSaida,
          dataEntrada: data.dataEntrada,
        }
      });

      for (let index = 0; index < this.items2.length; index++) {
        if(this.items2[index].dataSaida != undefined){
          this.items2[index].dataSaida = this.items2[index].dataSaida.substring(8, 10) + "/" + this.items2[index].dataSaida.substring(5, 7) + "/" + this.items2[index].dataSaida.substring(0, 4) + " " + this.items2[index].dataSaida.substring(11, 20);
        }
        if(this.items2[index].dataEntrada != undefined){
          this.items2[index].dataEntrada = this.items2[index].dataEntrada.substring(8, 10) + "/" + this.items2[index].dataEntrada.substring(5, 7) + "/" + this.items2[index].dataEntrada.substring(0, 4) + " " + this.items2[index].dataEntrada.substring(11, 20);
        }
      }

    this.itemsFiltered = [...this.items2];
    this.isLoading = false

    });


  }

  getItensVoluntarios(){
    this.idReuniao =  this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.getEntradaSaida(3, parseInt(this.idReuniao), 0, ).subscribe(dados => {
      this.itens3 = [];
      this.itens3 = dados
      debugger
      this.items3 = this.itens3
     .map( (data: {   recno: any, dataEntrada: any, nomeVoluntario: any, dataSaida: any}) => {
        return {
          recno: data.recno,
          nomeVoluntario: data.nomeVoluntario,
          dataSaida: data.dataSaida,
          dataEntrada: data.dataEntrada,
        }
      });

      for (let index = 0; index < this.items2.length; index++) {
        if(this.items3[index].dataSaida != undefined){
          this.items3[index].dataSaida = this.items3[index].dataSaida.substring(8, 10) + "/" + this.items3[index].dataSaida.substring(5, 7) + "/" + this.items3[index].dataSaida.substring(0, 4) + " " + this.items3[index].dataSaida.substring(11, 20);
        }
        if(this.items3[index].dataEntrada != undefined){
          this.items2[index].dataEntrada = this.items3[index].dataEntrada.substring(8, 10) + "/" + this.items3[index].dataEntrada.substring(5, 7) + "/" + this.items3[index].dataEntrada.substring(0, 4) + " " + this.items3[index].dataEntrada.substring(11, 20);
        }
      }

    this.itemsFiltered3 = [...this.items3];
    this.isLoading = false

    });


  }

  Cancel(){
    this.router.navigate(['reunioes']);
  }

}
