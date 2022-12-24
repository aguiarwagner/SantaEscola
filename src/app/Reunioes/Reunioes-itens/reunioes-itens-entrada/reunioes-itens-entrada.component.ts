import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDisclaimer, PoDisclaimerGroup, PoNotificationService, PoPageAction, PoPageFilter, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-reunioes-itens-entrada',
  templateUrl: './reunioes-itens-entrada.component.html',
  styleUrls: ['./reunioes-itens-entrada.component.css']
})
export class ReunioesItensEntradaComponent implements OnInit {
  recno: any = "";
  mapa: Mapa = new Mapa();
  CodBar: any;
  err: any;
  lTeste: boolean = true;
  isLoading: boolean = true;
  itemsFiltered: Array<any>;
  items: Array<any>;
  items2: Array<any>;
  columns: Array<PoTableColumn> = [];
  breadcrumb: PoBreadcrumb;
  disclaimerGroup: PoDisclaimerGroup;
  itens: any = [];
  itens2: any = [];
  lControlFilter: boolean = false;
  private disclaimers: Array<PoDisclaimer> = [];
  lEntradaManual: boolean = true;
  lOk: boolean = true;
  now = new Date();
  urlImagem = "";

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recno =  this.activatedRoute.snapshot.paramMap.get('id');

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

  GravaEntrada(value: any){
    let lAchou = false
    //let now = new Date;
    const datePipe = new DatePipe('en-US');
    debugger
    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index].Recno == parseInt(this.CodBar)) {
        lAchou = true
      }

    }

    if(!lAchou){
      this.urlImagem = "";
      this.poNotification.warning("Registro não encontrado, verifique se o código " + this.CodBar + " está correto!");
      return
    }

    this.httpService.getEntradaSaida(1, parseInt(this.recno), parseInt(this.CodBar), ).subscribe(dados => {
      this.itens2 = [];
      this.itens2 = dados
      this.items2 = this.itens2
     .map( (data: {   recno: any, dataEntrada: any}) => {
        return {
          Recno: data.recno,
        }
      });
      if(this.items2.length > 0){
        this.urlImagem = "";
        this.poNotification.warning("Registro de entrada já gravado, verifique se o código " + this.CodBar + " está correto!" );
        this.CodBar = "";
        return
      }

      this.now = new Date();
      this.mapa.RecnoCrianca = parseInt(this.CodBar);
      this.mapa.RecnoCabecalhoReuniao = parseInt(this.recno);
      this.mapa.DataEntrada = datePipe.transform(this.now, 'yyyy-MM-dd HH:mm:ss', 'pt-BR')

      this.httpService.postReuniaoEntradaSaida(this.mapa).subscribe(() => {
        this.lOk = true

        this.poNotification.success("Registro " + this.mapa.RecnoCrianca + " incluído com sucesso!");
        this.urlImagem = './assets/images/' + this.CodBar + '.jpg'
        this.CodBar = undefined;
      })

      const sleep = (milliseconds: any) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      // Aguarda 5 segundos
      sleep(5000).then(() => {
        if (!this.lOk) {
          this.urlImagem = "";
          this.poNotification.error("Erro na inclusão!");
        }
      });

    });

  }

  GuardaSelecao(event: any){
    this.mapa.RecnoCrianca = event.Recno;
  }

  entradaManual(){
    this.CodBar = this.mapa.RecnoCrianca;
    this.GravaEntrada(this.CodBar);
    /*
    const datePipe = new DatePipe('en-US');
    this.now = new Date();
    this.mapa.RecnoCabecalhoReuniao = parseInt(this.recno);
    this.mapa.DataEntrada = datePipe.transform(this.now, 'yyyy-MM-dd HH:mm:ss', 'pt-BR')

    this.httpService.postReuniaoEntradaSaida(this.mapa).subscribe(() => {
      this.lOk = true
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
    */

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

  Cancel(){
    this.router.navigate(['reunioes']);
  }

}
