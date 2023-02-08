import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.css']
})
export class VoluntariosComponent implements OnInit {
  mapa: Mapa = new Mapa();
  columns: Array<PoTableColumn> = [];
  loadButton = false;
  labelButton = "Cadastrar novos Voluntários";
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
    this.GetVoluntarios()

    this.columns = [
      { property: 'nomeVoluntario', label: 'Nome do Voluntário', type: 'string', width: '40%'},
      { property: 'endereco', label: 'Endereço', type: 'string', width: '20%'},
      { property: 'bairro', label: 'Bairro', type: 'string', width: '10%'},
      { property: 'cep', label: 'CEP', type: 'string', width: '10%'},
      { property: 'funcao', label: 'Função', type: 'string', width: '10%'},
      { property: 'comunCongregacao', label: 'Comun Congregação', type: 'string', width: '10%'},

    ];
    this.tableActions = [
      { action: this.visualVoluntarios.bind(this), label: "Visualizar" },
      { action: this.alteraVoluntarios.bind(this), label: 'Alterar' },
      { action: this.excluirVoluntarios.bind(this), label: 'Excluir' },

    ]

    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
  }

  GetVoluntarios(){
    this.httpService.getVoluntarios().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
     .map( (data: { nomeVoluntario: any; endereco: any; cep: any; bairro: any;  recno: any; funcao: any; comunCongregacao: any}) => {
        return {
          nomeVoluntario: data.nomeVoluntario,
          endereco: data.endereco,
          cep: data.cep,
          bairro: data.bairro,
          recno: data.recno,
          funcao: data.funcao,
          comunCongregacao: data.comunCongregacao,
        }
    });

    this.itemsFiltered = [...this.items];
    this.isLoading = false

    });

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

  Incluir(){
    this.router.navigate(['voluntarios/inclusao']);
  }
  alteraVoluntarios(mapa: any){
    this.router.navigate(['voluntarios/alteracao', mapa.recno]);
  }
  excluirVoluntarios(mapa: any){
    this.router.navigate(['voluntarios/exclusao', mapa.recno]);
  }
  visualVoluntarios(mapa: any){
    this.router.navigate(['voluntarios/visualizacao', mapa.recno]);
  }


}
