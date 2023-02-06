import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import * as JsBarcode from 'jsbarcode';
import { HttpService } from 'src/app/http.service';
import * as printJS from 'print-js';
import { Mapa } from 'src/app/Shared/mapa';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro.imprime',
  templateUrl: './cadastro.imprime.component.html',
  styleUrls: ['./cadastro.imprime.component.css']
})
export class CadastroImprimeComponent implements OnInit {
  teste:any;
  px2mmFactor!: number;
  mapa: Mapa = new Mapa();
  Responsaveis!: string;
  TelResponsaveis!: string;
  dateNow= new Date();
  anoAtu!: string;

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.anoAtu = this.dateNow.getFullYear().toString()

    this.GetCriancas();
    this.px2mmFactor = this.calcPx2MmFactor();

    let codBar: any = this.activatedRoute.snapshot.paramMap.get('id')?.toString();

    JsBarcode('#barcode', codBar, {
      format: 'code128', // default
      height: 8 * this.px2mmFactor, // 10mm
      width: 2.3,
      // displayValue: false,
      text: codBar,
      background: 'rgba(0,0,0,0)',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      lineColor: 'black',
      margin: 2 * this.px2mmFactor, // 5mm
      textMargin: 2 * this.px2mmFactor, // 2mm
      // textAlign: 'right',
      // textPosition: 'top',
    });

    const sleep = (milliseconds: any) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Aguarda 5 segundos
    sleep(600).then(() => {
      this.imprime();
    });



  }

  private calcPx2MmFactor() {
    let e = document.createElement('div');
    e.style.position = 'absolute';
    e.style.width = '100mm';
    document.body.appendChild(e);
    let rect = e.getBoundingClientRect();
    document.body.removeChild(e);
    return rect.width / 100;
  }


imprime(){
  //document.open();
  //window.print();
  window.print()
  //printJS('f', 'html')
  //printJS({ printable: 'f', type: 'html', header: '' })
  //printJS({ printable: 'g', type: 'html', header: '' })
  //document.close();
  this.router.navigate(['cadastro']);
  this.poNotification.success("Impressão finalizada com sucesso!");

}

GetCriancas(){
  let id: any =  this.activatedRoute.snapshot.paramMap.get('id');

  this.httpService.getCriancasId(parseInt(id)).subscribe((mapa: Mapa) => {
    this.mapa = mapa;
    if(this.mapa.nomePai != undefined || this.mapa.nomeMae != undefined){
      this.Responsaveis = this.mapa.nomePai + " e " + this.mapa.nomeMae;
    }

    if(this.mapa.telPai != undefined || this.mapa.telMae != undefined){
      this.TelResponsaveis = this.mapa.telPai + " / " + this.mapa.telMae;
    }

    this.mapa.dataNascimento =  this.mapa.dataNascimento.substring(8, 10) + "/" + this.mapa.dataNascimento.substring(5, 7) + "/" + this.mapa.dataNascimento.substring(0, 4);
  });
}

}
