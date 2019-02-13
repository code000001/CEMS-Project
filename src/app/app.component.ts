import { filter, map, mergeMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'CEMS-Project';
  startedClass = false;
  completedClass = false;
  preventAbuse = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => this.titleService.setTitle(event['title']));
    // console.log(this.activatedRoute.data.title);
    // this.titleService.setTitle(event['title']);
    // this.testHttp();
  }

  // onStarted() {
  //   this.startedClass = true;
  //   setTimeout(() => {
  //     this.startedClass = false;
  //   }, 800);
  // }

  // onCompleted() {
  //   this.completedClass = true;
  //   setTimeout(() => {
  //     this.completedClass = false;
  //   }, 800);
  // }

  testHttp() {
    this.preventAbuse = true;
    this.http.get('https://reqres.in/api/users?delay=2').subscribe(res => {
      // console.log(res);
      setTimeout(() => {
        this.preventAbuse = false;
      }, 800);
    });
  }

}
