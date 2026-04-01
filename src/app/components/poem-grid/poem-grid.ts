import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-poem-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './poem-grid.html',
  styleUrl: './poem-grid.css',
})
export class PoemGrid implements OnInit, AfterViewInit {
  @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef;
  @ViewChild('poemSidebar', { static: false }) poemSidebar!: ElementRef;
  @ViewChild('resizeHandle', { static: false }) resizeHandle!: ElementRef;

  isCollapsed = true;
  columnsCount: number = 4;
  rowsCount: number = 8;
  emptyRowsCount: number = 4;
  defaultSidebarWidth: number = 300; // 預設寬度
  defaultCollapsedSidebarWidth: number = 10; // 預設寬度

  // 拖拽相關變量
  private isDragging: boolean = false;
  private startX: number = 0;
  private startWidth: number = 0;
  private isBrowser: boolean = false;
  private currentScale: number = 1;
  private minScale: number = 0.5;
  private maxScale: number = 3;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Ensure emptyRowsCount doesn't exceed rowsCount on initialization
    this.validateEmptyRows();
    // Initialize grid with default values
    this.generateGrid(this.columnsCount, this.rowsCount, this.emptyRowsCount);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // 使用更長的延遲以確保DOM完全加載
      setTimeout(() => {
        this.setupResizeHandle();
        this.setupZoom(); // 新增縮放功能設置
      }, 100);
    }
  }

  // 設置拖拽功能
  setupResizeHandle(): void {
    if (!this.isBrowser) {
      return;
    }
    if (!this.poemSidebar || !this.poemSidebar.nativeElement) {
      return;
    }
    if (!this.resizeHandle || !this.resizeHandle.nativeElement) {
      return;
    }
    const resizeHandleElement = this.resizeHandle.nativeElement;
    const sidebarElement = this.poemSidebar.nativeElement;

    // 開始拖拽
    this.renderer.listen(resizeHandleElement, 'mousedown', (e: MouseEvent) => {
      // 只有當側邊欄未收起時才允許調整寬度
      if (this.isCollapsed) {
        return;
      }

      this.renderer.setStyle(this.poemSidebar.nativeElement, 'transition', `width 0s ease`);
      this.isDragging = true;
      this.startX = e.clientX;
      this.startWidth = parseInt(getComputedStyle(sidebarElement).width, 10);

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        if (!this.isDragging) return;

        // 計算新的寬度 (從右向左減少)
        const newWidth = this.startWidth - (moveEvent.clientX - this.startX);
        // 限制最小和最大寬度
        const minWidth = 10; // 最小寬度
        const maxWidth = window.innerWidth * 0.8; // 最大寬度為窗口的80%

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          this.renderer.setStyle(sidebarElement, 'width', `${newWidth}px`);
        }
      };

      const mouseUpHandler = () => {
        this.isDragging = false;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      e.preventDefault();
    });
  }

  // Add a method to ensure emptyRowsCount never exceeds rowsCount
  private validateEmptyRows(): void {
    this.emptyRowsCount = Math.min(this.emptyRowsCount, this.rowsCount);
  }

  // 切換側邊欄
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    // 當展開側邊欄時，恢復為默認寬度
    if (!this.isCollapsed && this.isBrowser && this.poemSidebar) {
      setTimeout(() => {
        this.renderer.setStyle(this.poemSidebar.nativeElement, 'width', `${this.defaultSidebarWidth}px`);
      }, 0);
    } else {
      this.renderer.setStyle(this.poemSidebar.nativeElement, 'transition', `width 0.3s ease`);
      this.renderer.setStyle(this.poemSidebar.nativeElement, 'width', `${this.defaultCollapsedSidebarWidth}px`);
    }
  }

  onGenerateClick(): void {
    // Validate before generating
    this.validateEmptyRows();
    this.generateGrid(this.columnsCount, this.rowsCount, this.emptyRowsCount);
  }

  // 新增一個變量來追踪下一個要填充的格子
  private nextEmptyCell: HTMLElement | null = null;

  generateGrid(columns: number, rows: number, emptyRows: number): void {
    // Clear existing grid
    const gridElement = this.gridContainer.nativeElement;
    while (gridElement.firstChild) {
      this.renderer.removeChild(gridElement, gridElement.firstChild);
    }

    // Calculate cell height for empty container
    const cellHeight = 60;
    const emptyContainerHeight = (emptyRows * (cellHeight - 2)) + (emptyRows + 1); // Account for borders

    // Create cells
    for (let col = 1; col <= columns; col++) {
      const column = this.renderer.createElement('div');
      this.renderer.addClass(column, 'column');

      // Special handling for the leftmost column
      if (col === columns) {
        // Add the non-empty cells at the top
        const filledRows = rows - emptyRows;
        for (let row = 0; row < filledRows; row++) {
          const cell = this.renderer.createElement('div');
          this.renderer.addClass(cell, 'grid-item');
          this.renderer.appendChild(column, cell);
        }
        // Only add empty container if emptyRows > 0
        if (emptyRows > 0) {
          // Add a single container for the empty area
          const emptyContainer = this.renderer.createElement('div');
          this.renderer.addClass(emptyContainer, 'empty-container');
          this.renderer.setStyle(emptyContainer, 'height', `${emptyContainerHeight}px`);
          this.renderer.appendChild(column, emptyContainer);
        }
      } else {
        // Regular columns with all cells
        for (let row = 0; row < rows; row++) {
          const cell = this.renderer.createElement('div');
          this.renderer.addClass(cell, 'grid-item');
          this.renderer.appendChild(column, cell);
        }
      }
      // Prepend each new column (add it to the beginning of the grid)
      this.renderer.insertBefore(gridElement, column, gridElement.firstChild);
    }
    // 初始化查找第一個空格子
    this.findNextEmptyCell();
  }

  increaseValue(field: string): void {
    switch (field) {
      case 'columns':
        if (this.columnsCount < 12) this.columnsCount++;
        break;
      case 'rows':
        if (this.rowsCount < 50) {
          this.rowsCount++;
          // When rows increase, empty rows can remain the same
        }
        break;
      case 'emptyRows':
        if (this.emptyRowsCount < this.rowsCount && this.emptyRowsCount < 50) {
          this.emptyRowsCount++;
        }
        break;
    }
  }

  decreaseValue(field: string): void {
    switch (field) {
      case 'columns':
        if (this.columnsCount > 1) this.columnsCount--;
        break;
      case 'rows':
        if (this.rowsCount > 1) {
          this.rowsCount--;
          // When decreasing rows, ensure emptyRows doesn't exceed the new rowsCount
          this.validateEmptyRows();
        }
        break;
      case 'emptyRows':
        if (this.emptyRowsCount > 1) this.emptyRowsCount--;
        break;
    }
  }

  // 查找下一個空白格子
  findNextEmptyCell(): void {
    // 獲取所有列，columns 是以 prepend 方式添加的，所以需要反轉獲取正確的右至左順序
    const columns = Array.from(
      this.gridContainer.nativeElement.querySelectorAll('.column')
    ) as HTMLElement[];

    // 由右至左遍歷列（因為 columns 是從左到右的 DOM 順序）
    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i];

      // 在每列中從上到下查找空格子
      const gridItems = column.querySelectorAll('.grid-item');
      for (let item of gridItems) {
        if (item.children.length === 0) {
          this.nextEmptyCell = item as HTMLElement;
          return; // 找到第一個空格子就返回
        }
      }
    }
    // 如果沒有找到空格子
    this.nextEmptyCell = null;
  }

  // 添加字體圖片到下一個空白格子
  addFontToGrid(imageUrl: string, character: string, fontName: string): void {
    if (!this.nextEmptyCell) {
      console.log('沒有可用的空白格子');
      return;
    }

    // 創建圖片元素
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', imageUrl);
    this.renderer.setAttribute(img, 'alt', `${character} ${fontName}`);
    this.renderer.addClass(img, 'grid-font-image');

    // 添加到格子中
    this.renderer.appendChild(this.nextEmptyCell, img);

    // 找下一個空白格子
    this.nextEmptyCell = null;
    this.findNextEmptyCell();
  }


  // 設置縮放功能
  private setupZoom(): void {
    if (!this.isBrowser || !this.poemSidebar) {
      return;
    }

    const gridElement = this.poemSidebar.nativeElement;

    this.renderer.listen(gridElement, 'wheel', (event: WheelEvent) => {
      // 只有在按下 Ctrl 鍵時才觸發縮放
      if (event.ctrlKey) {
        event.preventDefault(); // 阻止瀏覽器默認的縮放行為

        // 確定縮放方向 (向上滾動是放大，向下滾動是縮小)
        const delta = event.deltaY || event.detail;
        const zoomFactor = delta > 0 ? 0.9 : 1.1; // 縮放比例因子

        // 計算新的縮放比例
        let newScale = this.currentScale * zoomFactor;

        // 限制縮放範圍
        newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));

        // 應用縮放
        this.applyZoom(newScale);

        // 更新當前縮放比例
        this.currentScale = newScale;
      }
    });
  }

  // 應用縮放到網格 - 修改後的方法
  private applyZoom(scale: number): void {
    if (!this.gridContainer) return;

    const gridElement = this.gridContainer.nativeElement;

    // 直接對整個網格容器應用縮放
    this.renderer.setStyle(gridElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(gridElement, 'transform-origin', 'left top');

    // 調整網格容器的外部容器來適應縮放後的尺寸
    const parentElement = gridElement.parentElement;
    if (parentElement) {
      // 計算縮放後的高度
      const originalHeight = this.rowsCount * 60; // 原始格子高度總和
      const scaledHeight = originalHeight * scale;

      // 為容器設置最小高度以適應縮放內容
      this.renderer.setStyle(parentElement, 'min-height', `${scaledHeight}px`);
      this.renderer.setStyle(parentElement, 'padding-bottom', `${scaledHeight - originalHeight}px`);
    }
  }
}