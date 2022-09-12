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
// TODO: вынести все вспомогательные функции в утилиты! Эту тоже взять с собой!
