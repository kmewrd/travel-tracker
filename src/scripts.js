import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import helperFunctions from './utils';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// query selectors
const bookingForm = document.querySelector('booking-form');
const startDate = document.getElementById('start-date');
const tripDuration = document.getElementById('trip-duration');
const numOfGuests = document.getElementById('num-guests');
const tripDestination = document.getElementById('trip-destination');
const submitBookingButton = document.querySelector('.js-submit-booking-button');
const emptyFieldsErrorMessage = document.querySelector('.empty-fields-error-message');

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

function estimateTripCost() {
  const destination = destinations.find(destination => destination.id === tripDestination.value);
  const costBeforeAgencyFee = (tripDuration.value * destination.estimatedLodgingCostPerDay) + (numOfGuests.value * destination.estimatedFlightCostPerPerson);
  const estimatedTotal = constBeforeAgencyFee + (constBeforeAgencyFee * .10);
  return estimatedTotal;
}

function validateBookingForm() {
  if (!startDate.value || !tripDuration.value || !numOfGuests.value || !tripDestination.value) {
    showErrorMessage();
  } else {
    console.log('No errors here!');
    const newTrip = makeTripObject();
    console.log(newTrip);
    clearBookingForm();
  }
}

function makeTripObject() {
  return {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(tripDestination.value),
    travelers: parseInt(numOfGuests.value),
    date: startDate.value,
    duration: parseInt(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
}

function clearBookingForm() {
  startDate.value = '';
  tripDuration.value = '';
  numOfGuests.value = '';
  tripDestination.value = '0';
}

function showErrorMessage() {
  show([emptyFieldsErrorMessage]);
}

function show(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
}

function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

// event listeners
window.addEventListener('load', fetchAllData);
submitBookingButton.addEventListener('click', function(e) {
  e.preventDefault();
  validateBookingForm();
})
