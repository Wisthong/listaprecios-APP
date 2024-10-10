import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
} from '@ionic/angular/standalone';
import { PreciosService } from '../services/precios.service';
import { Result } from '../model/precio';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    FormsModule,
    JsonPipe,
  ],
})
export class HomePage {
  private timeout: any;
  public inputValue: number = 0;
  public objectResult!: Result;

  private readonly preciosSvc = inject(PreciosService);

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
      },
      (resFail) => {
        alert('Item no catalogado, por favor dirigite con l@s asesores');
        console.log(resFail);
      }
    );
    console.log(`Valor ingresado: ${this.inputValue}`);
    this.inputValue = 0; // Limpiar el input
  }
}
