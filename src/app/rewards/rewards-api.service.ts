import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { API_URL } from '../env';
import { CreditCardList } from './rewards-api.model';

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

  getSpendingTable(): Observable<any> {
    return this.http
      .get(`${API_URL}/spending/user`)
      .catch(RewardsApiService._handleError);
  }

  getOptimizedCashBack(): Observable<any> {
    return this.http
      .get(`${API_URL}/optimized/CASHBACK`)
      .catch(RewardsApiService._handleError);
  }
  getOptimizedPoints(): Observable<any> {
    return this.http
      .get(`${API_URL}/optimized/POINTS`)
      .catch(RewardsApiService._handleError);
  }
  getOptimizedMiles(): Observable<any> {
    return this.http
      .get(`${API_URL}/optimized/MILES`)
      .catch(RewardsApiService._handleError);
  }

  postTransactions(fileVar: File): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Accept": "application/json" })
    }
    let input = new FormData();
    // Add your values in here
    input.append('file', fileVar);
    return this.http
      .post<any>(`${API_URL}/transactions`, input, HttpUploadOptions)
      .catch(RewardsApiService._handleError);
  }
}
