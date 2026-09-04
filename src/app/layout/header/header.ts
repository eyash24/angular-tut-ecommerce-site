import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, SearchBar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
