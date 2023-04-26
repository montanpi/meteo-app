export interface WeatherData {
  latitude: string
  longitude: string
  timezone: string
  timezoneAbbreviation: string | null
  elevation: string | null
  current: {
    temperature: string
    weatherCode: string
    sunrise: Date
    sunset: Date
    feelLike: string | null
    chanceOfRain: string | null
    windSpeed: string
    windDirection: string | null
    humidity: string | null
    pressure: string | null
  }
  daily: [
    {
      min: string
      max: string
      weatherCode: string
    },
  ]
  hourly: [
    {
      temperature: string
      weatherCode: string
    },
  ]
}
