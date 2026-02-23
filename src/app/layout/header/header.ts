import { Component } from '@angular/core';
import { Search } from '../search/search';
import { Breadcrumb } from './../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-header',
  imports: [Breadcrumb,Search],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
