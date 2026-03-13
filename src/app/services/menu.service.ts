import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  link: string;
  icon?: string;
}

export interface MenuItem {
  icon: string;
  label: string;
  link: string;
  description?: string;
  submenu?: {label: string, link: string}[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // 定義麵包屑數據流
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  // 菜單項目定義 - 現在在服務中定義
  private _menuItems: MenuItem[] = [
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
    }
  ];

  // 提供一個 getter 方法讓組件可以獲取菜單項目
  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  constructor(private router: Router) {
    // 監聽路由變更來更新麵包屑
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumbs(event.url);
    });
    // 初始化麵包屑
    this.updateBreadcrumbs(this.router.url);
  }
  // 更新麵包屑 - 不包含首頁
  private updateBreadcrumbs(url: string): void {
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // 尋找匹配的主菜單項
    let matchedMainItem = null;
    let matchedSubItem = null;

    for (const item of this.menuItems) {
      // 檢查是否匹配主菜單
      if (url.startsWith(item.link) && item.link !== '/' && item.link !== '/index') {
        matchedMainItem = item;
        
        // 檢查子菜單
        if (item.submenu) {
          for (const subItem of item.submenu) {
            if (url.startsWith(subItem.link)) {
              matchedSubItem = subItem;
              break;
            }
          }
        }
        break;
      }
    }
    // 添加匹配的主菜單到麵包屑
    if (matchedMainItem) {
      breadcrumbs.push({
        label: matchedMainItem.label,
        link: matchedMainItem.link
      });
      // 如果有匹配的子菜單，也添加到麵包屑
      if (matchedSubItem) {
        breadcrumbs.push({
          label: matchedSubItem.label,
          link: matchedSubItem.link
        });
      }
    }

    this.breadcrumbsSubject.next(breadcrumbs);
  }
}