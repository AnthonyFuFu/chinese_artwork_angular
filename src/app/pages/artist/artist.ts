import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist {
  protected readonly title = signal('chinese_artwork');

}
