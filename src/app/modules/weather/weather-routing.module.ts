import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WeatherClientComponent } from 'src/app/modules/weather/weather-client/weather-client.component'

const routes: Routes = [{ path: '', component: WeatherClientComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
