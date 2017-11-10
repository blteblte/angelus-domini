import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Angelus Domini';

  // Use "constructor"s only for dependency injection
  constructor(
    public translate: TranslateService
  ) {

  }

  // Here you want to handle anything with @Input()'s @Output()'s
  // Data retrieval / etc - this is when the Component is "ready" and wired up
  ngOnInit() { }


}
