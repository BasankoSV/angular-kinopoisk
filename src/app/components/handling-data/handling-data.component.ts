import { Component, Input, OnInit } from "@angular/core"
import { IKinopoisk } from "../../services/kinopoisk"

@Component({
  selector: 'app-handling-data',
  templateUrl: './handling-data.component.html',
  styleUrls: ['./handling-data.component.scss']
})
export class HandlingDataComponent implements OnInit {

  @Input() public title = ''
  @Input() public movie: IKinopoisk[] = []
  @Input() public loader!: boolean
  @Input() public emptyData!: boolean
  @Input() public isSearchModeApp = false // для кнопки "На главную"
  @Input() public totalPagesHD!: number

  constructor() { }

  reloadPage() {
    window.location.reload()
  }

  ngOnInit(): void {
  }

  updateSearchMode(searchMode: boolean) {
    this.isSearchModeApp = searchMode
  }

  loaderHandler(loaderPromo: boolean) {
    this.loader = loaderPromo
  }

  titleHandler(titleData: string) {
    this.title = titleData
  }

  movieHandler(movieData: IKinopoisk[]) {
    this.movie = movieData
  }

  dataHandler(emptyData: boolean) {
    this.emptyData = emptyData
  }

  totalPagesHandler(totalPages: number) {
    this.totalPagesHD = totalPages
  }

}

// TODO: подумать: не избыточно ли было вводить emptyData? Можно просто проверять передаваемый movie!
