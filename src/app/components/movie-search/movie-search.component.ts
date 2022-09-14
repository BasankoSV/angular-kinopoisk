import { Component, EventEmitter, Output } from "@angular/core"
import { IData, IKinopoisk } from "../../services/kinopoisk"
import { KinopoiskService } from "../../services/kinopoisk.service"
import { statisticsLog } from "../../utils/utilities"

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})

export class MovieSearchComponent {

  private data!: IData
  public movie: IKinopoisk[] = []
  public title = ''
  public inputSearch = ''
  public movieNameSearch = ''
  public numberPage = 1

  @Output() public onMovie: EventEmitter<IKinopoisk[]> = new EventEmitter<IKinopoisk[]>()
  @Output() public onTitle: EventEmitter<string> = new EventEmitter<string>()
  @Output() public onLoader: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onSearchMode: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onEmptyData: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onTotalPages: EventEmitter<number> = new EventEmitter<number>()

  constructor(private kinopoiskService: KinopoiskService) { }

  searchMovie() {
    if (this.inputSearch.trim() === '') return

    this.onLoader.emit(true)
    this.onSearchMode.emit(true)
    this.movieNameSearch = this.inputSearch

    this.kinopoiskService.getData(this.inputSearch.trim(), this.numberPage)
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        // this.movie = this.movie.filter(movie => movie.description != null)
        this.inputSearch = ''

        if (this.data.docs.length === 0) {
          this.title = `По названию фильма: ${this.movieNameSearch}, ничего не найдено!`
          this.onEmptyData.emit(true)
        } else {
          this.title = `Результат поиска по названию фильма: ${this.movieNameSearch}`
          this.onEmptyData.emit(false)
          this.onTotalPages.emit(this.data.pages)
          this.onMovie.emit(this.movie)
        }

        this.onLoader.emit(false)
        this.onTitle.emit(this.title)


        statisticsLog("SEARCH", this.data.docs, this.data.total, this.data.limit, this.data.page, this.data.pages)

      })
  }
}
