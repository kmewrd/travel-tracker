import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// global variables
let traveler;
let trips;
let destinations;

// functions
function initializeData(travelerID, travelerData, tripsData, destinationsData) {
  travelerDetails = travelerData.find(traveler => traveler.id === travelerID);
  traveler = new Traveler(travelerDetails);
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(destination => new Destination(destination));
  traveler.findMyTrips(trips);
}

// event listeners
