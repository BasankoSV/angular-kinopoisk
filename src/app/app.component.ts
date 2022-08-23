import { Component } from '@angular/core';
import {KinopoiskService} from "./services/kinopoisk.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-kinopoisk';

  constructor(private kinopoiskServise: KinopoiskService) {}



}
