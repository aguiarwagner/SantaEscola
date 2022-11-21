import { Component, OnInit } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
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
  constructor(
    public poNotification: PoNotificationService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.CodBar= "";

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

}
