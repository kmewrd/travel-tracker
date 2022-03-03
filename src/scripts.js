import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import helperFunctions from './utils';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// global variables
let traveler;
let travelers;
let trips;
let destinations;

// functions
function fetchAllData() {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then(data => {
    initializeData(2, data[0], data[1], data[2]);
    updateDashboard();
  })
}

function initializeData(travelerID, travelerData, tripsData, destinationsData) {
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(destination => new Destination(destination));
  traveler = travelers.find(traveler => traveler.id === travelerID)
  traveler.findMyTrips(trips);
  traveler.findMyDestinations(destinations);
}

function updateDashboard() {
  domUpdates.renderName(traveler.name);
  domUpdates.renderPendingTrips(traveler.trips);
  getPastTrips();
  getAnnualTravelExpenses();
}

function getPastTrips() {
  // need to get today's date in order to evaluate if trip date has passed
  const today = helperFunctions.getTodayDate();
  // this function sorts all of a traveler's trips by date and year, descending
  const myTrips = sortDateDescending(traveler.trips);
  // need some way to compare myTrips[0].date to today and see if it's less than today
  // if trip.date is less than today, then push trip into pastTrips
  // const pastTrips = myTrips.filter(trip => trip.date.includes());
  // domUpdates.renderPastTrips(pastTrips);
}

function checkDateFormat(trips) {
  trips.map(trip => {
    if (trip.date.length != 10) {
      console.log('found an anomaly!');
      let newDate = trip.date.split('/');
      if (newDate[1].length != 2) {
        console.log('the month is wrong');
        newDate[1] = newDate[1].padStart(2, '0');
      } else if (newDate[2].length != 2) {
        console.log('the date is wrong');
        newDate[2] = newDate[2].padStart(2, '0');
      }
      trip.date = newDate.join('/');
    }
  });
}

function sortDateDescending(trips) {
  checkDateFormat(trips);
  const datesSorted = trips.sort((a, b) => {
    let aa = a.date.split('/').reverse().join();
    let bb = b.date.split('/').reverse().join();
    if (bb < aa) {
      return -1;
    } else if (bb > aa) {
      return 1;
    } else {
      return 0;
    }
  });
  const yearsSorted = datesSorted.sort((a, b) => {
    let yearA = a.date;
    let yearB = b.date;
    if (yearB < yearA) {
      return -1;
    } else if (yearB > yearA) {
      return 1;
    } else {
      return 0;
    }
  });
  return yearsSorted;
}

function sortDateAscending(trips) {
  checkDateFormat(trips);
  const datesSorted = trips.sort((a, b) => {
    let aa = a.date.split('/').reverse().join();
    let bb = b.date.split('/').reverse().join();
    if (bb > aa) {
      return -1;
    } else if (bb < aa) {
      return 1;
    } else {
      return 0;
    }
  });
  const yearsSorted = datesSorted.sort((a, b) => {
    let yearA = a.date;
    let yearB = b.date;
    if (yearB > yearA) {
      return -1;
    } else if (yearB < yearA) {
      return 1;
    } else {
      return 0;
    }
  });
  return yearsSorted;
}

function getAnnualTravelExpenses() {
  const currentYear = (new Date()).getFullYear().toString();
  const tripsThisYear = traveler.trips.filter(trip => trip.date.includes(currentYear));
  if (tripsThisYear.length) {
    const totalCost = tripsThisYear.reduce((acc, trip) => {
      acc += (trip.duration * trip.destination.estimatedLodgingCostPerDay) + (trip.travelers * trip.destination.estimatedFlightCostPerPerson);
      return acc;
    }, 0);
    domUpdates.renderAnnualTravelExpenses(totalCost);
  }
}

// event listeners
window.addEventListener('load', fetchAllData);
