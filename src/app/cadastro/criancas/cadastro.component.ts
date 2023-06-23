import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { AuthService } from 'src/app/guards/auth.service';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  mapa: Mapa = new Mapa();
  columns: Array<PoTableColumn> = [];
  loadButton = false;
  labelButton = "Cadastrar novas Crianças";
  isLoading: boolean = true;
  tableActions: Array<PoPageAction>;
  pageActions: Array<PoPageAction>;
  itemsFiltered: Array<any>;
  items: Array<any>;
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];
  AuthService: AuthService = new AuthService( this._httpClient, this.httpService, this.router);

  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private _httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.GetCriancas()

    this.columns = [
      { property: 'NomeCrianca', label: 'Nome Criança', type: 'string', width: '40%'},
      { property: 'DataNascimento', label: 'Data Nascimento', type: 'string', width: '30%'},
      { property: 'Endereco', label: 'Endereço', type: 'string', width: '20%'},
      { property: 'Bairro', label: 'Bairro', type: 'string', width: '10%'}

    ];
    this.tableActions = [
      { action: this.visualCriancas.bind(this), label: "Visualizar" },
      { action: this.alteraCriancas.bind(this), label: 'Alterar' },
      { action: this.excluirCriancas.bind(this), label: 'Excluir' },
      { action: this.imprimeCriancas.bind(this), label: 'Imprimir' }

    ]

    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };
  }


  GetCriancas(){
    debugger
    let dadosUser =  this.AuthService.getUsertoken();

    let igreja = "";

    switch(dadosUser.name){
      case 'ccbitapevi':
        igreja = 'Jd. Itapevi - Central'
        break;
      case 'ccbadmitapevi':
        igreja = 'Jd. Itapevi - Central'
        break;
      case 'ccbengcardoso':
        igreja = 'Vila Engº Cardoso'
        break;
      case 'ccbnovaitapevi':
        igreja = 'Nova Itapevi'
        break;
    }


    this.httpService.getCriancas().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
      .filter((dados: { comunCongregacao: string; })  => {
        // Valida SubGrupo Prime
        if (dados.comunCongregacao == igreja) {
          return true;
        }
        return false;
      })
     .map( (data: { nomeCrianca: any; dataNascimento: any; endereco: any; bairro: any;  recno: any}) => {
        return {
          NomeCrianca: data.nomeCrianca,
          DataNascimento: data.dataNascimento.substring(8, 10) + "/" + data.dataNascimento.substring(5, 7) + "/" + data.dataNascimento.substring(0, 4),
          Endereco: data.endereco,
          Bairro: data.bairro,
          Recno: data.recno
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
    this.router.navigate(['cadastro/inclusao']);
  }
  alteraCriancas(mapa: any){
    this.router.navigate(['cadastro/alteracao', mapa.Recno]);
  }
  excluirCriancas(mapa: any){
    this.router.navigate(['cadastro/exclusao', mapa.Recno]);
  }
  visualCriancas(mapa: any){
    this.router.navigate(['cadastro/visualizacao', mapa.Recno]);
  }
  imprimeCriancas(mapa: any){
    this.router.navigate(['cadastro/imprime', mapa.Recno]);
  }



}
