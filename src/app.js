/* Assumptions

1) Zip code is provided through the query string, e.g. localhost:1234?zip=12345 for the weather in Schenectady, NY for example
2) No other dates are assumed save for today's date, we're doing forecasts for today, plus the two days from today's date (i.e. today, tomorrow and day after tomorrow)
3) If no zip code is provided through the "zip" query parameter then no display is shown
4) Given this is a mock forecast API, it appears no matter what city I use, it's displaying the same data, so just work with it. If this were to happen in a real life API development, the API would need to be investigated to ensure the response was correct. The Geolocation API appears to be working perfectly, though...
*/

// Initialize variables
let zipURL = 'https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=';
let forecastURL = 'https://se-weather-api.herokuapp.com/api/v1/forecast?';
let zipObj = {};
let forecastObj = {};
let today = new Date();
let yearVal = new Intl.DateTimeFormat('en-us', {
    year: 'numeric'
}).format(today);
let monthVal = new Intl.DateTimeFormat('en-us', {
    month: '2-digit'
}).format(today);
let dateVal = new Intl.DateTimeFormat('en-us', {
    day: '2-digit'
}).format(today);
let dateString = monthVal + '/' + dateVal + '/' + yearVal;

// Get Weather and display forecast
const getWeather = function(Obj) {

	// Check if zipcode is present in query object
    if (Obj.zip) {
    	// fetch zipcode information
        fetch(zipURL + Obj.zip).then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the response and extract data from zipObj and run another fetch
                // on the latitide, longitude and date
                response.json().then(function(data) {
                    zipObj = data;
                    fetch(forecastURL +
                        "latitude=" +
                        zipObj.latitude +
                        "&longitude=" +
                        zipObj.longitude +
                        "&date=" +
                        zipObj.date).then(
                        function(response2) {
                            if (response2.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' +
                                    response2.status);
                                return;
                            }
                            // Extract mock response from data and get first three elements 
                            // from the daily forecast array
                            response2.json().then(function(data2) {
                                forecastObj = data2;
                                let dailyData = forecastObj.daily.data
                                let threeDay = [dailyData[0], dailyData[1], dailyData[2]];

                                // Populate response, first get days of week for tomorrow and
                                // day after tomorrow
                                const tomorrow = new Date(today);
								const dayAfterTomorrow = new Date(today);
								tomorrow.setDate(tomorrow.getDate() + 1);
								dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
								
								// ... Now start filling up elements
								elem("weather-city").innerText = zipObj.city;
                                elem("weather-region").innerText = zipObj.regionCode;
                                elem("day1-heading").innerText = "Today:";
                                elem("day1-icon").setAttribute("class", threeDay[0].icon);
                                elem("day1-forecast").innerText = threeDay[0].icon;
                                elem("day1-temp-max").innerText =  threeDay[0].temperatureMax | 0;
								elem("day1-temp-min").innerText =  threeDay[0].temperatureMin | 0;

                                elem("day2-heading").innerText = getDoW(tomorrow.getDay()) + ":";
                                elem("day2-icon").setAttribute("class", threeDay[1].icon);
                                elem("day2-forecast").innerText = threeDay[1].icon;
                                elem("day2-temp-max").innerText =  threeDay[1].temperatureMax | 0;
								elem("day2-temp-min").innerText =  threeDay[1].temperatureMin | 0;

                                elem("day3-heading").innerText = getDoW(dayAfterTomorrow.getDay()) + ":";
                                elem("day3-icon").setAttribute("class", threeDay[2].icon) + ":";
                                elem("day3-forecast").innerText = threeDay[2].icon;
                                elem("day3-temp-max").innerText =  threeDay[2].temperatureMax | 0;
								elem("day3-temp-min").innerText =  threeDay[2].temperatureMin | 0;

								// show the weather info
								elem("display-weather").setAttribute("class", "show-weather");

                            });
                        }
                    );
                })
                .catch(function(err) {
                    console.log('Fetch Error :', err);
                });
            }
        );
    }
};

// Parse Query String into a Query Object
const parseQuery = function () {
	var search = location.search.substring(1);
	var query = (search.length) ? JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'): {}
	return query;
};

// Get Day of the week based on the DoW index returned from a dateObject.getDay() method
const getDoW = function(dayId) {
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayId];
};

// Quick polyfill to reference an element by its id
const elem = function (id) {
	return document.getElementById(id);
};

// Let's get the show on the road
getWeather(parseQuery());