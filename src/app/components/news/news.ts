import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

  // 預設圖片路徑
  private defaultImage1 = '/assets/images/news/news1.jpg';
  private defaultImage2 = '/assets/images/news/news2.jpg';

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
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    margin: 20,
    smartSpeed: 800,
    // 關鍵：添加下面的選項
    lazyLoad: false,
    lazyLoadEager: 1,
    items: 3  // 顯示默認項目數
  };

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // 確保 newsItems 有默認值
    if (!this.newsItems || this.newsItems.length === 0) {
      this.newsItems = this.getDefaultNewsItems();
    }
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

  // 提供預設新聞項目
  private getDefaultNewsItems(): NewsItem[] {
    return [
      {
        id: '1',
        title: '國際藝術大師系列講座',
        content: '我們邀請到國際知名藝術家王大師來分享他的創作歷程與技法。講座將探討當代藝術的發展趨勢以及藝術創作的靈感來源。',
        type: 'event',
        date: '2023-12-15',
        imageUrl: this.defaultImage1,
        link: '/events/1',
        linkText: '預約講座'
      },
      {
        id: '2',
        title: '2024年春季特展：色彩的力量',
        content: '本展覽將展出來自全球的50件精選作品，探索色彩在不同文化和時代中的表現與象徵意義。',
        type: 'exhibition',
        date: '2024-03-20',
        imageUrl: this.defaultImage2,
        link: '/exhibition/spring-2024',
        linkText: '展覽詳情'
      },
      {
        id: '3',
        title: '藝術詞典新增200個專業術語',
        content: '為了幫助藝術愛好者更好地理解藝術專業知識，我們的藝術詞典新增了200個專業術語的詳細解釋。',
        type: 'update',
        date: '2023-11-30',
        imageUrl: this.defaultImage1,
        link: '/dictionary/updates',
        linkText: '查看更新'
      },
      {
        id: '4',
        title: '新合作夥伴：國立美術館',
        content: '我們很榮幸宣布與國立美術館達成戰略合作夥伴關係，未來將共同舉辦更多高品質的藝術活動與展覽。',
        type: 'news',
        date: '2023-12-05',
        imageUrl: this.defaultImage2,
        link: '/news/partnership',
        linkText: '了解更多'
      }
    ];
  }

  // 處理圖片載入錯誤
  handleImageError(event: any) {
    event.target.src = '/assets/images/news/news1.jpg';
  }
}