import { NgModule } from '@angular/core'

import { WeatherRoutingModule } from './weather-routing.module'
import { WeatherClientComponent } from 'src/app/modules/weather/weather-client/weather-client.component'
import { MaterialModule } from 'src/app/modules/material/material.module'
import { CommonModule } from '@angular/common'
import { WEATHER_PROVIDER } from './shared'
import { OpenMeteoService } from './providers/open-meteo/open-meteo.service'
import { WeatherFacadeService } from 'src/app/modules/weather/weather-facade/weather-facade.service'
import { OpenweathermapService } from 'src/app/modules/weather/providers/openweathermap/openweathermap.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { LocationSearchComponent } from './weather-client/location-search/location-search.component'
import { WeatherWidgetComponent } from './weather-client/weather-widget/weather-widget.component'

@NgModule({
  imports: [CommonModule, WeatherRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    { provide: WEATHER_PROVIDER, useClass: OpenweathermapService, multi: true },
    { provide: WEATHER_PROVIDER, useClass: OpenMeteoService, multi: true },
    WeatherFacadeService,
  ],
  declarations: [WeatherClientComponent, LocationSearchComponent, WeatherWidgetComponent],
})
export class WeatherModule {}
