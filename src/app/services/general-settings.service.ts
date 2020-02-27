import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  url = "http://mydev.localpackerapi.com";
  access_token = localStorage.getItem('access_token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.access_token
    })
  }

  get_settings(settings) {
    var url = this.url + '/settings/get_settings.json';
    return this.http.get(url,this.httpOptions)
  }

  add_time_zone(time_zone, settings) {
    var url = this.url + '/settings/fetch_and_update_time_zone.json';
    return this.http.post(url, time_zone, this.httpOptions)
  }
}
