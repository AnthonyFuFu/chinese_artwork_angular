import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { LeftSideBar } from '../left-side-bar/left-side-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [Header, LeftSideBar, Footer, RouterOutlet],
  templateUrl: './main.html',
})
export class Main {

}
