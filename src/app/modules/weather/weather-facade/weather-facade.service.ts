import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { WEATHER_PROVIDER } from 'src/app/modules/weather/shared'
import { WeatherData } from 'src/app/modules/weather/types'
import { WeatherProvider } from 'src/app/modules/weather/types'

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {
  private _currentWeatherProvider: WeatherProvider
  private _weatherData$ = new BehaviorSubject<WeatherData | null>(null)
  private _loading$ = new BehaviorSubject<boolean>(false)
  private _error$ = new BehaviorSubject<boolean>(false)

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

  get loading$(): Observable<boolean> {
    return this._loading$
  }

  get error$(): Observable<boolean> {
    return this._error$
  }

  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<void> {
    try {
      this._weatherData$.next(null)
      this._error$.next(false)
      this._loading$.next(true)
      const wd = await this._currentWeatherProvider.getWeatherData(latitude, longitude)
      this._weatherData$.next(wd)
    } catch (error) {
      this._error$.next(true)
    } finally {
      this._loading$.next(false)
    }
  }

  async getWeatherByGeolocation(): Promise<void> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        this.getWeatherByCoordinates(latitude, longitude)
      })
    }
  }
}
