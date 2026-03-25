import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowHeader } from './../show-header/show-header';
import { ShowFooter } from '../show-footer/show-footer';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [ShowHeader, RouterOutlet, ShowFooter],
  templateUrl: './show.html',
  styleUrl: './show.css',
})
export class Show {

}
