import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonText,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { PreciosService } from '../services/precios.service';
import { Result } from '../model/precio';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonText,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    FormsModule,
    DecimalPipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    CurrencyPipe,
  ],
})
export class HomePage implements OnInit {
  private timeout: any;
  public inputValue: any;
  public objectResult!: Result;
  public anio: number = 0;
  httpError = {
    mensaje: '',
    url: '',
  };

  private readonly preciosSvc = inject(PreciosService);
  private readonly toastrSvc = inject(ToastrService);

  ngOnInit(): void {
    const date = new Date();
    this.anio = date.getUTCFullYear();
  }

  onInputChange(event: any) {
    // Reiniciar el timeout si el usuario sigue escribiendo
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.showValue();
    }, 3000);
  }

  showValue() {
    this.preciosSvc.getItemPublic(this.inputValue!).subscribe(
      (resOk) => {
        this.objectResult = resOk;
        console.log(resOk);
        setTimeout(() => {
          this.objectResult = {
            DESCRIPCION: '',
            ID_ITEM: '',
            ID_LIPRE1: '',
            PRECIO_MIN_1: 0,
          };
        }, 10 * 1000);
      },
      (resFail: HttpErrorResponse) => {
        this.objectResult = {
          DESCRIPCION: '',
          ID_ITEM: '',
          ID_LIPRE1: '',
          PRECIO_MIN_1: 0,
        };

        this.toastrSvc.error(
          'Item no catalogado, por favor dirigite con l@s asesores',
          'Error'
        );
        // alert('');
        this.httpError = {
          mensaje: resFail.message,
          url: resFail.url!,
        };
        console.log(resFail);
      }
    );
    console.log(`Valor ingresado: ${this.inputValue}`);
    this.inputValue = 0; // Limpiar el input
  }
}
