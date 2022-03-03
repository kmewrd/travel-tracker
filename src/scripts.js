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
    initializeData(33, data[0], data[1], data[2]);
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
  getUpcomingTrips();
  getPastTrips();
  getPendingTrips();
  getAnnualTravelExpenses();
}

function getUpcomingTrips() {
  const today = {date: helperFunctions.getTodayDate()};
  const myTrips = [...traveler.trips];
  let upcomingTrips = [];
  myTrips.push(today);
  sortDateLeastRecent(myTrips);
  if (myTrips[myTrips.length - 1] === today) {
    console.log('There are no upcoming trips.')
  } else {
    const todayIndex = myTrips.indexOf(today);
    upcomingTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    domUpdates.renderUpcomingTrips(upcomingTrips);
  }
}

function getPastTrips() {
  const today = {date: helperFunctions.getTodayDate()};
  const myTrips = [...traveler.trips];
  let pastTrips = [];
  myTrips.push(today);
  sortDateMostRecent(myTrips);
  if (myTrips[0] === today) {
    console.log('All trips are past.')
    myTrips.shift();
    pastTrips = [...myTrips];
    domUpdates.renderPastTrips(pastTrips);
  } else {
    const todayIndex = myTrips.indexOf(today);
    pastTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    console.log(pastTrips);
    domUpdates.renderPastTrips(pastTrips);
  }
}

function getPendingTrips() {
  const myTrips = [...traveler.trips];
  const pendingTrips = myTrips.filter(trip => trip.status === 'pending');
  domUpdates.renderPendingTrips(pendingTrips);
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

function sortDateMostRecent(trips) {
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

function sortDateLeastRecent(trips) {
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

function compareTwoDates(dates) {

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
