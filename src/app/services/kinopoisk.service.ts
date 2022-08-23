import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IKinopoisk} from "./kinopoisk";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KinopoiskService {

  constructor(
    private http: HttpClient
  ) { }

  getMovie():Observable<IKinopoisk[]> {
    return this.http.get<IKinopoisk[]>('https://api.kinopoisk.dev/movie?field=rating.kp&search=7-10&field=year&search=2019-2022&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS')
    //TODO разобрать по параметрам, наглядно будет! Можно сделать форму поиска? Вынести в отдельное приложение!!!
  }
}
// 'https://fakestoreapi.com/products?limit=5' - без params тоже работает
// params: new HttpParams({ fromString: 'limit=5'})
// params: new HttpParams({ fromObject: { limit: 5}})

