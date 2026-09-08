//ActionA: include rest timings on/off
//ActionB: switch speed units km/h or mph
//ActionC: switch time units 24h/12h
//ActionD: switch nearest serivces panel on/off


/**
 * The function checks if the current game is Euro Truck Simulator 2 (ETS2) and returns true if it is,
 * otherwise returns false.
 * @returns A boolean value indicating whether the current game is Euro Truck Simulator 2 (ETS2) or not. ATS is assumed to be false.
 */
function gameIsETS() {
	return $prop('DataCorePlugin.CurrentGame') == 'ETS2' ? true : false;
}

/**
 * ETS2 ONLY: The function "getCountry" takes a city as input and returns the country associated with that city.
 * @param city - The parameter "City" is the local name of a city.
 * @returns The country of the given city.
 */
function getCountry(city) {
	const country = ETS2_Cities.find(c => c.City == city).Country;
   return country != undefined ? country : '';
}


/**
 * ATS ONLY: The function "getState" takes a CityId as input and returns the State associated with that City.
 * @param cityId - The `cityId` parameter is the unique ID of a City. We use ID to overcome issues with duplicate city names.
 * @returns The State of the City that is passed as an argument to the function.
 */
function getState(cityId) {
	const state = ATS_Cities.find(c => c.LocalId == cityId).State;
   return state != undefined ? state : '';
}


/**
 * ETS2 ONLY:The function "getEnglishName" takes a city name as input and returns the corresponding English name of the city, or the original city name if no English name is available.
 * @param city - The parameter "city" is the name of a city in the ETS2_Cities array.
 * @returns the English name of a city in parentheses, along with the original city name, if available. If the English name is not available, it will return just the original city name.
 */
function getEnglishName(city) {
	const englishName = ETS2_Cities.find(c => c.City == city).en_gb;
	if (englishName == undefined) { return city; }
	return englishName != '' ? `${city} (${englishName})` : city;
}



const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const gameRestHours = gameIsETS() ? 9 : 10;
const drivetimeAllowed = gameIsETS() ? 11 : 14;


/**
 * The function calculates the number of rest stops required during a journey based on the remaining
 * time until the next rest stop and the estimated time of arrival.
 * @returns the number of rest stops required during a journey.
 */
function RestStopsRequired() {
	const nextRest = timespantoseconds($prop('GameRawData.CommonValues.NextRestStop.Time'));
	const eta = $prop('GameRawData.NavigationValues.NavigationTimeSeconds');
	if(eta < nextRest) return 0;

	const etaTime = eta - nextRest;
	const hours = etaTime / 60 / 60;
	const rests = hours / (drivetimeAllowed - 1); //added 1h 'buffer'
	return Math.floor(rests + 1);
}


function convertTo12h(time) {
	let hours = parseInt(format(time, 'hh'));
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	return `${hours ? hours : 12}:${format(time, 'mm')}${ampm}`;		
}


function calculateTimespan(startTime, endTime){
	let startTotalMinutes = (format(startTime, 'dd') * 24 * 60) + (format(startTime, 'hh') * 60) + format(startTime, 'mm');
	let endTotalMinutes = (format(endTime, 'dd') * 24 * 60) + (format(endTime, 'hh') * 60) + format(endTime, 'mm');
	let diffMinutes = endTotalMinutes - startTotalMinutes;
	return secondstotimespan(diffMinutes * 60);	
}

/**
 * Formats the remaining time into a human-readable string.
 *
 * The time should be in the format "dd.hh:mm:ss.ms".
 *
 * @param {string} time - The time string to format.
 * @param {boolean} [incRest=false] - Whether to include rest hours in the calculation.
 * @returns {string} The formatted time string.
 */
function formatRemainingTime(time, incRest = false) {
	let restHours = incRest ? RestStopsRequired() * gameRestHours : 0;
	let hours = (format(time, 'dd') * 24) + parseInt(format(time, 'hh')) + restHours;
	let hourString = hours != 0 ? `${hours}h` : '';
	let minutes = parseInt(format(time, 'mm'));
	let minuteString = minutes != 1 ? (minutes != 0 ? ` ${minutes}mins` : '') : ` ${minutes}min`;
	return `${hourString}${minuteString}`;
}

function remainingTimeSeconds(incRest = false){
	let restSeconds = incRest ? (RestStopsRequired() * gameRestHours) * 60 * 60 : 0;
	let seconds = timespantoseconds($prop('GameRawData.NavigationValues.NavigationTime')) + restSeconds;
	let diff = timespantoseconds($prop('GameRawData.JobValues.RemainingDeliveryTime.Time')) - seconds;

	return secondstotimespan(diff);
}



/**
 * Finds the closest city to the specified coordinates from an array of cities.
 * 
 * @param {number} targetX - The X coordinate of the target location.
 * @param {number} targetY - The Y coordinate of the target location.
 * @param {Array<{X: number, Y: number, City: string, Country: string}>} cities - An array of city objects containing X, Y coordinates, city name, and country name.
 * @returns {string} A formatted string in the format "CityName, CountryName" representing the closest city.
 */
function findClosestCity(targetX, targetY) {
	const cities = gameIsETS() ? ETS2_Cities : ATS_Cities;
    let closestCity = null;
    let minDistance = Infinity;
    for (const city of cities) {
        const distance = Math.sqrt(Math.pow(parseFloat(city.X) - targetX, 2) + Math.pow(parseFloat(city.Y) - targetY, 2));
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
        }
    }
	const formattedLocation = gameIsETS() ? 
		`${getEnglishName(closestCity.City)}, ${closestCity.Country}` : 
		`${closestCity.City}, ${closestCity.State}`;
    return formattedLocation;
}

function findClosestCityObject(targetX, targetY) {
	const cities = gameIsETS() ? ETS2_Cities : ATS_Cities;
    let closestCity = null;
    let minDistance = Infinity;
    for (const city of cities) {
        const distance = Math.sqrt(Math.pow(parseFloat(city.X) - targetX, 2) + Math.pow(parseFloat(city.Y) - targetY, 2));
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
        }
    }
	return closestCity;
}

function getClosestFacility(targetX, targetY, facilityType) {
    let minDistance = Infinity;
	let closestFacility = null;
	let Facilities = null;
	switch (facilityType) {
		case 'Parking':
			Facilities = gameIsETS() ? ETS2_Parking : ATS_Parking;
			break;
		case 'Fuel':
			Facilities = gameIsETS() ? ETS2_Fuel : ATS_Fuel;
			break;
		case 'Service':
			Facilities = gameIsETS() ? ETS2_Services : ATS_Services;
			break;
	}
	for (const facility of Facilities) {
		const distance = Math.sqrt(Math.pow(parseFloat(facility.X) - targetX, 2) + Math.pow(parseFloat(facility.Y) - targetY, 2));
		if (distance < minDistance) {
			minDistance = distance;
			closestFacility = facility;
		}
	}
	return closestFacility;
}

function getClosestFacilityDistance(targetX, targetY, facilityType) {
	let minDistance = Infinity;
	let distance = 0;
	let Facilities = null;
	switch (facilityType) {
		case 'Parking':
			Facilities = gameIsETS() ? ETS2_Parking : ATS_Parking;
			break;
		case 'Fuel':
			Facilities = gameIsETS() ? ETS2_Fuel : ATS_Fuel;
			break;
		case 'Service':
			Facilities = gameIsETS() ? ETS2_Services : ATS_Services;
			break;
			default:
			return null;
	}
	let closestFacility = null;
	for (const facility of Facilities) {
		distance = Math.sqrt(Math.pow(parseFloat(facility.X) - targetX, 2) + Math.pow(parseFloat(facility.Y) - targetY, 2));	
		if (distance < minDistance) {
			minDistance = distance;
			closestFacility = facility;
		}
	}
	return distance;
}


function getDistanceFromMe(facility = 'Parking', scale = false){
	const playerX = parseFloat($prop('DataCorePlugin.GameRawData.TruckValues.CurrentValues.PositionValue.Position.X'));
	const playerY = parseFloat($prop('DataCorePlugin.GameRawData.TruckValues.CurrentValues.PositionValue.Position.Z'));
	const Facility = getClosestFacility(playerX, playerY, facility);

	let distance = Math.sqrt(Math.pow(Facility.X - playerX, 2) + Math.pow(Facility.Y - playerY, 2));
	if(scale){
		const gameScale = parseInt($prop('GameRawData.CommonValues.Scale')) || 1;
		distance *= gameScale;
	}
	if(!gameIsETS()) {
		distance *= 1.60934; //convert km to miles for ATS. should this be 1.6213711922?
	}
	return distance.toFixed(2);
}


function getDistanceFromMeWithScale(facility = 'Parking'){
    const playerX = parseFloat($prop('DataCorePlugin.GameRawData.TruckValues.CurrentValues.PositionValue.Position.X'));
    const playerY = parseFloat($prop('DataCorePlugin.GameRawData.TruckValues.CurrentValues.PositionValue.Position.Z'));
    const scale = parseInt($prop('GameRawData.CommonValues.Scale')) || 1;
    
    const closestFacility = getClosestFacility(playerX, playerY, facility);
    if (!closestFacility) return `No ${facility} found`;
    
    let distance = Math.sqrt(Math.pow(closestFacility.X - playerX, 2) + Math.pow(closestFacility.Y - playerY, 2));
    distance *= scale; // Apply game scale to get real-world distance
    
    return `${distance.toFixed(2)}`;
}





//function for figuring out the direction of a target
function getDirection(currentX, currentY, targetX, targetY) {
	let angle = Math.atan2(currentY - targetY, targetX - currentX) * 180 / Math.PI;
	if (angle < 0) angle += 360;
	if (angle >= 337.5 || angle < 22.5) return 'East';
	if (angle >= 22.5 && angle < 67.5) return 'Northeast';
	if (angle >= 67.5 && angle < 112.5) return 'North';
	if (angle >= 112.5 && angle < 157.5) return 'Northwest';
	if (angle >= 157.5 && angle < 202.5) return 'West';
	if (angle >= 202.5 && angle < 247.5) return 'Southwest';
	if (angle >= 247.5 && angle < 292.5) return 'South';
	if (angle >= 292.5 && angle < 337.5) return 'Southeast';
	return '';
}

function convertToMiles(kilometers) {
 return kilometers * 0.6213711922;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}




