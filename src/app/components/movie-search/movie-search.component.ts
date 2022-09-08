import { Component, EventEmitter, Output } from "@angular/core"
import { IData, IKinopoisk } from "../../services/kinopoisk"
import { KinopoiskService } from "../../services/kinopoisk.service"

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

  @Output() public onMovie: EventEmitter<IKinopoisk[]> = new EventEmitter<IKinopoisk[]>()
  @Output() public onTitle: EventEmitter<string> = new EventEmitter<string>()
  @Output() public onLoader: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onSearchMode: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private kinopoiskService: KinopoiskService) { }

  searchMovie() {
    if (this.inputSearch.trim() === '') return

    this.onLoader.emit(true)
    this.onSearchMode.emit(true)
    this.movieNameSearch = this.inputSearch

    this.kinopoiskService.getData(this.inputSearch.trim())
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        // this.movie = this.movie.filter(movie => movie.description != null)
        this.inputSearch = ''
        this.data.docs.length === 0
          ? this.title = `По названию фильма: ${this.movieNameSearch}, ничего не найдено!`
          : this.title = `Результат поиска по названию фильма: ${this.movieNameSearch}`
        this.onLoader.emit(false)
        this.onTitle.emit(this.title)
        this.onMovie.emit(this.movie)
        this.onLoader.emit(false)
      })
  }
}
