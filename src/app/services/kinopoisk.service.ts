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
  API_TOKEN = 'RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS'
  search: SearchType = 'movie'

  constructor(private http: HttpClient) { }

  getMovieSearch(movieName: string): Observable<IKinopoisk[]> {
    return this.http.get<IKinopoisk[]>(
      `${this.URL}${this.search}`, {
        params: new HttpParams(
          {fromString:
              `token=${this.API_TOKEN}&field=name&search=${movieName}&sortField=year&sortType=1&isStrict=false&limit=12`
          })
      }
    )
  }

  getMoviePromo(): Observable<IKinopoisk[]> {

    return this.http.get<IKinopoisk[]>(
      `${this.URL}${this.search}`, {
        params: new HttpParams(
          {fromString:
              `field=rating.kp&search=7-10&field=year&search=2019-2022&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=${this.API_TOKEN}&limit=12`
        })
      }
    )

  }



}

// field=typeNumber&search=2: сериалы
// field=rating.kp&search=7-10: рейтинг КП от 7 до 10
// field=year&search=2017-2020: выпущены с 2017 по 2020
// sortField=year&sortType=1&sortField=votes.imdb&sortType=-1: При этом мы ходим чтобы они были осортированы по году в порядке возрастания, но при этом были отсортированы по голосам на imdb в порядке убывания.
// limit=10: default
// isStrict=false - строгий поиск true


// 'https://fakestoreapi.com/products?limit=5' - без params тоже работает
// params: new HttpParams({ fromString: 'limit=5'})
// params: new HttpParams({ fromObject: { limit: 5}})
// фильмы, актеры, отзывы, изображения, сезон
//TODO разобрать по параметрам, наглядно будет! Можно сделать форму поиска? Вынести в отдельное приложение - сделал!!!

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
