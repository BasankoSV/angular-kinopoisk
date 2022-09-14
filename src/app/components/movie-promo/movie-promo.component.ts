import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { IData, IKinopoisk } from "../../services/kinopoisk"
import { KinopoiskService } from "../../services/kinopoisk.service"
import { getMovieType, getRandomNumber, statisticsLog } from "../../utils/utilities"

@Component({
  selector: 'app-movie-promo',
  templateUrl: './movie-promo.component.html',
  styleUrls: ['./movie-promo.component.scss']
})

export class MoviePromoComponent implements OnInit {

  private data!: IData
  private preTitle = ''

  private rating = '7-10'
  private year = '2022-2022'
  private movieTypeNumber = getRandomNumber(1, 7).toString()

  private paramsPromo =
    '&field=rating.kp&search=' + this.rating +
    '&field=year&search=' + this.year +
    '&field=typeNumber&search=' + this.movieTypeNumber +
    '&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&'

  public movie: IKinopoisk[] = []
  public title = ''
  public numberPage = 1

  @Output() public onMovie: EventEmitter<IKinopoisk[]> = new EventEmitter<IKinopoisk[]>()
  @Output() public onTitle: EventEmitter<string> = new EventEmitter<string>()
  @Output() public onLoader: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onEmptyData: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() public onTotalPages: EventEmitter<number> = new EventEmitter<number>()
  @Output() public onCurrentPage: EventEmitter<number> = new EventEmitter<number>()

  constructor(private kinopoiskService: KinopoiskService) { }

  ngOnInit(): void {
    this.onLoader.emit(true)
    this.getPromoData()
  }

  getPromoData() {
    this.preTitle = getMovieType(this.movieTypeNumber) +
      ' вышедшие в ' + this.year + ' с рейтингом Кинопоиска ' + this.rating
    this.kinopoiskService.getData('', this.numberPage, this.paramsPromo)
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs

        if (this.data.docs.length === 0) {
          this.title = 'По запросу: ' + this.preTitle + ' ничего не найдено!'
          this.onEmptyData.emit(true)
        } else {
          this.title = this.preTitle
          this.onEmptyData.emit(false)
          this.onTotalPages.emit(this.data.pages)
          this.onMovie.emit(this.movie)
        }

        this.onLoader.emit(false)
        this.onTitle.emit(this.title)


        statisticsLog("PROMO", this.data.docs, this.data.total, this.data.limit, this.data.page, this.data.pages)
      })
  }

}
