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
});
