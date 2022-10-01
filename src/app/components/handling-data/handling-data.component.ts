import { Component, Input, OnInit } from "@angular/core"
import { IData, IKinopoisk } from "../../services/kinopoisk"
import { KinopoiskService } from "../../services/kinopoisk.service"
import { getMovieType, getRandomNumber } from "../../utils/utilities"
import { ErrorService } from "../../services/error.service"

enum queryParams {
  API_TOKEN = 'token=RXJ4PEZ-E8B4E83-NJQ1P4R-G8ZFGPS',
  field = '&field=',
  sortField = '&sortField=',
  sortType = '&sortType=',
  search = '&search=',
  isStrict = '&isStrict=false',
  page = '&page=',
  limit = '&limit='
}

@Component({
  selector: 'app-handling-data',
  templateUrl: './handling-data.component.html',
  styleUrls: ['./handling-data.component.scss']
})
export class HandlingDataComponent implements OnInit {

  public movie: IKinopoisk[] = []
  public loader!: boolean
  public totalPages!: number
  public queryString = ''
  public ratingKP = '7-10'
  public releaseYear = '2022-2022'
  public limitMovie = 12
  public currentPageFromData = 1
  public title = ''

  private data!: IData
  private movieTypeNumber = getRandomNumber(1, 7).toString()

  @Input() public isSearchMode = false
  @Input() public movieNameSearch = ''
  @Input() public currentPageFromPagination = 1

  constructor(
    private kinopoiskService: KinopoiskService,
    public errorService: ErrorService
    ) { }

  reloadPage() {
    window.location.reload()
  }

  ngOnInit(): void {
    this.getDataForAll()
  }

  queryStringPromo():string {
    return this.queryString =
      queryParams.API_TOKEN +
      queryParams.field + 'rating.kp' + queryParams.search + this.ratingKP +
      queryParams.field + 'year' + queryParams.search + this.releaseYear +
      queryParams.field + 'typeNumber' + queryParams.search + this.movieTypeNumber +
      queryParams.sortField + 'year' + queryParams.sortType + '1' +
      // queryParams.sortField + 'votes.imb' + queryParams.sortType + '-1' +  - повторяются фильмы?!
      queryParams.limit + this.limitMovie +
      queryParams.page + this.currentPageFromPagination
  }
  queryStringSearch(searchMovieName: string):string {
      return this.queryString =
        queryParams.API_TOKEN +
        queryParams.field + 'name' + queryParams.search + searchMovieName +
        queryParams.isStrict +
        queryParams.sortField + 'year' + queryParams.sortType + '1' +
        queryParams.limit + this.limitMovie +
        queryParams.page + this.currentPageFromPagination
  }

  getDataForAll() {
    this.loader = true

    let query: string
    let titleOK: string
    let titleNotFound: string

    if (this.isSearchMode) {
      query = this.queryStringSearch(this.movieNameSearch)
      titleOK = `Результат поиска по названию фильма: ${this.movieNameSearch}`
      titleNotFound = `По названию фильма: ${this.movieNameSearch}, ничего не найдено!`
    } else {
      query = this.queryStringPromo()
      titleOK = getMovieType(this.movieTypeNumber) +
        ' вышедшие в ' + this.releaseYear + ' с рейтингом Кинопоиска ' + this.ratingKP
      titleNotFound = `По запросу: ${titleOK} ничего не найдено!`
    }

    this.kinopoiskService.getData(query)
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        if (this.data.docs.length === 0) {
          this.title = titleNotFound
          this.currentPageFromData = 0
          this.totalPages = 0
        } else {
          this.title = titleOK
          this.currentPageFromData = this.data.page
          this.totalPages = this.data.pages
        }
          this.loader = false
      }, () => this.loader = false)
  }

  searchModeHandler(searchMode: boolean) {
    this.isSearchMode = searchMode
  }

  movieNameSearchHandler(movieNameSearch: string) {
    this.movieNameSearch = movieNameSearch
    this.currentPageFromPagination = 1
    this.getDataForAll()
  }

  changeCurrentPageHandler(currentPage: number) {
    this.currentPageFromPagination = currentPage
    this.getDataForAll()
  }
}
