import {Component, Input, OnInit} from '@angular/core';
import {IKinopoisk} from "../../services/kinopoisk";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: IKinopoisk

  constructor() { }

  ngOnInit(): void {
  }

}
