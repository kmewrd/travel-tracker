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
});
