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
  private API_TOKEN = 'token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS'
  private search: SearchType = 'movie'

  public movieLimit = 15

  private paramsForAll =
    this.API_TOKEN +
    '&limit=' + this.movieLimit

  private paramsSearchByName =
    this.paramsForAll +
    '&sortField=year&sortType=1' +
    '&isStrict=false'
  private queryString = ''

  constructor(private http: HttpClient) { }

  getData(searchMovieName: string, paramsPromo?: string): Observable<IData> {
    if (searchMovieName) {
      this.queryString = this.paramsSearchByName + '&field=name&search='+ searchMovieName
    } else {
      this.queryString = this.paramsForAll + paramsPromo
    }

    return this.http.get<IData>(
        `${this.URL}${this.search}`,
        {params: new HttpParams(
            {fromString: this.queryString}
          )})
  }

}
// TODO this.search - вынести в параметры и передавать
