import { Injectable } from "@angular/core"
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http"
import {catchError, Observable, throwError} from "rxjs"
import { IData } from "./kinopoisk"
import { ErrorService } from "./error.service"

type SearchType = 'movie' | 'person' | 'review' | 'image' | 'season'

@Injectable({
  providedIn: 'root'
})

export class KinopoiskService {

  private URL = 'https://api.kinopoisk.dev/'
  private search: SearchType = 'movie'

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }


  getData(queryString: string): Observable<IData> {
    return this.http.get<IData>(
      `${this.URL}${this.search}`,
      {params: new HttpParams(
          {fromString: queryString}
        )})
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)            // (error.error?.message)
    return throwError(() => error.message)  // error.error?.message
  }

}
// TODO this.search - вынести в параметры и передавать
// TODO разобраться с ошибками...
