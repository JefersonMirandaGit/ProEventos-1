import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: any = [];

  public widthImg: number = 100;
  public marginImg: number = 2;
  public exibirImagem: boolean = true;
  private filtroListado: string = '';

  public get filtroLista() {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

    ) { }

  public ngOnInit(): void {
   // this.spinner.show();
    this.getEventos();

    // ANALISAR O POR QUE O SPINNER NÂO ESTÁ APARECENDO A BOLINHA

    //  /** spinner starts on init */
    //  this.spinner.show();

    //  setTimeout(() => {
    //    /** spinner ends after 5 seconds */
    //    this.spinner.hide();
    //  }, 5000);


  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe(
      (eventoResp: Evento[]) => {
        this.eventos = eventoResp;
        this.eventosFiltrados = this.eventos;
      },

      error => console.log(error)
    );
  }


  openModal(template: TemplateRef<any>) : void{
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    // this.message = 'Confirmed!';
    this.modalRef?.hide();
    this.toastr.success('Evento deletado com sucesso!', 'Sucesso!');

  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef?.hide();
  }



}
