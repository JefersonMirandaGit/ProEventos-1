import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }

  }


  constructor(private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParan = this.router.snapshot.paramMap.get('id');

    if (eventoIdParan !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';


      this.eventoService.getEventosById(+eventoIdParan).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento)
        },

        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error('Erro ao tentar carregar evento.', 'ERRO!')
          console.error(error);
        },
        complete: () => { this.spinner.hide() }
      });
    }
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }
  public cssValidator(campoForme: FormControl): any {
    return { 'is-invalid': campoForme.errors && campoForme.touched };

  }

  public salvarAlteracao(): void {
    this.spinner.show();


    // if (this.form.valid) {
    //   this.evento = { ... this.form.value };

    //       this.eventoService.postEvento(this.evento).subscribe(
    //         () => { this.toastr.success('Evento salvo com Sucesso!', 'Sucesso no POST') },
    //         (error: any) => {
    //           console.error(error);
    //           this.spinner.hide();
    //           this.toastr.error('Erro ao salvar evento', 'Erro POST' );
    //         },
    //         () => this.spinner.hide()
    //       );
    // if (this.form.valid) {
    //   if (this.estadoSalvar == 'post') {
    //     this.evento = { ... this.form.value };
    //     this.eventoService.postEvento(this.evento).subscribe(
    //       () => { this.toastr.success('Evento salvo com Sucesso!', 'Sucesso POST') },
    //       (error: any) => {
    //         console.error(error);
    //         this.spinner.hide();
    //         this.toastr.error('Erro ao salvar evento', 'Erro POST');
    //       },
    //       () => this.spinner.hide()
    //     );
    //   } else {
    //     this.evento = { id: this.evento.id, ... this.form.value };

    //     this.eventoService.putEvento(this.evento.id, this.evento).subscribe(
    //       () => { this.toastr.success('Evento editado e salvo com Sucesso!', 'Sucesso PUT') },
    //       (error: any) => {
    //         console.error(error);
    //         this.spinner.hide();
    //         this.toastr.error('Erro ao editar e salvar evento', 'Erro PUT');
    //       },
    //       () => this.spinner.hide()

    //     );
    //   }

    // }

    //Refatorado o codigo deixando dessa maneira por conta que é melhor na leitura.

    if (this.form.valid) {
      if (this.estadoSalvar == 'post') {
        this.evento = { ... this.form.value };
      } else {
        this.evento = { id: this.evento.id, ... this.form.value };
      }
      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        () => { this.toastr.success('Evento salvo com Sucesso!', 'Sucesso') },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }

}

