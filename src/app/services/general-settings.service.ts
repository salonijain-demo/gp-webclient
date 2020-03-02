import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  get_settings(settings) {
    var url = environment.baseUrl + '/settings/get_settings.json';
    return this.http.get(url)
  }

  add_time_zone(time_zone, settings) {
    var url = environment.baseUrl + '/settings/fetch_and_update_time_zone.json';
    return this.http.post(url, time_zone)
  }
}
