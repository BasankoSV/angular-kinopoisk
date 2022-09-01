import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IKinopoisk} from "./kinopoisk";
import {HttpClient, HttpParams} from "@angular/common/http";

type SearchType = "movie" | "person" | "review" | "image" | "season"

@Injectable({
  providedIn: 'root'
})
export class KinopoiskService {

  private URL = 'https://api.kinopoisk.dev/'
  private API_TOKEN = 'RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS'
  private search: SearchType = 'movie'

  public rating = '7-10'
  public year = '2022-2022'
  public movieTypeNumber = this.getRandomNumber(1, 7).toString()

  constructor(private http: HttpClient) { }

  getRandomNumber(min: number, max:number):number {
    let temp = 0
    temp = Math.round(Math.random() * (max - min) + min)
    temp === 6 ? temp = 7 : temp
    return temp
  }

  getMoviePromo(): Observable<IKinopoisk[]> {

    return this.http.get<IKinopoisk[]>(
      `${this.URL}${this.search}`, {
        params: new HttpParams(
          {fromString:
              'token=' + this.API_TOKEN +
              '&field=rating.kp&search=' + this.rating +
              '&field=year&search=' + this.year +
              '&field=typeNumber&search=' + this.movieTypeNumber +
              '&sortField=year&sortType=1' +
              '&sortField=votes.imdb&sortType=-1&' +
              '&limit=12'
        })
      }
    )
  }

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
}

// field=typeNumber&search=2: сериалы
// field=rating.kp&search=7-10: рейтинг КП от 7 до 10
// field=year&search=2017-2020: выпущены с 2017 по 2020
// sortField=year&sortType=1&sortField=votes.imdb&sortType=-1: При этом мы ходим чтобы они были осортированы по году
// в порядке возрастания, но при этом были отсортированы по голосам на imdb в порядке убывания.
// limit=10: default
// isStrict=false - строгий поиск true


// 'https://fakestoreapi.com/products?limit=5' - без params тоже работает
// params: new HttpParams({ fromString: 'limit=5'})
// params: new HttpParams({ fromObject: { limit: 5}})
// TODO разобрать по параметрам, наглядно будет! Можно сделать форму поиска? Вынести в отдельное приложение - сделал!!!

// return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
//   params: new HttpParams().append('limit', 0)
// })

// typeNumber - string
// 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show) - почти нет | 7 (mini-series) мини-сериал;
