import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterSearch } from './../../components/character-search/character-search';
import { CharacterRow } from './../../components/character-row/character-row';
import { PoemGrid } from '../../components/poem-grid/poem-grid';

@Component({
  selector: 'app-dictionary',
  standalone: true, // 如果使用獨立組件
  imports: [CommonModule, ReactiveFormsModule, CharacterSearch, CharacterRow, PoemGrid],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.css',
})
export class Dictionary {

  @ViewChild('poemGrid') poemGrid!: PoemGrid;
  
  onFontSelected(fontInfo: {character: string, fontName: string, imageUrl: string}): void {
    // 調用 PoemGrid 的方法將選中的字體添加到網格中
    this.poemGrid.addFontToGrid(fontInfo.imageUrl, fontInfo.character, fontInfo.fontName);
  }
}
