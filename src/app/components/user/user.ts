import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../common/models/member';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})

export class User implements OnInit {
  @Input() isCollapsed: boolean = false;
  
  member: Member | null = null;
  isUserMenuOpen: boolean = false;
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // 這裡應該從你的驗證服務獲取用戶資料
    // 暫時使用模擬數據
    this.member = {
      displayName: '李小明',
      fullName: '李小明',
      email: 'xiaoming.li@example.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Guest&background=0D8ABC&color=fff'
    };
  }
  
  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  
  editProfile(): void {
    this.router.navigate(['/profile/edit']);
    this.isUserMenuOpen = false;
  }
  
  settings(): void {
    this.router.navigate(['/settings']);
    this.isUserMenuOpen = false;
  }
  
  logout(): void {
    // 實現登出邏輯，例如呼叫認證服務
    console.log('logged out');
    this.isUserMenuOpen = false;
    this.router.navigate(['/login']);
  }
}