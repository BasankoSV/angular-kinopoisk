import { Component, Input } from "@angular/core"
import { IKinopoisk } from "./services/kinopoisk"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @Input() public isSearchModeApp = false
  @Input() public titleApp = ''
  @Input() public movieApp: IKinopoisk[] = []
  @Input() public loader!: boolean

  reloadPage() {
    window.location.reload()
  }

  updateSearchMode(searchMode: boolean) {
    this.isSearchModeApp = searchMode
  }

  loaderHandler(loaderPromo: boolean) {
    this.loader = loaderPromo
  }

  titleHandler(titleData: string) {
    this.titleApp = titleData
  }

  movieHandler(movieData: IKinopoisk[]) {
    this.movieApp = movieData
  }

}


// statisticsLog() {
//   console.group('Статистика по полученным данным')
//   console.log('Получено: ' + this.data.docs.length + ' объектов')
//   console.log('Всего найдено: ', this.data.total + ' объектов')
//   console.log('Лимит выдачи: ', this.data.limit + ' объектов на страницу')
//   console.log('Текущая страница номер: ', this.data.page)
//   console.log('Всего страниц: ', this.data.pages + ' штук')
//   console.groupEnd()
// }
