import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-footer',
  imports: [RouterLink, MatIconModule, FormsModule],
  templateUrl: './show-footer.html',
  styleUrl: './show-footer.css',
})
export class ShowFooter {

}
