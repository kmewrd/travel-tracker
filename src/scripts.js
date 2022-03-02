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
  traveler.trips.map(trip => trip.getDestinationDetails(destinations));
}

function updateDashboard() {
  domUpdates.renderName(traveler.name);
  domUpdates.renderPendingTrips(traveler.trips);
  domUpdates.renderPastTrips(traveler.trips);
  getAnnualTravelExpenses();
}

function getAnnualTravelExpenses() {
  const currentYear = (new Date()).getFullYear().toString();
  console.log(currentYear);
  const tripsThisYear = traveler.trips.filter(trip => trip.date.includes(currentYear));
  console.log(tripsThisYear);
  domUpdates.renderAnnualTravelExpenses(traveler);
}

// event listeners
window.addEventListener('load', fetchAllData);
