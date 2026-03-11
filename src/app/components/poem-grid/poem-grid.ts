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

  generateGrid(columns: number, rows: number, emptyRows: number): void {
    // Clear existing grid
    const gridElement = this.gridContainer.nativeElement;
    while (gridElement.firstChild) {
      this.renderer.removeChild(gridElement, gridElement.firstChild);
    }
    
    // Calculate cell height for empty container
    const cellHeight = 60;
    const emptyContainerHeight = (emptyRows * (cellHeight - 2)) + (emptyRows+1); // Account for borders
    
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
}