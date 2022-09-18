import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable } from "rxjs"
import { IData } from "./kinopoisk"

type SearchType = 'movie' | 'person' | 'review' | 'image' | 'season'

@Injectable({
  providedIn: 'root'
})

export class KinopoiskService {

  private URL = 'https://api.kinopoisk.dev/'
  private search: SearchType = 'movie'

  constructor(private http: HttpClient) { }


  getData(queryString: string): Observable<IData> {
    return this.http.get<IData>(
      `${this.URL}${this.search}`,
      {params: new HttpParams(
          {fromString: queryString}
        )})
  }

}
// TODO this.search - вынести в параметры и передавать
