import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {CreditCardList} from './rewards-api.model';

@Injectable()
export class RewardsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getCreditCards(): Observable<any> {
    return this.http
      .get(`${API_URL}/cards`)
      .catch(RewardsApiService._handleError);
  }

  // GET list of categories, future events
  getSpending(): Observable<any> {
          return this.http
        .get(`${API_URL}/spending`)
        .catch(RewardsApiService._handleError);
    }
}
