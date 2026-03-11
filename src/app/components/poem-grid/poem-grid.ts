import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-poem-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './poem-grid.html',
  styleUrl: './poem-grid.css',
})
export class PoemGrid implements OnInit {
  @ViewChild('gridContainer', { static: true }) gridContainer!: ElementRef;
  
  isCollapsed = true;
  columnsCount: number = 4;
  rowsCount: number = 8;
  emptyRowsCount: number = 4;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Initialize grid with default values
    this.generateGrid(this.columnsCount, this.rowsCount, this.emptyRowsCount);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onGenerateClick(): void {
    // Validate that emptyRows doesn't exceed rows
    const validEmptyRows = Math.min(this.emptyRowsCount, this.rowsCount);
    
    this.generateGrid(this.columnsCount, this.rowsCount, validEmptyRows);
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
        if (this.rowsCount < 50) this.rowsCount++;
        break;
      case 'emptyRows':
        if (this.emptyRowsCount < 50) this.emptyRowsCount++;
        break;
    }
  }

  decreaseValue(field: string): void {
    switch (field) {
      case 'columns':
        if (this.columnsCount > 1) this.columnsCount--;
        break;
      case 'rows':
        if (this.rowsCount > 1) this.rowsCount--;
        break;
      case 'emptyRows':
        if (this.emptyRowsCount > 0) this.emptyRowsCount--;
        break;
    }
  }
}