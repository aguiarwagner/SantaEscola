import { Component, OnInit } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})

export class EntradaComponent implements OnInit {
  CodBar: any;
  err: any;
  constructor(
    public poNotification: PoNotificationService,
  ) { }

  ngOnInit(): void {
    this.CodBar= "";

  }

  onClick(value: any){
    let teste = this.CodBar;

    this.CodBar = "";
    this.poNotification.success("Código de Barras "+ teste);


  }

}
