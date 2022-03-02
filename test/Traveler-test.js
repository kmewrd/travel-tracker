import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler';
import Trip from '../src/Trip'
import testData from './data';

describe('Traveler', () => {
  let traveler1;
  let traveler2;
  let traveler3;
  let travelerData;
  let tripData;
  let allTrips;

  beforeEach(() => {
    travelerData = testData.travelers;
    tripData = testData.trips;
    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
    traveler3 = new Traveler(travelerData[2]);
    allTrips = tripData.map(trip => new Trip(trip));
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  })

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
  })

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1);
  })

  it('should have a name', () => {
    expect(traveler2.name).to.equal('Rachael Vaughten');
  })

  it('should have a type', () => {
    expect(traveler3.travelerType).to.equal('shopper');
  })

  it('should hold all past, present, upcoming, and pending trips', () => {
    expect(traveler1.trips).to.deep.equal([]);
  })

  it('should be able to find all trips belonging to this traveler', () => {
    expect(traveler2.trips).to.deep.equal([]);

    traveler2.findMyTrips(allTrips);

    expect(traveler2.trips.length).to.equal(3);
  })
});
