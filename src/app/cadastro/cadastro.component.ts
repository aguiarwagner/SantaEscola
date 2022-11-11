import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['cadastro/inclusao']);
  }
  onClick2(){
    this.router.navigate(['cadastro/alteracao']);
  }
  onClick3(){
    this.router.navigate(['cadastro/exclusao']);
  }
  onClick4(){
    this.router.navigate(['cadastro/visualizacao']);
  }

}
