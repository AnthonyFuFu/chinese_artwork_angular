export interface ApiResponse {
    status: number;
    message: string[];
    messageLength: number
    data: any;
}

export interface BreadcrumbItem {
  label: string;
  link: string;
  icon?: string;
}

export interface MenuItem {
  icon: string;
  label: string;
  link: string;
  description?: string;
  submenu?: {label: string, link: string}[];
}

export interface FontItem {
  category: string;
  fontName: string;
  imageUrl: string;
}

export interface CharacterItem {
  character: string;
  fonts: FontItem[];
}

export interface MessageItem {
  text: string;
  isUser: boolean;
  timestamp: Date;
  avatar?: string;
  firstChar?: string;
}

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

export interface MemberItem {
    displayName: string;
    fullName: string;
    email: string;
    avatarUrl: string;
}

export interface Member {
  MEM_ID: number;
  MEM_NAME: string;
  MEM_ACCOUNT: string;
  MEM_PASSWORD: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
}
