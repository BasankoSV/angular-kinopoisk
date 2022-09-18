import { Component, EventEmitter, Output } from "@angular/core"

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})

export class MovieSearchComponent {

  public inputSearch = ''
  @Output() public onSearchMode: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onMovieNameSearch: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  searchMovie() {
    if (this.inputSearch.trim() === '') return
    this.onSearchMode.emit(true)
    this.onMovieNameSearch.emit(this.inputSearch)
    this.inputSearch = ''

  }
}
