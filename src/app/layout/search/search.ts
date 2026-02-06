import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  categories: any[] = []; // 分類列表
  styles: any[] = [];     // 風格列表
  artworks: any[] = [];   // 篩選後的作品

  selectedCategory: number | null = null; // 選中的分類
  selectedStyle: number | null = null;    // 選中的風格

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // 初始化資料，載入分類與風格選項
    this.loadCategoriesAndStyles();
  }

  loadCategoriesAndStyles(): void {
    // 假設有其他 API 提供分類與風格資料
    // 擴展: 呼叫後端取得 category 和 style 清單
    this.categories = [
      { id: 1, name: '人物肖像' },
      { id: 2, name: '風景畫' },
      { id: 3, name: '抽象創作' }
    ];

    this.styles = [
      { id: 1, name: '寫實' },
      { id: 2, name: '印象派' },
      { id: 3, name: '水墨' }
    ];
  }

  // 搜尋作品
  searchArtworks(): void {
    // this.searchService.getArtworks(this.selectedCategory, this.selectedStyle)
    //   .subscribe(artworks => {
    //     this.artworks = artworks;
    //   });
  }
}
