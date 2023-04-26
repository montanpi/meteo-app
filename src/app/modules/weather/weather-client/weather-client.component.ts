import { Component, OnInit } from '@angular/core'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'

@Component({
  selector: 'app-weather-client',
  templateUrl: './weather-client.component.html',
  styleUrls: ['./weather-client.component.scss'],
})
export class WeatherClientComponent implements OnInit {
  weatherProviders: string[]
  currentWeatherProvider: string

  constructor(private readonly weatherFacade: WeatherFacadeService) {
    this.weatherProviders = this.weatherFacade.weatherProviders
    this.currentWeatherProvider = this.weatherFacade.currentWeatherProvider
  }

  ngOnInit() {
    console.warn(this.currentWeatherProvider)
    console.warn(this.weatherProviders)
  }
}
