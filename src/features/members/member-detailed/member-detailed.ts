import {Component, OnInit, inject, signal, computed} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {AgePipe} from '../../../core/pipes/age-pipe';
import { Member } from '../../../types/member';
import {filter} from 'rxjs';
import {MemberService} from '../../../core/services/member-service';
import {AccountService} from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html'
})
export class MemberDetailed implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected memberService = inject(MemberService);
  private accountService = inject(AccountService);
  protected member = signal<Member | undefined>(undefined);
  protected title = signal<string | undefined>('Profile');

  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

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
