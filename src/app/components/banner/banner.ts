import { Component, Input, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

export interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, CarouselModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})
export class Banner implements OnInit, AfterViewInit, OnDestroy {
  @Input() slides: BannerSlide[] = [];

  // 控制狀態
  isBrowser: boolean;
  isCarouselLoaded = false;
  private initTimeout: any = null;
  private autoplayTimeout: any = null;

  // 輪播設定
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoplay: false,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    items: 1,
    smartSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
  };

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // 確保 slides 有默認值
    if (!this.slides || this.slides.length === 0) {
      this.slides = this.getDefaultSlides();
    }
  }

  ngOnInit() {
    // 不需要特別處理
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // 使用預載入圖片的方式避免閃爍
      const preloadImages = this.slides.map(slide => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = slide.imageUrl;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });
      
      // 等待所有圖片預載入後顯示輪播
      Promise.all(preloadImages).then(() => {
        this.initTimeout = setTimeout(() => {
          this.isCarouselLoaded = true;
          
          // 更新 DOM
          const carouselContainer = document.querySelector('.banner-carousel-container');
          if (carouselContainer) {
            carouselContainer.classList.add('visible');
          }
          
          this.cdr.detectChanges();
          
          // 延遲啟用自動播放
          this.autoplayTimeout = setTimeout(() => {
            this.carouselOptions = {
              ...this.carouselOptions,
              autoplay: true
            };
            this.cdr.detectChanges();
          }, 1000);
        }, 300);
      });
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

  // 導航方法
  prevSlide() {
    const prevButton = document.querySelector('.banner-carousel-container .owl-prev');
    if (prevButton) {
      (prevButton as HTMLElement).click();
    }
  }

  nextSlide() {
    const nextButton = document.querySelector('.banner-carousel-container .owl-next');
    if (nextButton) {
      (nextButton as HTMLElement).click();
    }
  }

  // 提供預設輪播項目
  private getDefaultSlides(): BannerSlide[] {
    return [
      {
        id: '1',
        title: '探索藝術的奧秘',
        subtitle: '2024 年春季特展',
        description: '來自世界各地的藝術珍品，帶您穿越時空，體驗不同文化的藝術魅力。',
        imageUrl: '/assets/images/banner/banner1.jpg',
        buttonText: '立即探索',
        buttonLink: '/exhibition/spring-2024',
        alignment: 'left'
      },
      {
        id: '2',
        title: '藝術教育新視野',
        subtitle: '為下一代創造更多可能',
        description: '我們提供多樣化的藝術課程，啟發創造力，培養藝術思維。',
        imageUrl: '/assets/images/banner/banner2.jpg',
        buttonText: '了解更多',
        buttonLink: '/education',
        alignment: 'center'
      },
      {
        id: '3',
        title: '數字藝術展',
        subtitle: '科技與藝術的完美融合',
        description: '探索當代藝術家如何運用先進技術創造令人驚嘆的數字藝術作品。',
        imageUrl: '/assets/images/banner/banner3.jpg',
        buttonText: '預約參觀',
        buttonLink: '/exhibition/digital-art',
        alignment: 'right'
      }
    ];
  }

  // 處理圖片載入錯誤
  handleImageError(event: any) {
    event.target.src = '/assets/images/banner/default.jpg';
  }
}