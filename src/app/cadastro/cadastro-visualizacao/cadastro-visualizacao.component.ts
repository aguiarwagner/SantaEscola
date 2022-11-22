import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpService } from 'src/app/http.service';
import { Mapa } from 'src/app/Shared/mapa';

@Component({
  selector: 'app-cadastro-visualizacao',
  templateUrl: './cadastro-visualizacao.component.html',
  styleUrls: ['./cadastro-visualizacao.component.css']
})
export class CadastroVisualizacaoComponent implements OnInit {
  mapa: Mapa = new Mapa();
  items: Array<any>;
  itens: any = [];
  id: any = "";

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

}
