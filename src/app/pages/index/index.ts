import { Component } from '@angular/core';
import { Main } from '../../layout/main/main';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [Main, Footer],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

}
