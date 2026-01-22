import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { LeftSideBar } from '../left-side-bar/left-side-bar';
import { Search } from '../search/search';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Header, Search, LeftSideBar],
  templateUrl: './main.html',
})
export class Main {

}
