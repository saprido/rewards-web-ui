import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RewardsApiService } from './rewards/rewards-api.service';
import { CreditCardList, SpendingList } from './rewards/rewards-api.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  creditCardsListSub: Subscription;
  creditCardsList: CreditCardList;
  spendingListSub: Subscription;
  spendingListTableSub: Subscription;
  milesCardSub: Subscription;

  transactionsSub: Subscription;

  cashbackCard: string;
  pointsCard: string;
  milesCard: any;
  ourFile: File; // hold our file

  spendingList: SpendingList;

  myDataSet: Array<any> = [];
  myDataSetLabels: Array<any> = [];


  public chartType = 'doughnut';


  public chartDatasets: Array<any> = [
    { data: [], label: 'My First dataset' }
  ];


  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'], //'Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '4D5360'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    title: {
      display: true
    },
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    legend: {
      position: 'left',
      labels: {
        font: 10,
        boxWidth: 20
      }
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  constructor(private rewardsApi: RewardsApiService) {
  }

  ngOnInit() {
    //delete table by api

    this.milesCardSub = this.rewardsApi
      .getOptimizedCashBack()
      .subscribe(res => {
        this.milesCard = res;
        console.log(this.milesCard);
      });

    this.creditCardsListSub = this.rewardsApi
      .getCreditCards()
      .subscribe(res => {
        this.creditCardsList = res;
        console.log(this.creditCardsList.cards);
      },
        console.error
      );

    this.spendingListSub = this.rewardsApi
      .getSpending()
      .subscribe(res => {
        let temp = this;
        this.spendingList = res;
        console.log(this.spendingList.spending);
        let iter = this.spendingList.spending;
        for (let entry of iter) {
          this.myDataSet.push(entry.amount_spent);
          temp.chartDatasets[0].data.push(entry.amount_spent);
          this.myDataSetLabels.push(entry.category);
          temp.chartLabels.push(entry.category);
          temp.chartColors[0].backgroundColor.push(this.getRandomColor());
        }

        console.log(temp.chartDatasets[0].data);
        console.log(temp.chartColors[0].backgroundColor);
        // this.chartDatasets[0].data = this.myDataSet;
        console.log(this.myDataSet);
        console.log(this.myDataSetLabels);
      },
        console.error
      );

    console.log(this.chartDatasets[0].data);

  }

  ngOnDestroy() {
    this.creditCardsListSub.unsubscribe();
    this.spendingListSub.unsubscribe();
    this.milesCardSub.unsubscribe();
  }

  openInput() {
    // your can use ElementRef for this later
    document.getElementById('fileInput').click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.ourFile = files[0];
    }
  }

  upload() {
    console.log('sending this to server', this.ourFile);
    this.transactionsSub = this.rewardsApi.postTransactions(this.ourFile).subscribe(res => {
      this.spendingListTableSub = this.rewardsApi.getSpendingTable().subscribe(result => {
        console.log(this.myDataSet[0]);
        this.myDataSet.splice(0, this.myDataSet.length);
        this.myDataSetLabels.splice(0, this.myDataSetLabels.length);
        const temp = this;
        this.spendingList = result;
        console.log(this.spendingList.spending);
        const iter = this.spendingList.spending;
        for (const entry of iter) {
          this.myDataSet.push(entry.amount_spent);
          temp.chartDatasets[0].data.push(entry.amount_spent);
          this.myDataSetLabels.push(entry.category);
          temp.chartLabels.push(entry.category);
          temp.chartColors[0].backgroundColor.push(this.getRandomColor());
        }
      });
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    let a = '#F7464A';
    let b = '#46BFBD';
    let c = '#FDB45C';
    let d = '#949FB1';
    let e = '#4D5360';

    let temp = Math.floor(Math.random() * Math.floor(5));
    switch (temp) {
      case 0:
        return a;
      case 1:
        return b;
      case 2:
        return c;
      case 3:
        return d;
      case 4:
        return e;
      case 5:
        return a;
    }
    return color;
  }
}
