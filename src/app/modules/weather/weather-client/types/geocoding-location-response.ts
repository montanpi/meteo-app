import { GeocodingLocation } from 'src/app/modules/weather/weather-client/types/geocoding-location'

export interface GeocodingLocationResponse {
  results: GeocodingLocation[]
  generationtime_ms: number
}
