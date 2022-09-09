import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { IData, IKinopoisk } from "../../services/kinopoisk"
import { KinopoiskService } from "../../services/kinopoisk.service"

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
  private movieTypeNumber = this.getRandomNumber(1, 7).toString()

  private paramsPromo =
    '&field=rating.kp&search=' + this.rating +
    '&field=year&search=' + this.year +
    '&field=typeNumber&search=' + this.movieTypeNumber +
    '&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&'

  public movie: IKinopoisk[] = []
  public title = ''

  @Output() public onMovie: EventEmitter<IKinopoisk[]> = new EventEmitter<IKinopoisk[]>()
  @Output() public onTitle: EventEmitter<string> = new EventEmitter<string>()
  @Output() public onLoader: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private kinopoiskService: KinopoiskService) { }

  ngOnInit(): void {
    this.onLoader.emit(true)
    this.getPromoData()
  }

  getPromoData() {
    this.preTitle = this.getMovieType(this.movieTypeNumber) +
      ' вышедшие в ' + this.year + ' с рейтингом Кинопоиска ' + this.rating
    this.kinopoiskService.getData('', this.paramsPromo)
      .subscribe(response => {
        this.data = response
        this.movie = this.data.docs
        this.data.docs.length === 0
          ? this.title = 'По запросу: ' + this.preTitle + ' ничего не найдено!'
          : this.title = this.preTitle
        this.onLoader.emit(false)
        this.onTitle.emit(this.title)
        this.onMovie.emit(this.movie)
      })
  }

  getRandomNumber(min: number, max:number):number {
    let randomNumber = 0
    randomNumber = Math.round(Math.random() * (max - min) + min)
    randomNumber === 6 ? randomNumber = 7 : randomNumber // exclude number 6
    return randomNumber
  }

  getMovieType(movieType: string): string {
    switch (movieType) {
      case '1': movieType = 'Фильмы'
        break
      case '2': movieType = 'Сериалы'
        break
      case '3': movieType = 'Мультфильмы'
        break
      case '4': movieType = 'Аниме'
        break
      case '5': movieType = 'Анимационные сериалы'
        break
      case '6': movieType = 'ТВ-шоу'
        break
      case '7': movieType = 'Мини-сериалы'
        break
      default: movieType = 'тип не указан'
    }
    return movieType
  }

}
