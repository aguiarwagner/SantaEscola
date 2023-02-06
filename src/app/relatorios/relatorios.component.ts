import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoChartOptions, PoChartSerie, PoChartType, PoDisclaimer, PoDisclaimerGroup, PoModalComponent, PoNotificationService, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from '../http.service';
import { Mapa } from '../Shared/mapa';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  mapa: Mapa = new Mapa();
  columns: Array<PoTableColumn> = [];
  columns2: Array<PoTableColumn> = [];
  loadButton = false;
  labelButton = "Buscar";
  isLoading: boolean = false;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  items: Array<any>;
  items2: Array<any>;
  items4: Array<any>;
  items3: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];
  itens2: any = [];
  itens4: any = [];
  dataIni = new Date();
  dataFim = new Date();
  now: Date;
  dataReuniao = new Date();
  extraInformation: any;
  title: any;
  consumptionPerCapitaType: PoChartType = PoChartType.Bar;
  itemsCriancas: Array<string> = [];
  items6Meses: Array<PoChartSerie> = []

  @ViewChild('detailsModal', {static: true}) poModal: PoModalComponent;

  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.dataReuniao = new Date();
    this.columns = [
      { property: 'nomeCrianca', label: 'Nome da Criança', type: 'string'},
      { property: 'nomePai', label: 'Nome do Pai / Responsável', type: 'string'},
      { property: 'nomeMae', label: 'Nome da Mãe', type: 'string'},
      { property: 'comunCongregacao', label: 'Comun Congregação', type: 'string'},
      //{ property: 'presenca', label: 'Presença no Período', type: 'number'},
      { property: 'presenca', label: 'Presença no Período', type: 'link', tooltip: 'Clique para ver os detalhes', action: (value: any, row: any) => {
        this.extras(value, row);
      },},

    ];

    this.columns2 = [
      { property: 'nomeCrianca', label: 'Nome da Criança', type: 'string'},
      { property: 'nomePai', label: 'Nome do Pai / Responsável', type: 'string'},
      { property: 'nomeMae', label: 'Nome da Mãe', type: 'string'},
      { property: 'comunCongregacao', label: 'Comun Congregação', type: 'string'},
      { property: 'dataReuniao', label: 'Data da Reunião', type: 'date', format: 'dd/MM/yyyy HH:mm'},
      { property: 'dataEntrada', label: 'Entrada', type: 'date', format: 'dd/MM/yyyy HH:mm'},
      { property: 'dataSaida', label: 'Saída', type: 'date', format: 'dd/MM/yyyy HH:mm'}

    ];
    this.itemsFiltered = [];

    this.now = new Date();
    var diaIni = 1
    var diaFim = this.now.getDate(); // Dia Atual
    var mes = this.now.getMonth();
    var ano = this.now.getFullYear();

    this.dataIni = new Date(ano,mes,diaIni);
    this.dataFim = new Date(ano,mes,diaFim,23,59,0,0);
    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

  }

  Buscar(){

    if (this.dataIni == undefined && this.dataIni == ""){
      this.poNotification.information("Preencha a data Inicial!");
      return
    }
    if (this.dataFim == undefined && this.dataFim == ""){
      this.poNotification.information("Preencha a data Final!");
      return
    }
    this.isLoading = true;

    this.httpService.getRelatorios(1, this.dataIni.toString(), this.dataFim.toString()).subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
     .map( (data: { dataReuniao: any; nomeCrianca: any; dataEntrada: any;recno: any, dataSaida: any, nomePai: any, nomeMae: any, comunCongregacao: any}) => {
        return {

          dataReuniao: data.dataReuniao,//.substring(8, 10) + "/" + data.dataReuniao.substring(5, 7) + "/" + data.dataReuniao.substring(0, 4),
          //dataEntrada: data.dataEntrada.substring(8, 10) + "/" + data.dataEntrada.substring(5, 7) + "/" + data.dataEntrada.substring(0, 4),
          dataEntrada: data.dataEntrada,//.substring(8, 10) + "/" + data.dataEntrada.substring(5, 7) + "/" + data.dataEntrada.substring(0, 4),
          //dataSaida: data.dataSaida.substring(8, 10) + "/" + data.dataSaida.substring(5, 7) + "/" + data.dataSaida.substring(0, 4),
          dataSaida: data.dataSaida,//.substring(8, 10) + "/" + data.dataSaida.substring(5, 7) + "/" + data.dataSaida.substring(0, 4),
          nomeCrianca: data.nomeCrianca, //.substring(8, 10) + "/" + data.assuntoAbordado.substring(5, 7) + "/" + data.assuntoAbordado.substring(0, 4),
          nomePai: data.nomePai,
          Recno: data.recno,
          nomeMae: data.nomeMae,
          comunCongregacao: data.comunCongregacao,
        }
      });
      if(this.items.length == 0){
        this.isLoading = false
        this.poNotification.information("Sem dados para o periodo selecionado!");
        return
      }
      this.items.sort(function (a, b) {
        if (a.nomeCrianca < b.nomeCrianca) {
         return -1;
        }
        if (a.nomeCrianca > b.nomeCrianca) {
         return 1;
        }
        return 0;
      });

      //this.itemsFiltered = [...this.items];
      let nomeCrianca = this.items[0].nomeCrianca;
      let quantPresenca = 0;
      this.items2 = [];
      for (let index = 0; index < this.items.length; index++) {

        if (this.items[index].nomeCrianca != nomeCrianca){
          this.items2.push({
            nomeCrianca:      this.items[index -1 ].nomeCrianca,
            nomePai:          this.items[index - 1].nomePai,
            nomeMae:          this.items[index - 1].nomeMae,
            comunCongregacao: this.items[index - 1].comunCongregacao,
            presenca:         quantPresenca,
          })
          nomeCrianca = this.items[index].nomeCrianca;

          quantPresenca = 0;
        }
        quantPresenca++;

        if ((this.items.length - 1) == index){
          this.items2.push({
            nomeCrianca:      this.items[index].nomeCrianca,
            nomePai:          this.items[index].nomePai,
            nomeMae:          this.items[index].nomeMae,
            comunCongregacao: this.items[index].comunCongregacao,
            presenca:         quantPresenca,
          })
        }


      }
      this.itemsFiltered = [...this.items2];
      this.isLoading = false
    });

    this.getEntradaSaida6Meses();
  }

  //Filtro
  public readonly filterSettings: PoPageFilter = {
    action: this.filterAction.bind(this),
    placeholder: 'Search'
  };

  filterAction(labelFilter: string | Array<string>) {
    const filter = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];
    this.populateDisclaimers(filter);
    this.filter();
  }

  private filter() {
    const filters = this.disclaimers.map(disclaimer => disclaimer.value);
    if (filters.length > 0) {
      this.applyFilters(filters);
      this.lControlFilter = true;
    } else {
      this.resetFilters()
    }
  }

  private resetFilters() {
    if (this.lControlFilter){
      this.itemsFiltered = [...this.items2];
    }
  }

  private applyFilters(filters: any) {
    this.itemsFiltered = this.items2.filter(item => {
      return Object.keys(item)
        .some(key => (!(item[key] instanceof Object) && this.includeFilter(item[key], filters)));
    });
  }

  private includeFilter(item: any, filters: any) {
    return filters.some((filter: string) => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private onChangeDisclaimer(disclaimers: PoDisclaimer[]) {
    this.disclaimers = disclaimers;
    this.filter();
  }

  private populateDisclaimers(filters: any) {
    this.disclaimers = filters.map((value: any) => ({ value }));

    if (this.disclaimers && this.disclaimers.length > 0) {
      this.disclaimerGroup.disclaimers = [...this.disclaimers];
    } else {
      this.disclaimerGroup.disclaimers = [];
    }
  }

  extras(value: any, row: any) {
    this.title = "Detalhes das Reuniões";
    this.items3 = [];
    //this.extraInformation = row;
    for (let index = 0; index < this.items.length; index++) {

      if (this.items[index].nomeCrianca == row.nomeCrianca){
        this.items3.push({
          nomeCrianca:      this.items[index].nomeCrianca,
          nomePai:          this.items[index].nomePai,
          nomeMae:          this.items[index].NomeMae,
          comunCongregacao: this.items[index].comunCongregacao,
          dataReuniao:      this.items[index].dataReuniao,
          dataEntrada:      this.items[index].dataEntrada,
          dataSaida:        this.items[index].dataSaida,
        })
      }

    }

    this.poModal.open();
  }

  async getEntradaSaida6Meses(){
    this.httpService.getRelatorios(2, this.dataIni.toString(), this.dataFim.toString()).subscribe(async dados => {
      this.itens4 = [];
      this.itens4 = dados
      this.items4 = this.itens4
     .map( (data: { recnoCrianca: any; nomeCrianca: any; nomePai: any, nomeMae: any, comunCongregacao: any, m1: any, m2: any, m3: any, m4: any, m5: any, m6: any, m99: any, }) => {
        return {


          recnoCrianca: data.recnoCrianca,//.substring(8, 10) + "/" + data.dataSaida.substring(5, 7) + "/" + data.dataSaida.substring(0, 4),
          nomeCrianca: data.nomeCrianca, //.substring(8, 10) + "/" + data.assuntoAbordado.substring(5, 7) + "/" + data.assuntoAbordado.substring(0, 4),
          nomePai: data.nomePai,
          nomeMae: data.nomeMae,
          comunCongregacao: data.comunCongregacao,
          M1: data.m1,
          M2: data.m2,
          M3: data.m3,
          M4: data.m4,
          M5: data.m5,
          M6: data.m6,
          M99: data.m99,
        }
      });

      this.items4.sort(function (a, b) {
        if (a.nomeCrianca < b.nomeCrianca) {
         return -1;
        }
        if (a.nomeCrianca > b.nomeCrianca) {
         return 1;
        }
        return 0;
      });

      let aMes0 = [];
      let aMes1 = [];
      let aMes2 = [];
      let aMes3 = [];
      let aMes4 = [];
      let aMes5 = [];

      for (let index = 0; index < this.items4.length; index++) {
        this.itemsCriancas.push(this.items4[index].nomeCrianca);
        aMes0.push(this.items4[index].M99)
        aMes1.push(this.items4[index].M1)
        aMes2.push(this.items4[index].M2)
        aMes3.push(this.items4[index].M3)
        aMes4.push(this.items4[index].M4)
        aMes5.push(this.items4[index].M5)

      }
      //let max = Math.max(10, 20)
      //this.itemsCriancas = this.items2;
      let mesesPeriodo = await this.CarregaMeses();

      this.items6Meses = [
        { label: mesesPeriodo[5], data: aMes5, color: 'color-12' },
        { label: mesesPeriodo[4], data: aMes4, color: 'color-11' },
        { label: mesesPeriodo[3], data: aMes3, color: 'color-10' },
        { label: mesesPeriodo[2], data: aMes2, color: 'color-04' },
        { label: mesesPeriodo[1], data: aMes1, color: 'color-02' },
        { label: mesesPeriodo[0], data: aMes0, color: 'color-01' },
      ]

    });
  }

  OptionsFequencia: PoChartOptions = {
    legend: true,
    axis: {
      maxRange: 15,
      gridLines: 7
    }
  };

async CarregaMeses(){
    // Formata a data para exibicao do periodo selecionado
    //var teste = 99;
    var mes_formatado = [];

    var now = new Date(this.dataFim + "T23:59:59")
    var mes_atual = now.getMonth();

    switch  (mes_atual) {
      case 0:
       await  mes_formatado.push('Janeiro', 'Dezembro', 'Novembro', 'Outubro',  'Setembro', 'Agosto','Julho');
        break;
      case 1:
        await mes_formatado.push('Fevereiro', 'Janeiro',  'Dezembro',  'Novembro',  'Outubro',  'Setembro',  'Agosto');
        break;
      case 2:
        await mes_formatado.push('Março', 'Fevereiro', 'Janeiro', 'Dezembro', 'Novembro', 'Outubro', 'Setembro');
        break;
      case 3:
        await mes_formatado.push('Abril', 'Março', 'Fevereiro', 'Janeiro', 'Dezembro', 'Novembro', 'Outubro');
        break;
      case 4:
        await mes_formatado.push('Maio', 'Abril', 'Março', 'Fevereiro', 'Janeiro', 'Dezembro', 'Novembro');
        break;
      case 5:
        await mes_formatado.push('Junho', 'Maio', 'Abril', 'Março', 'Fevereiro', 'Janeiro', 'Dezembro');
        break;
      case 6:
        await mes_formatado.push('Julho', 'Junho', 'Maio', 'Abril', 'Março', 'Fevereiro', 'Janeiro');
        break;
      case 7:
        await mes_formatado.push('Agosto', 'Julho', 'Junho', 'Maio', 'Abril', 'Março', 'Fevereiro');
        break;
      case 8:
        await mes_formatado.push('Setembro', 'Agosto', 'Julho', 'Junho', 'Maio', 'Abril', 'Março');
        break;
      case 9:
        await mes_formatado.push('Outubro', 'Setembro', 'Agosto', 'Julho', 'Junho', 'Maio', 'Abril');
        break;
      case 10:
        await mes_formatado.push('Novembro', 'Outubro', 'Setembro', 'Agosto', 'Julho', 'Junho', 'Maio');
        break;
      case 11:
        await mes_formatado.push('Dezembro', 'Novembro', 'Outubro', 'Setembro', 'Agosto', 'Julho', 'Junho');
        break;
    }

    return await mes_formatado;
  }


}
