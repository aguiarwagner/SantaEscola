import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import * as JsBarcode from 'jsbarcode';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-voluntarios-imprime',
  templateUrl: './voluntarios-imprime.component.html',
  styleUrls: ['./voluntarios-imprime.component.css']
})
export class VoluntariosImprimeComponent implements OnInit {
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
    this.px2mmFactor = this.calcPx2MmFactor();

    let codBar: any = this.activatedRoute.snapshot.paramMap.get('id')?.toString();

    let comunCongregacao = this.activatedRoute.snapshot.paramMap.get('comunCongregacao');
    if(!comunCongregacao){
      this.mapa.comunCongregacao = "";
    }else{
      this.mapa.comunCongregacao = comunCongregacao;
    }

    let nomeVoluntario = this.activatedRoute.snapshot.paramMap.get('nomeVoluntario')?.toString();
    if(!nomeVoluntario){
      this.mapa.nomeVoluntario = "";
    }else{
      this.mapa.nomeVoluntario = nomeVoluntario;
    }

    let funcao = this.activatedRoute.snapshot.paramMap.get('funcao')?.toString();
    if(!funcao){
      this.mapa.funcao = "";
    }else{
      this.mapa.funcao = funcao;
    }

    JsBarcode('#barcode', codBar, {
      format: 'code128', // default
      height: 8 * this.px2mmFactor, // 10mm
      width: 2.3,
      text: codBar,
      background: 'rgba(0,0,0,0)',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      lineColor: 'black',
      margin: 2 * this.px2mmFactor, // 5mm
      textMargin: 2 * this.px2mmFactor, // 2mm
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
  window.print()
  this.router.navigate(["/voluntarios"]);
  this.poNotification.success("Impressão finalizada com sucesso!");
}

}
