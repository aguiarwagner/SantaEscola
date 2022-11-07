import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Mapa {
  username: string = "";
  password: string = "";


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

