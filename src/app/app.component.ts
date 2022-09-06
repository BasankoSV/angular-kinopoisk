import { Component, OnInit } from '@angular/core'

import { KinopoiskService } from './services/kinopoisk.service'
import { IData, IKinopoisk } from './services/kinopoisk'

type TitleType = 'promo' | 'promo_error' | 'search' | 'search_error'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public data!: IData
  public movie: IKinopoisk[] = []
  public loader = false
  public title: TitleType = 'promo'
  public inputSearch = ''
  public isSearchMode = false
  public movieNameSearch = ''

  constructor(public kinopoiskService: KinopoiskService) { }

  ngOnInit(): void {
    this.loader = true
    this.kinopoiskService.getData()
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        this.loader = false
        this.data.docs.length === 0 ? this.title = 'promo_error' : this.title = 'promo'
        this.statisticsLog()
      })
  }

  searchMovie() {
    if (this.inputSearch.trim() === '') return
    this.loader = true
    this.movie = []
    this.title = 'search'
    this.movieNameSearch = this.inputSearch

    this.kinopoiskService.getData(this.inputSearch.trim())
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        // this.movie = this.movie.filter(movie => movie.description != null)
        this.loader = false
        this.inputSearch = ''
        this.isSearchMode = true
        this.data.docs.length === 0 ? this.title = 'search_error' : this.title = 'search'
        this.statisticsLog()
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

}
