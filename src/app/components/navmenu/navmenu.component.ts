import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})

export class NavMenuComponent {

  menuVisible = false
  selectedLangName = 'Latviešu'

  constructor(
    public translate: TranslateService
  ) { }

  toggleMenu() {
    this.menuVisible = !this.menuVisible
  }

  getMenuClass() {
    return this.menuVisible
      ? ''
      : 'collapsed'
  }

  getIconClass() {
    return this.menuVisible
    ? 'icon not-collapsed'
    : 'icon collapsed'
  }

  public setLanguage(lang, selectedLangName) {
    this.selectedLangName = selectedLangName
    this.translate.use(lang)
  }
}
