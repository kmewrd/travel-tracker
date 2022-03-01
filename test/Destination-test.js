import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination';
import testData from './data';

describe('Destination', () => {
  let destination1;
  let destination2;
  let destination3;
  let destinationData;

  beforeEach(() => {
    destinationData = testData.destinations;
    destination1 = new Destination(destinationData[0]);
    destination2 = new Destination(destinationData[1]);
    destination3 = new Destination(destinationData[2]);
  })

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  })

  it('should be an instance of Destination', () => {
    expect(destination2).to.be.an.instanceof(Destination);
  })

  it('should have an id', () => {
    expect(destination1.id)to.equal(7);
  })

  it('should have a location', () => {
    expect(destination1.location).to.equal('Paris, France');
  })

  it('should have an estimated lodging cost per day', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(100);
  })

  it('should have an estimated flight cost per person', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(395);
  })

  it('should have an image URL', () => {
    expect(destination2.image).to.equal('https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  })

  it('should have alt text for the image', () => {
    expect(destination2.alt).to.equal('canal with boats and trees and buildings along the side');
  })
});
