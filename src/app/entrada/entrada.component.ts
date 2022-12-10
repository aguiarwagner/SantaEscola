import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from '../http.service';
import { Mapa } from '../Shared/mapa';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})

export class EntradaComponent implements OnInit {
  mapa: Mapa = new Mapa();
  CodBar: any;
  err: any;
  lTeste: boolean = true;
  isLoading: boolean = true;
  itemsFiltered: Array<any>;
  items: Array<any>;
  columns: Array<PoTableColumn> = [];
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];
  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];
  lEntradaManual: boolean = true;
  

  constructor(
    public poNotification: PoNotificationService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.CodBar= "";

    this.GetCriancas()

    this.columns = [
      { property: 'Recno', label: 'Código barras', type: 'string', width: '5%'},
      { property: 'NomeCrianca', label: 'Nome Criança', type: 'string', width: '40%'},
      { property: 'DataNascimento', label: 'Data Nascimento', type: 'string', width: '10%'},
      { property: 'Endereco', label: 'Endereço', type: 'string', width: '25%'},
      { property: 'Bairro', label: 'Bairro', type: 'string', width: '20%'}

    ];
    
    this.disclaimerGroup = {
      title: 'Filters',
      disclaimers: [],
      change: this.onChangeDisclaimer.bind(this)
    };

  }

  onClick(value: any){
    let teste = this.CodBar;

    this.CodBar = "";
    this.poNotification.success("Código de Barras "+ teste);
    this.httpService.getTeste(this.mapa).subscribe((resposta=> {

      teste = resposta;
    })
    );
  }  

  GetCriancas(){
    this.httpService.getCriancas().subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
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

  public actions: Array<PoPageAction> = [
    { label: 'Confirmar', action: this.entradaManual.bind(this), disabled: this.lEntradaManual, visible: false }
  ];

  entradaManual(){

  }

  SelecionaAba(nOpc: number){
  
    
    if (nOpc == 1) {
      this.actions = [
        { label: 'Confirmar entrada da criança', action: this.entradaManual.bind(this), disabled: this.lEntradaManual, visible: false }
      ];
      
    } else {
      this.actions = [
        { label: 'Confirmar entrada da criança', action: this.entradaManual.bind(this), disabled: true, visible: true }
      ];
      
    }
   
  }

}
