import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {

}