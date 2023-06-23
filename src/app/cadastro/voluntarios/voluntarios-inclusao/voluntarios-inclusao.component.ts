import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';
import { AuthService } from 'src/app/guards/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voluntarios-inclusao',
  templateUrl: './voluntarios-inclusao.component.html',
  styleUrls: ['./voluntarios-inclusao.component.css']
})
export class VoluntariosInclusaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean = true;
  contains: any = "contains";
  disableCombo:boolean = true;
  AuthService: AuthService = new AuthService( this._httpClient, this.httpService, this.router);

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private _httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    let dadosUser =  this.AuthService.getUsertoken();

    switch(dadosUser.name){
      case 'ccbitapevi':
        this.mapa.comunCongregacao = 'Jd. Itapevi - Central'
        break;
      case 'ccbadmitapevi':
        this.mapa.comunCongregacao = 'Jd. Itapevi - Central'
        break;
      case 'ccbengcardoso':
        this.mapa.comunCongregacao = 'Vila Engº Cardoso'
        break;
      case 'ccbnovaitapevi':
        this.mapa.comunCongregacao = 'Nova Itapevi'
        break;
    }
  }

  Cancel(){
    this.router.navigate(['voluntarios']);
  }

  Grava(){
    if (this.mapa.nomeVoluntario == undefined || this.mapa.nomeVoluntario == "") {
      this.poNotification.success("Preencha o nome do voluntário!");
      return;
    }

    this.httpService.postVoluntarios(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/voluntarios"]);
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
