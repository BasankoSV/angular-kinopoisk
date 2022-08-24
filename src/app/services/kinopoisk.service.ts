import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IKinopoisk} from "./kinopoisk";
import {HttpClient, HttpParams} from "@angular/common/http";

type SearchType = "movie" | "person" | "review" | "image" | "season"

@Injectable({
  providedIn: 'root'
})
export class KinopoiskService {

  URL = 'https://api.kinopoisk.dev/'
  API_TOKEN='RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS'
  search: SearchType = 'movie'

  constructor(private http: HttpClient) {
  }

  getMovieService():Observable<IKinopoisk[]> {

    return this.http.get<IKinopoisk[]>(
      `${this.URL}${this.search}?field=rating.kp&search=7-10&field=year&search=2020-2022&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS`)

    // return this.http.get<IKinopoisk[]>(
    //   `${this.URL}${this.search}?search='Ведьмак'&field='name'&isStrict=false&token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS`)


  }

  getMoviePromo():Observable<IKinopoisk[]> {

    return this.http.get<IKinopoisk[]>(
      `${this.URL}${this.search}?field=rating.kp&search=7-10&field=year&search=2020-2022&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=${this.API_TOKEN}`)
  }

}



// 'https://fakestoreapi.com/products?limit=5' - без params тоже работает
// params: new HttpParams({ fromString: 'limit=5'})
// params: new HttpParams({ fromObject: { limit: 5}})
// фильмы, актеры, отзывы, изображения, сезон
//TODO разобрать по параметрам, наглядно будет! Можно сделать форму поиска? Вынести в отдельное приложение!!!
// return this.http.get<IKinopoisk[]>('https://api.kinopoisk.dev/movie?field=rating.kp&search=7-10&field=year&search=2019-2022&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS')

//     return this.http.get<IKinopoisk[]>(
//       `${this.URL}${this.search}?field=rating.kp&search=7-10&field=year&search=2019-2022&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS`)

            // (`${this.URL}${this.search}
            // ?field=rating.kp
            // &search=7-10
            // &field=year
            // &search=2019-2022
            // &field=typeNumber
            // &search=2
            // &sortField=year
            // &sortType=1
            // &sortField=votes.imdb
            // &sortType=-1
            // &token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS`)

// return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
//   params: new HttpParams().append('limit', 0)
// })
