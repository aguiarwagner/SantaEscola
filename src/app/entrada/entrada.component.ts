import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoPageFilter, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
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
  lEntradaManual: boolean = false;

  cProduto = "Selecione o produto"
  descricaoProduto: string = "";
  descprodAlteracao: string = "";
  descprod2: string = "";
  dataEntrada = new Date();
  now: Date | undefined;
  valorUnitario: number = 0;
  nItemAtu: number = 0;
  valunitAltera: number = 0;
  quantidade: number = 0;
  quantidadeAltera: number = 0;
  numeroNF: number = 0;
  serieNF: number = 0;
  valorTotal: number = 0;
  valorTotalAltera: number = 0;
  recno: number = 0;
  item: number = 0;
  recnoFornecedor: number = 0;
  lOk: boolean = false;
  laltera: boolean = false;
  quickSearchWidth: number = 3;
  cNome: string = "";
  SelFornec: Array<PoSelectOption> = [];
  SelProduto: Array<PoSelectOption> = [];
  SelProduto2: Array<PoSelectOption> = [];
  itens_mapa:any = [];
  items2: Array<any> = [];
  tableActions: Array<PoPageAction> = [];
  itemsFiltered2: Array<any> = [];
  aGrava: any = [];
  cProdutoSelecionado: string = "";
  cProdutoAlterado: string = "";
  lLoadingTable: boolean = false;


  constructor(
    public poNotification: PoNotificationService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.CodBar= "";

    this.GetCriancas()

    /*this.columns = [
      { property: 'Recno', label: 'Código barras', type: 'string', width: '5%'},
      { property: 'NomeCrianca', label: 'Nome Criança', type: 'string', width: '40%'},
      { property: 'DataNascimento', label: 'Data Nascimento', type: 'string', width: '10%'},
      { property: 'Endereco', label: 'Endereço', type: 'string', width: '25%'},
      { property: 'Bairro', label: 'Bairro', type: 'string', width: '20%'}

    ];*/

    this.columns = [
      { property: 'item', label: 'Item', type: 'number', width: '5%'},
      { property: 'descricaoProduto', label: 'produto', type: 'string', width: '30%'},
      { property: 'recnoProduto', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valorUnitario', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valorTotal', label: 'Total', type: 'number', width: '15%'},
      { property: 'numeroNF', label: 'numeroNF', type: 'number', width: '15%',visible: false},
      { property: 'serieNF', label: 'serieNF', type: 'number', width: '15%',visible: false}
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
        { label: 'Confirmar entrada da criança', action: this.entradaManual.bind(this), disabled: false, visible: true }
      ];

    }

  }

  Adiciona(){
    this.itemsFiltered = [];
    this.lLoadingTable = true;
    if (this.laltera){
      for(var i = 0; i < this.itemsFiltered.length; i++){
        if (this.itemsFiltered[i].recnoProduto == this.recno){
          this.itemsFiltered[i].descricaoProduto =  this.descricaoProduto;
          this.itemsFiltered[i].item =  this.item;
          this.itemsFiltered[i].recno =  this.recno;
          this.itemsFiltered[i].quantidade = this.quantidade;
          this.itemsFiltered[i].valorUnitario = this.valorUnitario;
          this.itemsFiltered[i].valorTotal = this.valorTotal;
          this.itemsFiltered[i].numeroNF = this.numeroNF;
          this.itemsFiltered[i].serieNF = this.serieNF;
        }
      }
    }else{
      for(var i = 0; i < this.items.length; i++){
        if (this.items[i].recno == this.cProdutoSelecionado){
          this.descricaoProduto = this.items[i].descricaoProduto;
          this.recno = this.items[i].recno;
        }


      }


      this.itemsFiltered2.push({
        recnoProduto: this.recno,
        item: this.item += 1,
        descricaoProduto:this.descricaoProduto,
        quantidade:this.quantidade ,
        valorUnitario:this.valorUnitario,
        valorTotal: this.quantidade * this.valorUnitario,
        numeroNF: this.numeroNF,
        serieNF: this.serieNF
      });
    }
    this.columns = [];
    this.columns = [
      { property: 'item', label: 'Item', type: 'number', width: '5%'},
      { property: 'descricaoProduto', label: 'produto', type: 'string', width: '30%'},
      { property: 'recnoProduto', label: 'recno', type: 'string', width: '30%',visible: false},
      { property: 'quantidade', label: 'Quantidade', type: 'number', width: '20%'},
      { property: 'valorUnitario', label: 'Valor Unitário', type: 'number', width: '20%'},
      { property: 'valorTotal', label: 'Total', type: 'number', width: '15%'},
      { property: 'numeroNF', label: 'numeroNF', type: 'number', width: '15%',visible: false},
      { property: 'serieNF', label: 'serieNF', type: 'number', width: '15%',visible: false}
    ];
    this.itemsFiltered = this.itemsFiltered2;
    this.itemsFiltered = this.itemsFiltered2;
    this.laltera = false;
    this.lLoadingTable = false;
  }


}
