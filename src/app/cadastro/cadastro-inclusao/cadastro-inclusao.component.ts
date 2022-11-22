import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-cadastro-inclusao',
  templateUrl: './cadastro-inclusao.component.html',
  styleUrls: ['./cadastro-inclusao.component.css']
})
export class CadastroInclusaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  lOk: boolean = true;

  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
  }

  Cancel(){
    this.router.navigate(['cadastro']);
  }

  Grava(){
    if (this.mapa.NomeCrianca == undefined || this.mapa.NomeCrianca == "") {
      this.poNotification.success("Preencha o nome da criança!");
      return;
    }
    if (this.mapa.DataNascimento == undefined) {
      this.poNotification.success("Preencha a data de nascimento!");
      return;
    }

    this.httpService.postCriancas(this.mapa).subscribe(() => {
      this.lOk = true
      this.router.navigate(["/cadastro"]);
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

}
