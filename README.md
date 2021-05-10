# movable-ink

## Objective ##
To create functionality that when a `zip` parameter is passed into the query string, will display a weather forecast report for today as well as the two days after that.

## Installation ##
 - Download the repo into a folder called `movable-ink`
 - `cd moveable-ink` to change to that directory
 - `npm install` to ensure that all npm related packages are up-to-date
 - `npm run start` to run the server; the browser will then open to a blank page at URL `localhost:1234`
 - Click into the URL window of your browser and append `?zip=` followed by a zip code like `12345` for Schenectady, NY, or `20050` for Washington, D.C., or `90210` for Beverly Hills, CA, etc.

## Notes ##
 - The Geolocation API is an active API and will provide the correct information based on the zip code being passed into the URL. The Weather forecast API however, (after considerable investigation), is a mock API which repeats the same data each time. I've rendered the code such that were a developer to redirect the endpoint for the forecast API to an active _working_ endpoint, that the code would still work.
 - The display will only show if and only if a zip code is passed into the URL, for example `localhost:1234?zip=12345`, otherwise the browser will display nothing. This is intentional as if this were to be used in a real life scenario and the zip code was invalid, the best procedure would be for the functionality to not display anything rather than display an error for presentation reasons.
 - The focus on displaying the three-day forecast was through displaying the weather for the current date, tomorrow and the day after tomorrow. There is no look back in history on previous weather or further prediciton further down the line... 
