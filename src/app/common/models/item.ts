export interface NewsItem {
  id: string;
  title: string;
  content: string;
  type: 'event' | 'news' | 'exhibition' | 'update';
  date: string;
  imageUrl?: string;
  link?: string;
  linkText?: string;
}

export interface CardItem {
  id: string;
  title: string;
  content: string;
  type: 'event' | 'news' | 'exhibition' | 'update';
  date: string;
  imageUrl?: string;
  link?: string;
  linkText?: string;
}

export interface FrontMember {
    displayName: string;
    fullName: string;
    email: string;
    avatarUrl: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
}
