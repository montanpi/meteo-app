import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { GeocodingLocationResponse } from 'src/app/modules/weather/weather-client/types/geocoding-location-response'
import { GeocodingLocation } from 'src/app/modules/weather/weather-client/types/geocoding-location'

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss'],
})
export class LocationSearchComponent implements OnInit {
  formControl = new FormControl()
  filteredLocations: GeocodingLocation[] = []
  loading = false
  @Output()
  locationSelected = new EventEmitter<GeocodingLocation>()

  constructor(private http: HttpClient) {}

  onSelected(location: GeocodingLocation): void {
    this.locationSelected.emit(location)
  }

  displayWith(location: GeocodingLocation): string {
    if (location != null) {
      const { admin1, country, name } = location
      return `${name} (${admin1 ? `${admin1}, ` : ''}${country})`
    }
    return ''
  }

  clearSelection(): void {
    this.filteredLocations = []
    this.formControl.reset()
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        filter((value) => value && value.length > 1),
        distinctUntilChanged(),
        debounceTime(600),
        tap(() => {
          this.filteredLocations = []
          this.loading = true
        }),
        switchMap((name) =>
          this.http.get<GeocodingLocationResponse>(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`).pipe(
            map(({ results }: GeocodingLocationResponse): GeocodingLocation[] => results),
            finalize(() => {
              this.loading = false
            }),
          ),
        ),
      )
      .subscribe((locations: GeocodingLocation[]) => {
        this.filteredLocations = locations
      })
  }
}
