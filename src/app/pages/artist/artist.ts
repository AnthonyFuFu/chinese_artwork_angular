import { Component, signal } from '@angular/core';
import { Main } from '../../layout/main/main';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-artist',
  imports: [Main, Footer],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist {
  protected readonly title = signal('chinese_artwork');

}
