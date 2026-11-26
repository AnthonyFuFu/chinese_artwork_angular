import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CardItem } from '../../common/models/item';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})

export class Card {
  @Input() cardItems: CardItem[] = [];
  
  // 預設圖片路徑
  private defaultImage = 'assets/images/news/news1.jpg';

  getTypeLabel(type: string): string {
    switch (type) {
      case 'event': return '活動';
      case 'news': return '消息';
      case 'exhibition': return '展覽';
      case 'update': return '更新';
      default: return '公告';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // 處理圖片載入錯誤
  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }
}
