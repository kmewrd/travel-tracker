import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import helperFunctions from './utils';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// Query Selectors

const bookingForm = document.querySelector('.js-booking-form');
const dashboard = document.querySelector('.js-trips-dashboard');
const startDate = document.getElementById('start-date');
const tripDuration = document.getElementById('trip-duration');
const numberOfGuests = document.getElementById('num-guests');
const tripDestination = document.getElementById('trip-destination');
const submitBookingButton = document.querySelector('.js-submit-booking-button');
const invalidDateErrorMessage = document.querySelector('.invalid-date-msg');
const invalidTripDurationMessage = document.querySelector('.invalid-duration-msg');
const invalidGuestsMessage = document.querySelector('.invalid-guests-msg');
const emptyFieldsErrorMessage = document.querySelector('.empty-fields-msg');
const estimatedTripCost = document.querySelector('.trip-estimated-cost');
const bookingSuccessMessage = document.querySelector('.success-message');
const loginView = document.querySelector('.js-login-view');
const userLogin = document.getElementById('username');
const userPassword = document.getElementById('password');
const invalidLoginErrorMessage = document.querySelector('.invalid-username-password-message');
const loginButton = document.querySelector('.js-login-button');
const welcomeMessage = document.querySelector('.js-welcome-message');
const expensesHeading = document.querySelector('.js-expenses');

// Global Variables

let traveler;
let trips;
let destinations;

// Functions

const initializeDestinations = destinationsData => {
  destinations = destinationsData.map(destination => new Destination(destination));
}

const initializeTraveler = (travelerData, tripsData) => {
  trips = tripsData.map(trip => new Trip(trip));
  traveler = new Traveler(travelerData);
  traveler.findMyTrips(trips);
  traveler.findMyDestinations(destinations);
}

const getRandomDestinationID = destinations => {
  let destinationID = Math.floor(Math.random() * destinations.length);
  if (destinationID === 0) {
    destinationID += 1;
  }
  return destinationID;
}

const generateBackgroundImage = () => {
  const destinationID = getRandomDestinationID(destinations);
  const destination = destinations.find(destination => destination.id === destinationID);
  domUpdates.renderBackgroundImage(destination.image, destination.alt);
}

const show = elements => {
  elements.forEach(element => element.classList.remove('hidden'));
  elements.forEach(element => element.classList.remove('invisible'));
}

const hide = elements => {
  elements.forEach(element => element.classList.add('hidden'));
}

const showDashboard = () => {
  hide([loginView]);
  show([bookingForm, dashboard, welcomeMessage, expensesHeading]);
}

const sortDateLeastRecent = trips => {
  const tripsSorted = trips.sort((a, b) => new Date(a.date) - new Date(b.date));
  return tripsSorted;
}

const sortDateMostRecent = trips => {
  const tripsSorted = trips.sort((a, b) => new Date(b.date) - new Date(a.date));
  return tripsSorted;
}

const getUpcomingTrips = () => {
  const today = {date: helperFunctions.getTodayDate()};
  const myTrips = [...traveler.trips];
  let upcomingTrips = [];
  myTrips.push(today);
  sortDateLeastRecent(myTrips);
  if (myTrips[myTrips.length - 1] != today) {
    const todayIndex = myTrips.indexOf(today);
    upcomingTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    upcomingTrips = helperFunctions.formatDateWithDay(upcomingTrips);
    domUpdates.renderUpcomingTrips(upcomingTrips);
  }
}

const getPastTrips = () => {
  const today = {date: helperFunctions.getTodayDate()};
  const myTrips = [...traveler.trips];
  let pastTrips = [];
  myTrips.push(today);
  sortDateMostRecent(myTrips);
  if (myTrips[0] === today) {
    myTrips.shift();
    pastTrips = [...myTrips];
    pastTrips = helperFunctions.formatMonthYear(pastTrips);
    domUpdates.renderPastTrips(pastTrips);
  } else if (myTrips[myTrips.length - 1] != today) {
    const todayIndex = myTrips.indexOf(today);
    pastTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    pastTrips = helperFunctions.formatMonthYear(pastTrips);
    domUpdates.renderPastTrips(pastTrips);
  } else {
    console.log('There are no past trips.')
  }
}

const getPendingTrips = () => {
  const myTrips = [...traveler.trips];
  let pendingTrips = myTrips.filter(trip => trip.status === 'pending');
  pendingTrips = helperFunctions.formatDateWithDay(pendingTrips);
  domUpdates.renderPendingTrips(pendingTrips);
}

const getAnnualTravelExpenses = () => {
  const totalCost = traveler.calculateAnnualExpenses().toFixed(2);
  domUpdates.renderAnnualTravelExpenses(totalCost);
}

const updateDashboard = () => {
  domUpdates.renderName(traveler.returnFirstName());
  getUpcomingTrips();
  getPastTrips();
  getPendingTrips();
  getAnnualTravelExpenses();
}

const fetchTravelerAndTrips = id => {
  Promise.all([fetchData(`travelers/${id}`), fetchData('trips')])
  .then(data => {
    initializeTraveler(data[0], data[1].trips);
    updateDashboard();
  })
}

const fetchDestinations = () => {
  Promise.all([fetchData('destinations')])
  .then(data => {
    initializeDestinations(data[0].destinations);
    generateBackgroundImage();
  })
}

const validateUsername = () => {
  let username = userLogin.value;
  const letters = username.split('').slice(0, 8).join('');
  const number = parseInt(username.split('').slice(8).join(''));
  if (username.length < 9 || number <= 0 || number > 50) {
    show([invalidLoginErrorMessage]);
    return false;
  } else {
    return number;
  }
}

const validatePassword = () => {
  const password = userPassword.value;
  if (password === "traveler") {
    return true;
  } else {
    show([invalidLoginErrorMessage]);
    return false;
  }
}

const authenticateUser = () => {
  const userID = validateUsername();
  const passwordIsValid = validatePassword();
  if (userID && passwordIsValid) {
    fetchTravelerAndTrips(userID);
    showDashboard();
  }
}

const validateTripDate = () => {
  const today = new Date(helperFunctions.getTodayDate());
  const todayDate = today.getDate();
  let yesterday = new Date(today);
  yesterday.setDate(todayDate - 1);
  const tripStartDate = new Date(startDate.value);
  if (tripStartDate <= yesterday) {
    show([invalidDateErrorMessage]);
    return false;
  } else {
    hide([invalidDateErrorMessage]);
    return true;
  }
}

const validateTripDuration = () => {
  if (tripDuration.value === '0') {
    show([invalidTripDurationMessage]);
    return false;
  } else {
    hide([invalidTripDurationMessage]);
    return true;
  }
}

const validateTripGuests = () => {
  if (numberOfGuests.value === '0') {
    show([invalidGuestsMessage]);
    return false;
  } else {
    hide([invalidGuestsMessage]);
    return true;
  }
}

const estimateTripCost = () => {
  const destinationID = parseInt(tripDestination.value);
  const myDestination = destinations.find(destination => destination.id === destinationID);
  const costBeforeAgencyFee = (tripDuration.value * myDestination.estimatedLodgingCostPerDay) + (numberOfGuests.value * myDestination.estimatedFlightCostPerPerson * 2);
  const estimatedTotal = costBeforeAgencyFee + (costBeforeAgencyFee * .10);
  return estimatedTotal;
}

const checkFieldsToShowTripCost = () => {
  const dateIsCorrect = validateTripDate();
  if (startDate.value && tripDuration.value && numberOfGuests.value && tripDestination.value != '0' && dateIsCorrect) {
    hide([emptyFieldsErrorMessage]);
    show([estimatedTripCost]);
    const newTripCost = estimateTripCost();
    domUpdates.renderEstimatedTripCost(newTripCost.toFixed(2));
  } else {
    hide([estimatedTripCost]);
  }
}

const validateBookingForm = () => {
  const dateIsCorrect = validateTripDate();
  if (!startDate.value || !tripDuration.value || !numberOfGuests.value || tripDestination.value === '0') {
    show([emptyFieldsErrorMessage]);
    return false;
  } else if (!dateIsCorrect) {
    show([invalidDateErrorMessage]);
    hide([estimatedTripCost, emptyFieldsErrorMessage]);
  } else {
    hide([emptyFieldsErrorMessage]);
    return true;
  }
}

const makeTripObject = () => {
  return {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(tripDestination.value),
    travelers: parseInt(numberOfGuests.value),
    date: startDate.value.split('-').join('/'),
    duration: parseInt(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
}

const clearBookingForm = () => {
  startDate.value = '';
  tripDuration.value = '';
  numberOfGuests.value = '';
  tripDestination.value = '0';
}

const showBookingSuccessMessage = () => {
  show([bookingSuccessMessage]);
  setTimeout(() => hide([bookingSuccessMessage]), 2000);
}

const submitBookingRequest = () => {
  const dateIsCorrect = validateTripDate();
  const durationIsValid = validateTripDuration();
  const numGuestsIsValid = validateTripGuests();
  if (startDate.value && tripDuration.value && numberOfGuests.value && tripDestination.value != '0' && dateIsCorrect && durationIsValid && numGuestsIsValid) {
    const newTrip = makeTripObject();
    Promise.all([postData('trips', newTrip)])
    .then(data => fetchTravelerAndTrips(traveler.id));
    hide([estimatedTripCost]);
    showBookingSuccessMessage();
    clearBookingForm();
  }
}

// Event Listeners

window.addEventListener('load', fetchDestinations);

loginButton.addEventListener('click', e => {
  e.preventDefault();
  authenticateUser();
});

bookingForm.addEventListener('input', () => {
  validateTripDate();
  validateTripDuration();
  validateTripGuests();
  checkFieldsToShowTripCost();
});

submitBookingButton.addEventListener('click', e => {
  e.preventDefault();
  validateBookingForm();
  submitBookingRequest();
});
