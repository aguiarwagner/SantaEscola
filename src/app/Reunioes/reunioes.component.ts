import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from '../http.service';
import { Mapa } from '../Shared/mapa';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrls: ['./reunioes.component.css']
})
export class ReunioesComponent implements OnInit {
  mapa: Mapa = new Mapa();
  columns: Array<PoTableColumn> = [];
  loadButton = false;
  labelButton = "Cadastrar nova reunião";
  isLoading: boolean = true;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  items: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];

  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getReunioes();
    this.columns = [
      { property: 'DataReuniao', label: 'Data da reunião', type: 'string', width: '10%'},
      { property: 'AssuntoAbordado', label: 'Tema da Aula', type: 'string', width: '70%'},
      { property: 'Observacoes', label: 'Ocorrências', type: 'string', width: '20%'}

    ];
    this.tableActions = [

      { action: this.entradaReuniao.bind(this), label: 'Entrada' },
      { action: this.saidaReuniao.bind(this), label: 'Saída' },
      { action: this.visualReuniao.bind(this), label: "Visualizar" },
      { action: this.alteraReuniao.bind(this), label: 'Alterar' },
      { action: this.excluirReuniao.bind(this), label: 'Excluir' }

    ]

    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
  }

  getReunioes(){

    this.httpService.getReunioes().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
     .map( (data: { dataReuniao: any; assuntoAbordado: any; observacoes: any;recno: any}) => {
        return {
          DataReuniao: data.dataReuniao.substring(8, 10) + "/" + data.dataReuniao.substring(5, 7) + "/" + data.dataReuniao.substring(0, 4),
          AssuntoAbordado: data.assuntoAbordado, //.substring(8, 10) + "/" + data.assuntoAbordado.substring(5, 7) + "/" + data.assuntoAbordado.substring(0, 4),
          Observacoes: data.observacoes,
          Recno: data.recno
        }
    });

    this.items.sort(function (a, b) {
      if (a.Recno > b.Recno) {
       return -1;
      }
      if (a.Recno < b.Recno) {
       return 1;
      }
      return 0;
    });

    this.itemsFiltered = [...this.items];
    this.isLoading = false

    });

  }

  Incluir(){
    this.router.navigate(['reunioes/inclusaoreuniao']);

  }

  visualReuniao(mapa: any){
    this.router.navigate(['reunioes/visualizareuniao', mapa.Recno]);
  }

  alteraReuniao(mapa: any){
    this.router.navigate(['reunioes/alteracaoreuniao', mapa.Recno]);
  }

  entradaReuniao(mapa: any){
    this.router.navigate(['reunioes/entradareuniao', mapa.Recno]);
  }

  saidaReuniao(mapa: any){
    this.router.navigate(['reunioes/saidareuniao', mapa.Recno]);
  }

  excluirReuniao(mapa: any){
    this.router.navigate(['reunioes/exclusaoreuniao', mapa.Recno]);
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
      this.itemsFiltered = [...this.items];
    }
  }

  private applyFilters(filters: any) {
    this.itemsFiltered = this.items.filter(item => {
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

}
