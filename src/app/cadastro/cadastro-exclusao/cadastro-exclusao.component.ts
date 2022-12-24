import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-cadastro-exclusao',
  templateUrl: './cadastro-exclusao.component.html',
  styleUrls: ['./cadastro-exclusao.component.css']
})
export class CadastroExclusaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  items: Array<any>;
  itens: any = [];
  id: any = "";
  lOk: boolean = true;
  constructor(
    public poNotification: PoNotificationService,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.GetCriancas();
  }

  GetCriancas(){
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');

    this.httpService.getCriancasId(parseInt(this.id)).subscribe((mapa: Mapa) => {
      this.mapa = mapa;
    });
  }

  Cancel(){
    this.router.navigate(['cadastro']);
  }

  Grava(){

    /*
    this.httpService.getEntradaSaida(2, parseInt(this.idReuniao), 0, ).subscribe(dados => {
      this.itens = [];
      this.itens = dados
      this.items = this.itens
      .map( (data: {   recno: any, dataEntrada: any, nomeCrianca: any, dataSaida: any}) => {
        return {
          recno: data.recno,
          dataEntrada: data.dataEntrada,
          dataSaida: data.dataSaida,
          nomeCrianca: data.nomeCrianca,
        }
      });
      if(this.items.length > 0){
        this.poNotification.information("A reunião já teve entrada e saída gravadas e não poderá ser excluída!");
        return
      }
      */
      debugger
      this.httpService.deleteCriancas(this.id, this.mapa).subscribe(() => {
        this.lOk = true;
        this.router.navigate(["/cadastro"]);
        this.poNotification.success("Registro excluído com sucesso!");
      })

      const sleep = (milliseconds: any) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      // Aguarda 5 segundos
      sleep(5000).then(() => {
        if (!this.lOk) {
          this.poNotification.error("Erro na exclusão!");
        }
      });

  }

}
