import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {RewardsApiService} from './rewards/rewards-api.service';
import {CreditCardList} from './rewards/rewards-api.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  creditCardsListSub: Subscription;
  creditCardsList: CreditCardList;

  constructor(private rewardsApi: RewardsApiService) {
  }

  ngOnInit() {
    this.creditCardsListSub = this.rewardsApi
      .getCreditCards()
      .subscribe(res => {
          this.creditCardsList = res;
          console.log(this.creditCardsList.cards);
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.creditCardsListSub.unsubscribe();
  }
}