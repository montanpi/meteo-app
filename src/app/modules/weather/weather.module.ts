import { NgModule } from '@angular/core'

import { WeatherRoutingModule } from './weather-routing.module'
import { WeatherClientComponent } from 'src/app/modules/weather/weather-client/weather-client.component'
import { MaterialModule } from 'src/app/modules/material'
import { CommonModule } from '@angular/common'
import { WEATHER_PROVIDER } from './constants'
import { OpenMeteoService } from './providers/open-meteo/open-meteo.service'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'
import { OpenweathermapService } from 'src/app/modules/weather/providers/openweathermap/openweathermap.service'

@NgModule({
  imports: [CommonModule, WeatherRoutingModule, MaterialModule],
  providers: [
    { provide: WEATHER_PROVIDER, useClass: OpenMeteoService, multi: true },
    { provide: WEATHER_PROVIDER, useClass: OpenweathermapService, multi: true },
    WeatherFacadeService,
  ],
  declarations: [WeatherClientComponent],
})
export class WeatherModule {}
