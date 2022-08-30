import {Component, OnInit } from '@angular/core'
import { delay } from 'rxjs'

import { KinopoiskService } from './services/kinopoisk.service'
import { IKinopoisk } from './services/kinopoisk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  movie!: IKinopoisk[]
  obj: Object = {}
  loader = false
  title = ''
  inputSearch = ''

  constructor(private kinopoiskServise: KinopoiskService) {}

  ngOnInit(): void {
    this.loader = true
    this.kinopoiskServise.getMoviePromo()
      .subscribe(response => {
        this.obj = response
        this.movie = Object.values(this.obj)[0]
        this.loader = false
      })
    this.title = 'Сериалы вышедшие в 2020-2022 с рейтингом Кинопоиска 7-10'
  }

  searchMovie() {
    this.loader = true
    this.movie = []
    this.title = ''

    this.kinopoiskServise.getMovieSearch(this.inputSearch)
      .pipe(delay(1000))
      .subscribe(response => {
        this.obj = response
        this.movie = Object.values(this.obj)[0]
        this.movie = this.movie.filter(movie => movie.description != null)
        //TODO В выборку не должны попадать результаты, у которых рейтинг rating.kp = 0 и description - null
        //  && item.rating?.kp !== 0 - новые фильмы выпадают!

        // this.movie.length ? this.title = 'Результат поиска' : this.title = 'Ничего не найдено'
        this.movie.length ? this.title = `Результат поиска по названию фильма ${this.inputSearch}` : this.title = 'Ничего не найдено'

        this.loader = false

      })

  }

}
