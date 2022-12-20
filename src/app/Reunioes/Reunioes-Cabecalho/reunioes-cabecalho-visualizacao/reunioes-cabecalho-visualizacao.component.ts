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
    this.getItensReuniao();
    this.itemsFiltered = [];
    this.columns = [
      { property: 'recno', label: 'Código', type: 'string', width: '10%'},
      { property: 'nomeCrianca', label: 'Nome criança', type: 'string', width: '60%'},
      //{ property: 'dataEntrada', label: 'Entrada', type: 'string', width: '15%'},
      { property: 'dataEntrada', label: 'Entrada', type: 'subtitle', width: '55%', subtitles: [
        { value: "dataEntrada", color: 'color-11', label: 'Causa incorreta', content: '02' },
        { value: "", color: 'color-10', label: 'Tickets em Espera sem Issue', content: '03' },
        //{ value: '03', color: 'color-11', label: 'Tickets em Espera sem Issue', content: '03' },
      ] },
      //{ property: 'dataEntrada', label: 'Entrada', type: 'string', color: this.changeColor, width: '15%'},
      { property: 'dataSaida', label: 'Saída', type: 'string', color: this.changeColor, width: '15%'}
      

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
          dataEntrada: data.dataEntrada,
          dataSaida: data.dataSaida,
          nomeCrianca: data.nomeCrianca,
        }
      });

    this.itemsFiltered = [...this.items2];
    this.isLoading = false

    });


  }

  Cancel(){
    this.router.navigate(['reunioes']);
  }

}
