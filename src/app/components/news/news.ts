import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  type: 'event' | 'news' | 'exhibition' | 'update';
  date: string;
  imageUrl?: string;
  link?: string;
  linkText?: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, CarouselModule],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News implements OnInit {
  @Input() sectionTitle: string = '最新消息';
  @Input() newsItems: NewsItem[] = [];
  @Input() viewAllLink: string | null = null;
  @Input() viewAllText: string = '查看所有消息';

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['&#8249;', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  ngOnInit() {
    // 初始化任何需要的配置
  }
  
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
}