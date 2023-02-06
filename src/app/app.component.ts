import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { AuthService } from './guards/auth.service';

import { PoDialogService, PoMenuItem } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { HttpService } from './http.service';

declare var particlesJS: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loadingButton = false;
  pFilter = false;
  pCollapsed = true;
  teste: any;
  AuthService: AuthService = new AuthService( this._httpClient, this.httpService, this.router);
  menus: Array<PoMenuItem> = [
    { label: 'Início', icon: 'po-icon-home', link: './', shortLabel: 'Inicio' },
    //{ label: 'Entrada', icon: 'po-icon po-icon-user-add', link: './entrada', shortLabel: 'Entrada' },
    { label: 'Reuniões', icon: 'po-icon po-icon-user-add', link: './reunioes', shortLabel: 'Reuniões' },
    { label: 'Cadastro', icon: 'po-icon po-icon-news', link: './cadastro', shortLabel: 'Cadastro' },
    { label: 'Relatórios', icon: 'po-icon po-icon-news', link: './relatorios', shortLabel: 'Relatórios' },
  ];

  titleToolbar = 'Espaço Infantil';
  constructor(private router: Router,
    private _httpClient: HttpClient,
    private httpService: HttpService,
    public poAlert: PoDialogService,
  ) { };

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
    });
    if (document.getElementById("menu") != undefined) {
      location.reload();
    }
  }

  public async isAuth(formData: PoPageLogin) {
    let logado: any;
    logado = await this.AuthService.login(formData.login, formData.password );

    if  (logado){
      this.AuthService.mostraMenu = true;
      this.router.navigate(['']);
    }

  }
}

