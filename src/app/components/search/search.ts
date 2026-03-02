import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-search',
  standalone: true, // 如果你使用的是 standalone 元件
  imports: [FormsModule], // 導入 FormsModule
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (this.searchTerm && this.searchTerm.trim()) {
      console.log('搜尋:', this.searchTerm);
      // 執行搜尋邏輯
    }
  }
}