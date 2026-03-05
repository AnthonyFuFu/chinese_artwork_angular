import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-search',
  standalone: true, // 如果使用獨立組件
  imports: [CommonModule, ReactiveFormsModule], // 添加必要的依賴
  templateUrl: './character-search.html',
  styleUrl: './character-search.css',
})
export class CharacterSearch {

}
