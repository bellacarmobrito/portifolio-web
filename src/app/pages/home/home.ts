import { Component } from '@angular/core';
import { Header } from "../../shared/header/header";
import { MainSection } from '../../shared/main-section/main-section';

@Component({
  selector: 'app-home',
  imports: [Header, MainSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }
