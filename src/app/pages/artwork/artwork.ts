import { Component } from '@angular/core';
import { Main } from '../../layout/main/main';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-artwork',
  imports: [Main, Footer],
  templateUrl: './artwork.html',
  styleUrl: './artwork.css',
})
export class Artwork {

}
