import {Component, OnInit, inject, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {AgePipe} from '../../../core/pipes/age-pipe';
import { Member } from '../../../types/member';
import {filter} from 'rxjs';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html'
})
export class MemberDetailed implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected member = signal<Member | undefined>(undefined);
  protected title = signal<string | undefined>('Profile');

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member.set(data['member'])
    })
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title)
      }
    })
  }
}
