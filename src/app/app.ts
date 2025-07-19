import {Component, signal, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  protected readonly title = signal('BuddyMakerFE');

  protected members = signal<any>([])

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members').
      subscribe(members => {
        console.log(members);
        this.members.set(members)
    })
  }

}
