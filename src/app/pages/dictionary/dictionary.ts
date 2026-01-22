import { Component } from '@angular/core';
import { Main } from '../../layout/main/main';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-dictionary',
  imports: [Main, Footer],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.css',
})
export class Dictionary {

}
