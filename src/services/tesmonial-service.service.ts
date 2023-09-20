import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/models/Language';
import { Testimonial } from 'src/models/Testimonial';

@Injectable({
  providedIn: 'root',
})
export class TesmonialServiceService {
  private _gatewayUrl = 'https://test-admin-api.gozem.co/hiring/api/v1';
  tesmonialList: Array<Testimonial> = [];
  languageList: Array<Language> = [];
  constructor(private http: HttpClient) {}

  getTestimonials(params?: any): Observable<any> {
    let queryParams = new HttpParams();
    if (params) {
      params.page = params.page || 1;
      params.order = params.order || 'newest_first';
      params.language = params.language || '';
      queryParams = queryParams.appendAll(params);
    } else {
      queryParams = queryParams.append('page', 1);
    }
    return this.http.get(this._gatewayUrl + '/testimonials', {
      params: queryParams,
    });
  }

  getLanguages(): Observable<any> {
    return this.http.get(this._gatewayUrl + '/languages');
  }
}
