import { Component, Input } from '@angular/core'
import { WeatherData } from 'src/app/modules/weather/types/weather-data'

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent {
  url = 'https://openweathermap.org/img/wn/10d@2x.png'
  weatherImageUrl = `url(${this.url})`
  @Input() weatherData: WeatherData | null = null
}
