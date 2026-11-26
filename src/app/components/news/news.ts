import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NewsItem } from '../../common/models/item';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, CarouselModule],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News implements OnInit, AfterViewInit, OnDestroy {
  @Input() sectionTitle: string = '最新消息';
  @Input() newsItems: NewsItem[] = [];
  @Input() viewAllLink: string | null = null;
  @Input() viewAllText: string = '查看所有消息';

  // 控制狀態
  isBrowser: boolean;
  isCarouselReady = false;
  private initTimeout: any = null;
  private autoplayTimeout: any = null;

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    navText: ['', ''],
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
    autoplay: false,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    items: 3,
    smartSpeed: 200,
    slideTransition: 'linear',
    margin: 20
  };

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // 僅在瀏覽器環境中運行
    if (!this.isBrowser) {
      return;
    }

    // 確保初始化靜態布局
    this.isCarouselReady = false;
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initTimeout = setTimeout(() => {
        this.isCarouselReady = true;
        this.cdr.detectChanges();

        // 添加 visible 類
        setTimeout(() => {
          const carouselContainer = document.querySelector('.carousel-container');
          if (carouselContainer) {
            carouselContainer.classList.add('visible');
          }
        }, 100);

        this.autoplayTimeout = setTimeout(() => {
          this.carouselOptions = {
            ...this.carouselOptions,
            autoplay: true
          };
          this.cdr.detectChanges();
        }, 2000);
      }, 500);
    }
  }

  ngOnDestroy() {
    // 清理定時器
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
    }
    if (this.autoplayTimeout) {
      clearTimeout(this.autoplayTimeout);
    }
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

  // 處理圖片載入錯誤
  handleImageError(event: any) {
    event.target.src = 'assets/images/news/news1.jpg';
  }
}