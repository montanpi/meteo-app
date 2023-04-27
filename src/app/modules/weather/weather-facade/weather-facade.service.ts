import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { WEATHER_PROVIDER } from 'src/app/modules/weather/constants'
import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { WeatherProvider } from 'src/app/modules/weather/types/weather-provider'

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {
  private _currentWeatherProvider: WeatherProvider
  private _weatherData$ = new BehaviorSubject<WeatherData | null>(null)

  constructor(@Inject(WEATHER_PROVIDER) private readonly _weatherProviders: WeatherProvider[]) {
    this._currentWeatherProvider = this._weatherProviders[0]
  }

  get weatherData$(): Observable<WeatherData | null> {
    return this._weatherData$.asObservable()
  }

  get weatherProviders(): string[] {
    return this._weatherProviders.map(({ name }) => name)
  }

  get currentWeatherProvider(): string {
    return this._currentWeatherProvider.name
  }

  set currentWeatherProvider(currentWeatherProvider: string) {
    const found = this._weatherProviders.find((wp) => wp.name === currentWeatherProvider)
    if (found) {
      this._currentWeatherProvider = found
    }
  }

  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<void> {
    const wd = await this._currentWeatherProvider.getWeatherData(latitude, longitude)
    this._weatherData$.next(wd)
  }

  async getWeatherByGeolocation(): Promise<void> {
    const latitude = 0
    const longitude = 0
    const wd = await this._currentWeatherProvider.getWeatherData(latitude, longitude)
    this._weatherData$.next(wd)
  }
}
