import { Component } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { WeatherData } from 'src/app/modules/weather/types'
import { GeocodingLocation } from 'src/app/modules/weather/weather-client/types'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'

@Component({
  selector: 'app-weather-client',
  templateUrl: './weather-client.component.html',
  styleUrls: ['./weather-client.component.scss'],
})
export class WeatherClientComponent {
  weatherProviders: string[]
  currentWeatherProvider: string
  weatherData$: Observable<WeatherData | null>
  loading$: Observable<boolean>
  error$: Observable<boolean>
  clearLocation$: Observable<void>
  private _clearLocation$ = new Subject<void>()

  constructor(private readonly weatherFacade: WeatherFacadeService) {
    this.weatherProviders = this.weatherFacade.weatherProviders
    this.currentWeatherProvider = this.weatherFacade.currentWeatherProvider
    this.weatherData$ = this.weatherFacade.weatherData$
    this.loading$ = this.weatherFacade.loading$
    this.error$ = this.weatherFacade.error$
    this.clearLocation$ = this._clearLocation$.asObservable()
  }

  onWeatherProviderSelectionChange(weatherProvider: string): void {
    this.weatherFacade.currentWeatherProvider = weatherProvider
  }

  onLocationSelected(location: GeocodingLocation): void {
    const { latitude, longitude } = location
    this.weatherFacade.getWeatherByCoordinates(latitude, longitude)
  }

  onGeolocationButtonClick(): void {
    this._clearLocation$.next()
    this.weatherFacade.getWeatherByGeolocation()
  }
}
