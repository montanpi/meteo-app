import { InjectionToken } from '@angular/core'
import { WeatherProvider } from 'src/app/modules/weather/types'

export const WEATHER_PROVIDER = new InjectionToken<WeatherProvider>('weatherProvider')
