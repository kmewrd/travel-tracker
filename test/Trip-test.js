import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip';
import testData from './data';

describe('Trip', () => {
  let trip1;
  let trip2;
  let trip3;
  let tripData;

  beforeEach(() => {
    tripData = testData.trips;
    trip1 = new Trip(tripData[0]);
    trip2 = new Trip(tripData[1]);
    trip3 = new Trip(tripData[2]);
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceof(Trip);
  })

  it('should have an id', () => {
    expect(trip1.id).to.equal(3);
  })

  it('should keep track of which user requested the trip', () => {
    expect(trip2.userID).to.equal(3);
  })

  it('should keep track of the trip destination', () => {
    expect(trip2.destinationID).to.equal(25)
  })

  it('should keep track of the number of travelers on the trip', () => {
    expect(trip1.travelers).to.equal(4);
  })

  it('should have a date', () => {
    expect(trip3.date).to.equal('2021/01/09');
  })

  it('should have a duration in days', () => {
    expect(trip3.duration).to.equal(15);
  })

  it('should keep track of its approval status', () => {
    expect(trip3.status).to.equal('approved');
  })

  it('should be able to hold suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
  })
});
