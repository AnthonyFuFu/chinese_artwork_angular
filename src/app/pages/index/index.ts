import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';
import { News } from '../../components/news/news';
import { Banner } from '../../components/banner/banner';
import { Card, CardItem } from '../../components/card/card';

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

  cardItems: CardItem[] = [
    {
      id: '1',
      title: '國際藝術大師系列講座',
      content: '我們邀請到國際知名藝術家王大師來分享他的創作歷程與技法。講座將探討當代藝術的發展趨勢以及藝術創作的靈感來源。',
      type: 'event',
      date: '2023-12-15',
      imageUrl: '/assets/images/news/news1.jpg',
      link: '/events/1',
      linkText: '預約講座'
    },
    {
      id: '2',
      title: '2024年春季特展：色彩的力量',
      content: '本展覽將展出來自全球的50件精選作品，探索色彩在不同文化和時代中的表現與象徵意義。',
      type: 'exhibition',
      date: '2024-03-20',
      imageUrl: '/assets/images/news/news1.jpg',
      link: '/exhibition/spring-2024',
      linkText: '展覽詳情'
    },
    {
      id: '3',
      title: '藝術詞典新增200個專業術語',
      content: '為了幫助藝術愛好者更好地理解藝術專業知識，我們的藝術詞典新增了200個專業術語的詳細解釋。',
      type: 'update',
      date: '2023-11-30',
      imageUrl: '/assets/images/news/news1.jpg',
      link: '/dictionary/updates',
      linkText: '查看更新'
    },
    {
      id: '4',
      title: '新合作夥伴：國立美術館',
      content: '我們很榮幸宣布與國立美術館達成戰略合作夥伴關係，未來將共同舉辦更多高品質的藝術活動與展覽。',
      type: 'news',
      date: '2023-12-05',
      imageUrl: '/assets/images/news/news1.jpg',
      link: '/news/partnership',
      linkText: '了解更多'
    }
  ];
  
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    // this.getMembers();
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
