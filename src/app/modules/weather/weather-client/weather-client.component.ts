import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { GeocodingLocation } from 'src/app/modules/weather/weather-client/types/geocoding-location'
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

  constructor(private readonly weatherFacade: WeatherFacadeService) {
    this.weatherProviders = this.weatherFacade.weatherProviders
    this.currentWeatherProvider = this.weatherFacade.currentWeatherProvider
    this.weatherData$ = this.weatherFacade.weatherData$
    this.loading$ = this.weatherFacade.loading$
    this.error$ = this.weatherFacade.error$
  }

  onWeatherProviderSelectionChange(weatherProvider: string): void {
    this.weatherFacade.currentWeatherProvider = weatherProvider
  }

  onLocationSelected(location: GeocodingLocation): void {
    const { latitude, longitude } = location
    this.weatherFacade.getWeatherByCoordinates(latitude, longitude)
  }

  onGeolocationButtonClick(): void {
    this.weatherFacade.getWeatherByGeolocation()
  }
}
