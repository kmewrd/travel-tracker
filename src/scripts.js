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
    initializeData(42, data[0], data[1], data[2]);
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
  domUpdates.renderName(traveler.returnFirstName());
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
    console.log('You have trips coming up!')
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
    myTrips.shift();
    pastTrips = [...myTrips];
    domUpdates.renderPastTrips(pastTrips);
  } else {
    const todayIndex = myTrips.indexOf(today);
    pastTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    domUpdates.renderPastTrips(pastTrips);
  }
}

function getPendingTrips() {
  const myTrips = [...traveler.trips];
  const pendingTrips = myTrips.filter(trip => trip.status === 'pending');
  domUpdates.renderPendingTrips(pendingTrips);
}

function sortDateMostRecent(trips) {
  const tripsSorted = trips.sort((a, b) => new Date(b.date) - new Date(a.date));
  return tripsSorted;
}

function sortDateLeastRecent(trips) {
  const tripsSorted = trips.sort((a, b) => new Date(a.date) - new Date(b.date));
  return tripsSorted;
}

function getAnnualTravelExpenses() {
  const totalCost = traveler.calculateAnnualExpenses();
  domUpdates.renderAnnualTravelExpenses(totalCost);
}

// event listeners
window.addEventListener('load', fetchAllData);
