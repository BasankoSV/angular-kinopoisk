import { Component, OnInit } from '@angular/core'

import { KinopoiskService } from './services/kinopoisk.service'
import {IData, IKinopoisk} from './services/kinopoisk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data!: IData
  movie: IKinopoisk[] = []
  obj: Object = {}
  loader = false
  title = ''
  inputSearch = ''

  constructor(private kinopoiskService: KinopoiskService) {}

  ngOnInit(): void {
    this.loader = true
    this.kinopoiskService.getData('promo')
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        this.loader = false
        this.statisticsLog()
      })
    // this.title = '<Сериалы> вышедшие в <2020-2022> с рейтингом Кинопоиска <7-10>'
    this.title = this.movieTypeNumberToString(this.kinopoiskService.movieTypeNumber) +
                ' вышедшие в ' + this.kinopoiskService.year +
                ' с рейтингом Кинопоиска ' + this.kinopoiskService.rating
  }

  searchMovie() {
    if (this.inputSearch.trim() === '') return
    this.loader = true
    this.movie = []
    this.title = ''

    this.kinopoiskService.getData('movie',this.inputSearch.trim())
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        this.movie = this.movie.filter(movie => movie.description != null)
        this.movie.length
          ? this.title = `Результат поиска по названию фильма ${this.inputSearch}`
          : this.title = 'Ничего не найдено'
        this.loader = false
        this.inputSearch = ''
      })
  }

  statisticsLog() {
    console.group('Статистика по полученным данным')
    console.log('Получено: ' + this.data.docs.length + ' объектов')
    console.log('Всего найдено: ', this.data.total + ' объектов')
    console.log('Лимит выдачи: ', this.data.limit + ' объектов на страницу')
    console.log('Текущая страница номер: ', this.data.page)
    console.log('Всего страниц: ', this.data.pages + ' штук')
    console.groupEnd()
  }

  movieTypeNumberToString(movieType:string) {
    switch (movieType) {
      case '1': movieType = 'Фильмы';
        break;
      case '2': movieType = 'Сериалы';
        break;
      case '3': movieType = 'Мультфильмы';
        break
      case '4': movieType = 'Аниме';
        break;
      case '5': movieType = 'Анимационные сериалы';
        break;
      case '6': movieType = 'ТВ-шоу';
        break;
      case '7': movieType = 'Мини-сериалы';
        break;
      default: movieType = 'Тип не указан';
    }
    return movieType
  }

}


// ngOnInit(): void {
//   this.loader = true
//   this.kinopoiskService.getData('promo')
//     .subscribe(response => {
//       this.obj = response
//       this.movie = Object.values(this.obj)[0]
//       this.loader = false
//     })
//   // this.title = '<Сериалы> вышедшие в <2020-2022> с рейтингом Кинопоиска <7-10>'
//   this.title = this.movieTypeNumberToString(this.kinopoiskService.movieTypeNumber) +
//     ' вышедшие в ' + this.kinopoiskService.year +
//     ' с рейтингом Кинопоиска ' + this.kinopoiskService.rating
// }
