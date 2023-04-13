import { filter } from 'rxjs/operators';
import { Component, Inject, Renderer2, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kin-mai-web';
  isLogin = false;

  constructor(
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.isLogin = event.urlAfterRedirects.includes('/auth/login');
    });

    // append google script
    let script = this._renderer2.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApi}&libraries=places&language=th&callback=Function.prototype`;
    this._renderer2.appendChild(this._document.body, script);
  }
}
