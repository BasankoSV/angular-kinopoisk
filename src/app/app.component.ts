import {Component, OnInit} from '@angular/core';
import {KinopoiskService} from "./services/kinopoisk.service";
import {IKinopoisk} from "./services/kinopoisk";
import {delay, tap} from "rxjs";
import {logExperimentalWarnings} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";

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
      .pipe(delay(1000))//, tap( () => this.title = 'Результат поиска')
      .subscribe(response => {
        this.obj = response
        this.movie = Object.values(this.obj)[0]

        this.movie = this.movie.filter(item => item.description != null)
        //TODO В выборку не должны попадать результаты, у которых рейтинг rating.kp = 0 и description - null
        //  && item.rating?.kp !== 0 - новые фильмы выпадают!

        this.loader = false
        this.title = 'Результат поиска'
      })

  }

}
