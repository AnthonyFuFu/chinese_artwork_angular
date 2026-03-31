import { Component, Input, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerSlide } from '../../common/models/item';

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
    navSpeed: 200,
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
    smartSpeed: 200,
    slideTransition: 'linear',
  };

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
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

  // 處理圖片載入錯誤
  handleImageError(event: any) {
    event.target.src = '/assets/images/banner/default.jpg';
  }
}