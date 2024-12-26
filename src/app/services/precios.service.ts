import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Precio, Result } from '../model/precio';

@Injectable({
  providedIn: 'root',
})
export class PreciosService {
  private readonly _http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getItemPublic(id: number): Observable<Result> {
    return this._http.get<Precio>(this.apiUrl + 'publico/' + id).pipe(
      map(({ results }) => {
        return results[0];
      })
    );
  }
}
