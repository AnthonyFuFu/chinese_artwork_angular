import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  avatar?: string;
  firstChar?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class ChatRoom implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('chatMessages') chatMessagesElement!: ElementRef;

  isDragging = false;
  offsetX = 0;
  offsetY = 0;
  boxPosition = { right: '20px', bottom: '0px' };

  isChatOpen = false;
  msgContent = '';
  empName = '小助手';
  messages: Message[] = [];

  // 使用固定的尺寸作為拖動邊界
  viewportWidth = 1000; // 預設值
  viewportHeight = 600; // 預設值

  // 檢查是否在瀏覽器環境
  private isBrowser: boolean;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // 只在瀏覽器環境執行
    if (this.isBrowser) {
      this.updateViewportSize();
      // 監聽視窗尺寸變化
      window.addEventListener('resize', this.handleResize);

      // 初始化一些歡迎訊息
      this.messages.push({
        text: '您好！有什麼我可以幫助您的嗎？',
        isUser: false,
        timestamp: new Date(),
        firstChar: this.empName.charAt(0)
      });
    }
  }

  ngAfterViewInit(): void {
    // 只在瀏覽器環境執行
    if (this.isBrowser && this.chatContainer) {
      // 初始位置已由 CSS 設定
    }
  }

  // 使用箭頭函數來避免 this 指向問題
  handleResize = (): void => {
    if (this.isBrowser) {
      this.updateViewportSize();
    }
  }

  updateViewportSize(): void {
    if (this.isBrowser) {
      this.viewportWidth = window.innerWidth;
      this.viewportHeight = window.innerHeight;
    }
  }

  onChatHeaderMouseDown(event: MouseEvent): void {
    if (!this.isBrowser) return;

    // 如果不是左鍵點擊，直接返回
    if (event.button !== 0 || !this.chatContainer) return;

    const boxRect = this.chatContainer.nativeElement.getBoundingClientRect();
    this.isDragging = true;

    // 計算滑鼠與框框左上角的偏移量
    this.offsetX = event.clientX - boxRect.left;
    this.offsetY = event.clientY - boxRect.top;

    // 防止拖動時選取文字
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser || !this.isDragging || !this.chatContainer) return;

    const boxElement = this.chatContainer.nativeElement;
    const boxWidth = boxElement.offsetWidth;
    const boxHeight = boxElement.offsetHeight;

    // 計算新位置（相對於視窗）
    let newLeft = event.clientX - this.offsetX;
    let newTop = event.clientY - this.offsetY;

    // 邊界檢查，防止框框超出視窗
    const maxLeft = this.viewportWidth - boxWidth;
    const maxTop = this.viewportHeight - boxHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    // 設置新位置，改用 left/top 而非 right/bottom
    this.boxPosition = {
      right: `${this.viewportWidth - newLeft - boxWidth}px`,
      bottom: `${this.viewportHeight - newTop - boxHeight}px`
    };
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.isDragging = false;
  }

  openChatRoom(): void {
    this.isChatOpen = true;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  closeChatRoom(): void {
    this.isChatOpen = false;
  }

  sendMessage(): void {
    if (!this.msgContent.trim()) return;

    // 添加用戶訊息
    this.messages.push({
      text: this.msgContent,
      isUser: true,
      timestamp: new Date()
    });

    const userMsg = this.msgContent;
    this.msgContent = ''; // 清空輸入框

    // 模擬接收回覆
    setTimeout(() => {
      this.messages.push({
        text: `您剛才說: "${userMsg}"，我會盡快回覆您。`,
        isUser: false,
        timestamp: new Date(),
        firstChar: this.empName.charAt(0)
      });
      this.scrollToBottom();
    }, 1000);

    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.isBrowser && this.chatMessagesElement) {
      const element = this.chatMessagesElement.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  // 當按下 Enter 鍵時發送訊息
  @HostListener('keydown.enter', ['$event'])
  onKeydownHandler(event: Event): void {
    // 將 event 轉換為 KeyboardEvent
    const keyEvent = event as KeyboardEvent;

    if (this.isChatOpen && document.activeElement?.tagName === 'INPUT') {
      keyEvent.preventDefault();
      this.sendMessage();
    }
  }

  ngOnDestroy(): void {
    // 只在瀏覽器環境執行
    if (this.isBrowser) {
      // 移除事件監聽器
      window.removeEventListener('resize', this.handleResize);
    }
  }
}