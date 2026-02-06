import { Component, OnInit, HostBinding, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-left-side-bar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './left-side-bar.html',
	styleUrl: './left-side-bar.css'
})
export class LeftSideBar implements OnInit, OnDestroy {
  isCollapsed = false;
  isMobile = false;
  private mediaQueryList: MediaQueryList | null = null;
  theme: 'dark' | 'light' = 'dark';
  private isBrowser: boolean;
  // 添加子菜單狀態管理
  expandedSubmenus: { [key: number]: boolean } = {};

  // 側邊欄菜單項目
  menuItems = [
    { 
      icon: 'home', 
      label: '首頁', 
      link: '/index', 
      description: '返回首頁' 
    },
    { 
      icon: 'person', 
      label: '藝術家', 
      link: '/artist', 
      description: '藝術家資料' 
    },
    { 
      icon: 'palette', 
      label: '作品', 
      link: '/artwork', 
      description: '瀏覽作品' 
    },
    { 
      icon: 'book', 
      label: '辭典', 
      link: '/dictionary', 
      description: '查閱辭典',
      submenu: [
        { label: '文字字典', link: '/dictionary/character' },
        { label: '部首索引', link: '/dictionary/radical' }
      ]
    },
    { 
      icon: 'settings', 
      label: '設定', 
      link: '/settings', 
      description: '調整應用設置' 
    }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        this.isCollapsed = savedState === 'true';
      }
      
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.theme = savedTheme as 'dark' | 'light';
        document.body.setAttribute('data-theme', this.theme);
      }
      
      this.mediaQueryList = window.matchMedia('(max-width: 768px)');
      this.checkScreenSize(this.mediaQueryList);
      
      this.mediaQueryList.addEventListener('change', this.checkScreenSize.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.mediaQueryList) {
      this.mediaQueryList.removeEventListener('change', this.checkScreenSize.bind(this));
    }
  }
  checkScreenSize(e: MediaQueryList | MediaQueryListEvent): void {
    this.isMobile = e.matches;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isBrowser) {
      localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    if (this.isBrowser) {
      document.body.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    }
  }

  toggleSubmenu(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expandedSubmenus[index] = !this.expandedSubmenus[index];
  }
}