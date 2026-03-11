import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { LeftSideBar } from '../left-side-bar/left-side-bar';
import { RouterOutlet } from '@angular/router';
import { ChatRoom } from '../../components/chat/chat';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [Header, LeftSideBar, Footer, RouterOutlet, ChatRoom],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
