import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventos: any;
//    = [
//     {
//        Tema: 'Angular 11',
//        Local: 'Belo Horizonte'
//     },
//     {
//       Tema: '.NET 5',
//       Local: 'São Paulo'
//    },
//    {
//     Tema: 'Angular e suas novidades',
//      Local: 'Rio de Janeiro'
//    }

// ]
  constructor(private  http: HttpClient){}

    ngOnInit(): void{
      this.getEventos();
    }

    public getEventos(): void{
      this.http.get('https://localhost:7245/api/eventos').subscribe(
        response => this.eventos = response,
        error => console.log(error)
      );
    }


}
