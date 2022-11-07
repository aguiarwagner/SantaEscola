import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Mapa } from '../Shared/mapa';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mapa: Mapa = new Mapa();
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  onClick(){
    let teste: any;
    debugger
    this.httpService.getTeste(this.mapa).subscribe((resposta=> {

      teste = resposta;
    })
    );

  }

}
