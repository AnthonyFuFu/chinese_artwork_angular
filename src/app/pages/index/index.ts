import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MemberService } from '../../services/member.service';
import { News } from '../../components/news/news';
import { Banner } from '../../components/banner/banner';
import { Card } from '../../components/card/card';
import { CardItem, NewsItem, BannerItem, Member } from '../../common/models/item';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, News, Banner, Card],
  templateUrl: './index.html',
  styleUrl: './index.css',
})

export class Index implements OnInit {
  members: Member[] = [];
  error: string = '';
  loading: boolean = false;
  theme: 'dark' | 'light' = 'dark';
  
  bannerItems: BannerItem[] = [
    {
      id: '1',
      title: '探索藝術的奧秘',
      subtitle: '2024 年春季特展',
      description: '來自世界各地的藝術珍品，帶您穿越時空，體驗不同文化的藝術魅力。',
      imageUrl: 'assets/images/banner/banner1.jpg',
      buttonText: '立即探索',
      buttonLink: '/exhibition/spring-2024',
      alignment: 'left'
    },
    {
      id: '2',
      title: '藝術教育新視野',
      subtitle: '為下一代創造更多可能',
      description: '我們提供多樣化的藝術課程，啟發創造力，培養藝術思維。',
      imageUrl: 'assets/images/banner/banner2.jpg',
      buttonText: '了解更多',
      buttonLink: '/education',
      alignment: 'center'
    },
    {
      id: '3',
      title: '數字藝術展',
      subtitle: '科技與藝術的完美融合',
      description: '探索當代藝術家如何運用先進技術創造令人驚嘆的數字藝術作品。',
      imageUrl: 'assets/images/banner/banner3.jpg',
      buttonText: '預約參觀',
      buttonLink: '/exhibition/digital-art',
      alignment: 'right'
    }
  ];

  newsItems: NewsItem[] = [
    {
      id: '1',
      title: '國際藝術大師系列講座',
      content: '我們邀請到國際知名藝術家王大師來分享他的創作歷程與技法。講座將探討當代藝術的發展趨勢以及藝術創作的靈感來源。',
      type: 'event',
      date: '2023-12-15',
      imageUrl: 'assets/images/news/news1.jpg',
      link: '/events/1',
      linkText: '預約講座'
    },
    {
      id: '2',
      title: '2024年春季特展：色彩的力量',
      content: '本展覽將展出來自全球的50件精選作品，探索色彩在不同文化和時代中的表現與象徵意義。',
      type: 'exhibition',
      date: '2024-03-20',
      imageUrl: 'assets/images/news/news2.jpg',
      link: '/exhibition/spring-2024',
      linkText: '展覽詳情'
    },
    {
      id: '3',
      title: '藝術詞典新增200個專業術語',
      content: '為了幫助藝術愛好者更好地理解藝術專業知識，我們的藝術詞典新增了200個專業術語的詳細解釋。',
      type: 'update',
      date: '2023-11-30',
      imageUrl: 'assets/images/news/news1.jpg',
      link: '/dictionary/updates',
      linkText: '查看更新'
    },
    {
      id: '4',
      title: '新合作夥伴：國立美術館',
      content: '我們很榮幸宣布與國立美術館達成戰略合作夥伴關係，未來將共同舉辦更多高品質的藝術活動與展覽。',
      type: 'news',
      date: '2023-12-05',
      imageUrl: 'assets/images/news/news2.jpg',
      link: '/news/partnership',
      linkText: '了解更多'
    }
  ];

  cardItems: CardItem[] = [
    {
      id: '1',
      title: '國際藝術大師系列講座',
      content: '我們邀請到國際知名藝術家王大師來分享他的創作歷程與技法。講座將探討當代藝術的發展趨勢以及藝術創作的靈感來源。',
      type: 'event',
      date: '2023-12-15',
      imageUrl: 'assets/images/news/news1.jpg',
      link: '/events/1',
      linkText: '預約講座'
    },
    {
      id: '2',
      title: '2024年春季特展：色彩的力量',
      content: '本展覽將展出來自全球的50件精選作品，探索色彩在不同文化和時代中的表現與象徵意義。',
      type: 'exhibition',
      date: '2024-03-20',
      imageUrl: 'assets/images/news/news1.jpg',
      link: '/exhibition/spring-2024',
      linkText: '展覽詳情'
    },
    {
      id: '3',
      title: '藝術詞典新增200個專業術語',
      content: '為了幫助藝術愛好者更好地理解藝術專業知識，我們的藝術詞典新增了200個專業術語的詳細解釋。',
      type: 'update',
      date: '2023-11-30',
      imageUrl: 'assets/images/news/news1.jpg',
      link: '/dictionary/updates',
      linkText: '查看更新'
    },
    {
      id: '4',
      title: '新合作夥伴：國立美術館',
      content: '我們很榮幸宣布與國立美術館達成戰略合作夥伴關係，未來將共同舉辦更多高品質的藝術活動與展覽。',
      type: 'news',
      date: '2023-12-05',
      imageUrl: 'assets/images/news/news1.jpg',
      link: '/news/partnership',
      linkText: '了解更多'
    }
  ];

  constructor(
    private memberService: MemberService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // this.getMembers();
    
    // 檢查是否在瀏覽器環境
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.theme = savedTheme as 'dark' | 'light';
        document.body.setAttribute('data-theme', this.theme);
      }
    }
  }

  getMembers(): void {
    this.loading = true;
    this.memberService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = '無法獲取會員資料：' + err.message;
        this.loading = false;
      }
    });
  }
}