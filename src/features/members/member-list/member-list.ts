import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {MemberCard} from '../member-card/member-card';
import {MemberService} from '../../../core/services/member-service';
import {Observable} from 'rxjs';
import {Member} from '../../../types/member';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
})
export class MemberList {
  private memberService = inject(MemberService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.memberService.getMembers();
  }
}
