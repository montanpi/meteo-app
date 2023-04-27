import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { NOT_AVAILABLE } from 'src/app/modules/weather/shared'
import { formatToLocalTime } from 'src/app/modules/weather/shared/util'
import { OpenMeteoWeatherData } from 'src/app/modules/weather/providers/open-meteo/open-meteo-weather-data'
import { WeatherData } from 'src/app/modules/weather/types/weather-data'
import { WeatherProvider } from 'src/app/modules/weather/types/weather-provider'
import { DateTime } from 'luxon'

const baseApiUrl =
  'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&timeformat=unixtime'

@Injectable({
  providedIn: 'root',
})
export class OpenMeteoService implements WeatherProvider {
  name = 'open-meteo'

  constructor(private readonly httpClient: HttpClient) {}

  async getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
    const openMeteoWeatherData = await firstValueFrom(
      this.httpClient.get<OpenMeteoWeatherData>(`${baseApiUrl}&latitude=${latitude}&longitude=${longitude}`),
    )
    return weatherDataAdapter(openMeteoWeatherData)
  }
}

function weatherDataAdapter(openMeteoWeatherData: OpenMeteoWeatherData): WeatherData {
  const {
    latitude,
    longitude,
    timezone,
    elevation,
    current_weather: { weathercode, temperature, windspeed, winddirection },
    daily,
    hourly,
  } = openMeteoWeatherData
  const offset = Number(DateTime.now().setZone(timezone).toFormat('H'))
  const adapted: WeatherData = {
    latitude: latitude.toFixed(2),
    longitude: longitude.toFixed(2),
    timezone,
    elevation: elevation.toFixed(),
    current: {
      chanceOfRain: NOT_AVAILABLE,
      feelLike: NOT_AVAILABLE,
      humidity: NOT_AVAILABLE,
      pressure: NOT_AVAILABLE,
      sunrise: formatToLocalTime(daily.sunrise[0], timezone),
      sunset: formatToLocalTime(daily.sunset[0], timezone),
      temperature: temperature.toFixed(),
      weatherCode: weathercode.toString(),
      windDirection: winddirection.toFixed(),
      windSpeed: windspeed.toFixed(),
    },
    daily: Array.from(new Array(5), (_, i) => ({
      max: daily.temperature_2m_max[i].toFixed(),
      min: daily.temperature_2m_min[i].toFixed(),
      weekDay: formatToLocalTime(daily.time[i], timezone, 'cccc'),
      weatherCode: weathercode.toString(),
    })),
    hourly: Array.from(new Array(24), (_, i) => ({
      temperature: hourly.temperature_2m[i + offset].toFixed(),
      time: formatToLocalTime(hourly.time[i + offset], timezone),
      weatherCode: hourly.weathercode[i + offset].toString(),
    })),
  }
  return adapted
}
