import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Mapa } from '../Shared/mapa';
//import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  sampleItems: Array<any> = [
    {
      title: 'Comitê de Performance',
      description: 'Já conhece o fluxo para avaliação de performance da linha Protheus?',
      date: '05 de Fevereiro, 2020',
      author: 'Ronaldo Tapia',
      link: 'https://tdn.totvs.com/pages/viewpage.action?pageId=519712279',
      imagem: './assets/images/slide1.jpg'

    },
    {
      title: 'Central do Analista',
      description: 'Já conhece todos os indicadores mostrados na central do analista?',
      date: 'Fevereiro 05, 2020',
      author: 'Ronaldo Tapia',
      link: 'https://tdn.totvs.com/display/PROT/Central+do+Analista',
      imagem: './assets/images/slide2.jpg'
    },
    {
      title: 'Central de Atualizações',
      description: 'Já acessou a plataforma? Verifique aqui a documentação disponível.',
      date: 'Março 05, 2020',
      author: 'Ronaldo Tapia',
      link: 'https://tdn.totvs.com/pages/releaseview.action?pageId=531011130',
      imagem: './assets/images/slide3.jpg'
    },

  ];

}
