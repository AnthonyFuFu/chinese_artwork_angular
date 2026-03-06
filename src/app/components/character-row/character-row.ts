import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-character-row',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './character-row.html',
  styleUrl: './character-row.css',
})
export class CharacterRow implements OnInit {
  
  // 永字的字體數據
  yongFonts = [
    { category: '篆書', fontName: '小篆', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+小篆' },
    { category: '篆書', fontName: '大篆', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+大篆' },
    { category: '隸書', fontName: '漢隸', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+漢隸' },
    { category: '隸書', fontName: '曹魏隸', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+曹魏隸' },
    { category: '草書', fontName: '章草', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+章草' },
    { category: '草書', fontName: '今草', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+今草' },
    { category: '草書', fontName: '章草(2)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+章草2' },
    { category: '草書', fontName: '今草(2)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+今草2' },
    { category: '草書', fontName: '章草(3)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+章草3' },
    { category: '草書', fontName: '今草(3)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+今草3' },
    { category: '草書', fontName: '章草(4)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+章草4' },
    { category: '草書', fontName: '今草(4)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=永+今草4' }
  ];
  
  // 字字的字體數據
  ziFonts = [
    { category: '篆書', fontName: '小篆', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+小篆' },
    { category: '篆書', fontName: '大篆', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+大篆' },
    { category: '隸書', fontName: '漢隸', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+漢隸' },
    { category: '隸書', fontName: '曹魏隸', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+曹魏隸' },
    { category: '草書', fontName: '章草', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+章草' },
    { category: '草書', fontName: '今草', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+今草' },
    { category: '草書', fontName: '章草(2)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+章草2' },
    { category: '草書', fontName: '今草(2)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+今草2' },
    { category: '草書', fontName: '章草(3)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+章草3' },
    { category: '草書', fontName: '今草(3)', imageUrl: 'https://dummyimage.com/100x100/f0f0f0/000000&text=字+今草3' }
  ];
  
  // 輪播選項配置
carouselOptions: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  nav: false, // 禁用導航按鈕
  navSpeed: 400,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    450: {
      items: 4
    },
    600: {
      items: 6
    },
    900: {
      items: 8
    },
    1200: {
      items: 10
    }
  },
  items: 4,  // 增加數量使每個項目變窄
  margin: 10, // 減少項目間距
  autoWidth: false,
  center: false,
  autoHeight: false,
  lazyLoad: true // 啟用延遲加載提高性能
};
  
  ngOnInit(): void {
    // 初始化邏輯如果需要
  }
}