import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // 添加 CommonModule
import { MenuService, BreadcrumbItem } from '../../services/menu.service'; // 導入服務
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit, OnDestroy {
  breadcrumbs: BreadcrumbItem[] = [];
  private subscription: Subscription | null = null;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    // 訂閱麵包屑變更
    this.subscription = this.menuService.breadcrumbs$.subscribe(
      breadcrumbs => {
        this.breadcrumbs = breadcrumbs;
      }
    );
  }

  ngOnDestroy() {
    // 取消訂閱，避免內存泄漏
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}