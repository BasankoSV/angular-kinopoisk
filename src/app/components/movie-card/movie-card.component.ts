import {Component, Input, OnInit} from '@angular/core';
import {IKinopoisk} from "../../services/kinopoisk";

// enum MType {
//   'movie' = 'фильм',
//   'tv-series' = 'сериал',
//   cartoon = 'мультфильм',
//   anime = 'аниме',
//   'animated-series' = 'анимационный сериал',
//   'tv-show' = 'тв-шоу'
// } - не смог сделать подстановку в HTML, чтобы сразу получать замену значения:  movieType = MType; {{ mType[movie.type] }}
//    сделал через pipes movieType, получилось очень просто и быстро!

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {


  @Input() movie!: IKinopoisk

  constructor() { }

  ngOnInit(): void { }

}
