import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-reunioes-cabecalho-exclusao',
  templateUrl: './reunioes-cabecalho-exclusao.component.html',
  styleUrls: ['./reunioes-cabecalho-exclusao.component.css']
})
export class ReunioesCabecalhoExclusaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean = true;
  idReuniao: any = "";
  items: Array<any>;
  itens: any = [];
  contains: any = "contains";

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

    this.httpService.getEntradaSaida(2, parseInt(this.idReuniao), 0, ).subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
      .map( (data: {   recno: any, dataEntrada: any, nomeCrianca: any, dataSaida: any}) => {
        return {
          recno: data.recno,
          dataEntrada: data.dataEntrada,
          dataSaida: data.dataSaida,
          nomeCrianca: data.nomeCrianca,
        }
      });
      if(this.items.length > 0){
        this.poNotification.information("A reunião já teve entrada e saída gravadas e não poderá ser excluída!");
        return
      }

      this.httpService.deleteReuniao(this.idReuniao, this.mapa).subscribe(() => {
        this.lOk = true;
        this.router.navigate(["/reunioes"]);
        this.poNotification.success("Registro excluído com sucesso!");
      })

      const sleep = (milliseconds: any) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      // Aguarda 5 segundos
      sleep(5000).then(() => {
        if (!this.lOk) {
          this.poNotification.error("Erro na exclusão!");
        }
      });

    });




    //this.httpService.postReuniao(this.mapa).subscribe(() => {
    //  this.lOk = true
    //  this.router.navigate(["/reunioes"]);
    //  this.poNotification.success("Registro incluído com sucesso!");
    //})



  }

  Cancel(){
    this.router.navigate(['reunioes']);
  }

  readonly SelCongregacao: Array<PoSelectOption> = [
    { label: 'Alto da Colina - Cohab',  value: 'Alto da Colina - Cohab'},
    { label: 'Alto do Bela Vista' ,     value: 'Alto do Bela Vista'},
    { label: 'Alto do Paulista' ,       value: 'Alto do Paulista'},
    { label: 'Amador Bueno',            value:'Amador Bueno'},
    { label: 'Ambuita',                 value:'Ambuita'},
    { label: 'Bela Vista' ,             value:'Bela Vista'},
    { label: 'Chácara Regina',          value: 'Chácara Regina'},
    { label: 'Chácara Santa Cecília',   value: 'Chácara Santa Cecília'},
    { label: 'Jd. Alabama',             value: 'Jd. Alabama'},
    { label: 'Jd. Boa Esperança',       value: 'Jd. Boa Esperança'},
    { label: 'Jd. Cruzeiro',            value: 'Jd. Cruzeiro'},
    { label: 'Jd. Gióia',               value:'Jd. Gióia'},
    { label: 'Jd. Hokaido',             value: 'Jd. Hokaido'},
    { label: 'Jd. Itacolomi',           value: 'Jd. Itacolomi'},
    { label: 'Jd. Itaparica' ,          value: 'Jd. Itaparica'},
    { label: 'Jd. Itapevi - Central',   value:'Jd. Itapevi - Central'},
    { label: 'Jd. Itapuã',              value: 'Jd. Itapuã'},
    { label: 'Jd. Marina',              value: 'Jd. Marina'},
    { label: 'Jd. Nova Amador Bueno',   value: 'Jd. Nova Amador Bueno'},
    { label: 'Jd. Paulista',            value:'Jd. Paulista'},
    { label: 'Jd. Rainha',              value: 'Jd. Rainha'},
    { label: 'Jd. Rosimary',            value: 'Jd. Rosimary'},
    { label: 'Jd. Rosimary II',         value: 'Jd. Rosimary II'},
    { label: 'Jd. Ruth',                value: 'Jd. Ruth'},
    { label: 'Jd. Santa Cecilia',       value: 'Jd. Santa Cecilia'},
    { label: 'Jd. Santa Rita' ,         value: 'Jd. Santa Rita'},
    { label: 'Jd. Santa Rita II',       value: 'Jd. Santa Rita II'},
    { label: 'Jd. São Carlos',          value: 'Jd. São Carlos'},
    { label: 'Jd. Sorocabano',          value:'Jd. Sorocabano'},
    { label: 'Monte Serrat',            value: 'Monte Serrat'},
    { label: 'Monte Serrat II',         value: 'Monte Serrat II'},
    { label: 'Nova Itapevi',            value: 'Nova Itapevi'},
    { label: 'Pq. Suburbano I',         value: ''},
    { label: 'Pq. Suburbano II',        value: 'Pq. Suburbano II'},
    { label: 'Pq. Suburbano III',       value: 'Pq. Suburbano III'},
    { label: 'Pq. Suburbano IV',        value: 'Pq. Suburbano IV'},
    { label: 'Recanto Paulistano',      value: 'Recanto Paulistano'},
    { label: 'Residencial das Flores',  value: 'Residencial das Flores'},
    { label: 'Sitio José Teixeira',     value: 'Sitio José Teixeira'},
    { label: 'São João',                value: 'São João'},
    { label: 'Sítio do Julinho',        value: 'Sítio do Julinho'},
    { label: 'Vale do Sol',             value: 'Vale do Sol'},
    { label: 'Vila das Chácaras',       value: 'Vila das Chácaras'},
    { label: 'Vila Engº Cardoso',       value:'Vila Engº Cardoso'},
    { label: 'Vila Jurema',             value: 'Vila Jurema'},
    { label: 'Vila Nova Esperaça',      value: 'Vila Nova Esperaça'},
    { label: 'Vila Santa Rita' ,        value: 'Vila Santa Rita'},
    { label: 'Vitápolis I',             value: 'Vitápolis I'},
    { label: 'Vítapolis II',            value: 'Vitápolis II'},

  ];


}
