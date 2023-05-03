# MeteoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Requirements

- Can search for locations with autocomplete input
- Can search for weather based on input location
- Can search for weather based on browser location
- Can select between different weater providers

### Weather data

- Weather for today
- Daily weather for next 5 days
- Hourly weather for the next 24 hours (in searched location local time)
- Weather icons based on weather codes
- Other details (sunrise, sunset, humidity, pressure, …)
- Weather data from all providers is adapted in a unified format

## Wireframe draw

### UI

![ui-mockup](./ui.drawio.png)

## UML Class Diagram

```plantuml
@startuml
class WeatherFacade {
    + weatherData
    + weatherProviders
    + currentWeatherProvider
    + getWeatherByLocation()
    + getWeatherByCoordinates()
}

class WeatherClient {
}

interface WeatherProvider {
    + name
    + getWeatherData()
}

class OpenMeteoService {
    + name
    + getWeatherData()
}

class OpenweathermapService {
    + name
    + getWeatherData()
}

interface WeatherData {
    latitude
    …
    current
    daily
    hourly
}

' interface OpenMeteoWeatherData {}
' interface OpenweathermapData {}

    ' OpenMeteoService ..> OpenMeteoWeatherData : gets
    ' OpenweathermapService ..> OpenweathermapData : gets
    OpenMeteoService ..|> WeatherProvider
    ' OpenMeteoService ..> WeatherData : adapts to
    ' OpenweathermapService ..> WeatherData : adapts to
    OpenweathermapService ..|> WeatherProvider
    WeatherFacade o-- "1..*" WeatherProvider
    ' WeatherFacade ..> WeatherData
    WeatherProvider ..> WeatherData
    WeatherClient --> WeatherFacade
@enduml
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
