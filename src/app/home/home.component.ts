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
      title: 'Provérbios 22:6',
      description: 'Instrui o menino no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.',
      imagem: './assets/images/CCBITAPEVI.jpg'
    },
    {
      title: 'Marcos 10:14',
      description: 'Deixai vir os pequeninos a mim e não os impeçais, porque dos tais é o Reino de Deus.',
      imagem: './assets/images/CCBITAPEVI.jpg'
    },
    {
      title: 'Mateus 18:3',
      description: 'Em verdade vos digo que, se não vos converterdes e não vos fizerdes como crianças, de modo algum entrareis no Reino dos céus.',
      imagem: './assets/images/CCBITAPEVI.jpg'
    },

  ];

}
