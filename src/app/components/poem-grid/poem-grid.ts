import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-poem-grid',
  imports: [],
  templateUrl: './poem-grid.html',
  styleUrl: './poem-grid.css',
})
export class PoemGrid implements OnInit, AfterViewInit {
  @ViewChild('draggableBox') draggableBox!: ElementRef;
  
  isDragging = false;
  offsetX = 0;
  offsetY = 0;
  boxPosition = { left: '0px', top: '0px' };
  parentContainer: HTMLElement | null = null;
  isBoxFocused = false;
  
  // 框框中心點位置
  centerPosition = { x: 0, y: 0 };

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // 找到父容器 dictionary-container
    setTimeout(() => {
      this.parentContainer = this.document.querySelector('.dictionary-container');
      // 設置初始位置在父容器中心
      this.initializeBoxPosition();
    });
  }

  initializeBoxPosition(): void {
    if (!this.parentContainer) return;
    
    const parentRect = this.parentContainer.getBoundingClientRect();
    
    // 設置中心點為父容器中心
    this.centerPosition = {
      x: parentRect.width / 2,
      y: parentRect.height / 2
    };
    
    this.updateBoxPositionFromCenter();
  }

  // 根據中心點更新框框位置
  updateBoxPositionFromCenter(): void {
    const width = this.isBoxFocused ? 200 : 100;
    const height = this.isBoxFocused ? 150 : 75;
    
    // 從中心點計算左上角位置
    const left = this.centerPosition.x - width / 2;
    const top = this.centerPosition.y - height / 2;
    
    this.boxPosition = {
      left: `${left}px`,
      top: `${top}px`
    };
  }

  onMouseDown(event: MouseEvent): void {
    // 如果不是左鍵點擊，直接返回
    if (event.button !== 0) return;
    
    this.isDragging = true;
    this.focusBox();
    
    // 計算滑鼠與框框左上角的偏移量
    const boxRect = this.draggableBox.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - boxRect.left;
    this.offsetY = event.clientY - boxRect.top;
    
    // 防止拖動時選取文字
    event.preventDefault();
  }

  // 點選框框時放大
  focusBox(): void {
    if (!this.isBoxFocused) {
      this.isBoxFocused = true;
      this.updateBoxPositionFromCenter();
    }
  }

  // 點擊其他地方時縮小框框
  blurBox(): void {
    if (this.isBoxFocused) {
      this.isBoxFocused = false;
      this.updateBoxPositionFromCenter();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || !this.parentContainer) return;
    
    const parentRect = this.parentContainer.getBoundingClientRect();
    const boxElement = this.draggableBox.nativeElement;
    
    // 計算相對於父容器的位置
    let newLeft = event.clientX - parentRect.left - this.offsetX;
    let newTop = event.clientY - parentRect.top - this.offsetY;
    
    // 邊界檢查，防止框框超出父容器
    const maxLeft = parentRect.width - boxElement.offsetWidth;
    const maxTop = parentRect.height - boxElement.offsetHeight;
    
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));
    
    // 設置新位置
    this.boxPosition = {
      left: `${newLeft}px`,
      top: `${newTop}px`
    };
    
    // 更新中心點位置
    const width = boxElement.offsetWidth;
    const height = boxElement.offsetHeight;
    this.centerPosition = {
      x: newLeft + width / 2,
      y: newTop + height / 2
    };
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // 檢查點擊是否在框框外
    if (this.draggableBox && this.isBoxFocused) {
      const boxElement = this.draggableBox.nativeElement;
      if (!boxElement.contains(event.target as Node)) {
        this.blurBox();
      }
    }
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.isDragging = false;
  }
}