import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { OpenweathermapWeatherData } from 'src/app/modules/weather/providers/openweathermap/openweathermap-weather-data'
import { NOT_AVAILABLE } from 'src/app/modules/weather/shared'
import { formatLatitude, formatLongitude, formatToLocalTime } from 'src/app/modules/weather/shared'
import { WeatherData } from 'src/app/modules/weather/types'
import { WeatherProvider } from 'src/app/modules/weather/types'

const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely,alerts'
// normally I'd use environment files to manage api keys
const appId = '1fa9ff4126d95b8db54f3897a208e91c'

@Injectable({
  providedIn: 'root',
})
export class OpenweathermapService implements WeatherProvider {
  name = 'openweathermap'

  constructor(private readonly httpClient: HttpClient) {}

  async getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
    const OpenweathermapWeatherData = await firstValueFrom(
      this.httpClient.get<OpenweathermapWeatherData>(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${appId}`),
    )
    return weatherDataAdapter(OpenweathermapWeatherData)
  }
}

// https://openweathermap.org/current
function weatherDataAdapter(openweathermapWeatherData: OpenweathermapWeatherData): WeatherData {
  const {
    lat,
    lon,
    timezone,
    current: {
      pressure,
      humidity,
      feels_like,
      temp,
      sunrise,
      sunset,
      weather: [currentWeather],
      wind_deg,
      wind_speed,
    },
    daily,
    hourly,
  } = openweathermapWeatherData
  const adapted: WeatherData = {
    latitude: formatLatitude(lat),
    longitude: formatLongitude(lon),
    timezone,
    elevation: NOT_AVAILABLE,
    current: {
      // ideally units of measurement like meters, degrees, etc. would be formatted by pipes, not by the adapter
      chanceOfRain: `${daily[0].pop.toFixed()}%`,
      feelsLike: `${feels_like.toFixed()}°C`,
      humidity: `${humidity}%`,
      pressure: `${pressure} hPa`,
      sunrise: formatToLocalTime(sunrise, timezone),
      sunset: formatToLocalTime(sunset, timezone),
      temperature: `${temp.toFixed()}°C`,
      weather: currentWeather.main,
      weatherImageUrl: imageUrlFrom(currentWeather.icon),
      windDirection: `${wind_deg.toFixed()}°`,
      windSpeed: `${wind_speed.toFixed()} km/h`,
    },
    daily: Array.from(new Array(5), (_, i) => ({
      max: `${daily[i].temp.max.toFixed()}°C`,
      min: `${daily[i].temp.min.toFixed()}°C`,
      weekDay: formatToLocalTime(daily[i].dt, timezone, 'cccc'),
      weather: daily[i].weather[0].main,
      weatherImageUrl: imageUrlFrom(daily[i].weather[0].icon),
    })),
    hourly: Array.from(new Array(24), (_, i) => ({
      temperature: `${hourly[i].temp.toFixed()}°C`,
      time: formatToLocalTime(hourly[i].dt, timezone),
      weatherImageUrl: imageUrlFrom(hourly[i].weather[0].icon),
    })),
  }
  return adapted
}

function imageUrlFrom(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}.png`
}
