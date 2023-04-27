interface CurrentWeatherData {
  temperature: string
  weatherCode: string
  sunrise: string
  sunset: string
  feelLike: string
  chanceOfRain: string
  windSpeed: string
  windDirection: string
  humidity: string
  pressure: string
}

interface DailyWeatherData {
  weekDay: string
  min: string
  max: string
  weatherCode: string
}

interface HourlyWeatherData {
  time: string
  temperature: string
  weatherCode: string
}

export interface WeatherData {
  latitude: string
  longitude: string
  timezone: string
  elevation: string
  current: CurrentWeatherData
  daily: DailyWeatherData[]
  hourly: HourlyWeatherData[]
}
