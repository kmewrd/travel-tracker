const testData = {
  travelers: [
    {
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    }, {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker",
    }, {
      "id": 3,
      "name": "Sibby Dawidowitsch",
      "travelerType": "shopper",
    }
  ],
  destinations: [
    {
      "id": 7,
      "destination": "Paris, France",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 395,
      "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      "alt": "city during the day time with eiffel tower"
    }, {
      "id": 9,
      "destination": "Amsterdam, Netherlands",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 950,
      "image": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "canal with boats and trees and buildings along the side"
    }, {
      "id": 20,
      "destination": "Miami, Florida",
      "estimatedLodgingCostPerDay": 158,
      "estimatedFlightCostPerPerson": 275,
      "image": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
      "alt": "sand with palm trees and tall buildings in the background"
    }, {
      "id": 22,
      "destination": "Rome, Italy",
      "estimatedLodgingCostPerDay": 90,
      "estimatedFlightCostPerPerson": 650,
      "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "people standing inside a colosseum during the day"
    }, {
      "id": 25,
      "destination": "New York, New York",
      "estimatedLodgingCostPerDay": 175,
      "estimatedFlightCostPerPerson": 200,
      "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
    }, {
      "id": 28,
      "destination": "San Juan, Puerto Rico",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 900,
      "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
      "alt": "white and brown concrete buildings near sea under white clouds during daytime"
    }
  ],
  trips: [
    {
      "id": 3,
      "userID": 3,
      "destinationID": 22,
      "travelers": 4,
      "date": "2022/05/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 41,
      "userID": 3,
      "destinationID": 25,
      "travelers": 3,
      "date": "2020/08/30",
      "duration": 11,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 117,
      "userID": 1,
      "destinationID": 28,
      "travelers": 3,
      "date": "2021/01/09",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 166,
      "userID": 2,
      "destinationID": 7,
      "travelers": 2,
      "date": "2020/03/05",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 173,
      "userID": 3,
      "destinationID": 9,
      "travelers": 6,
      "date": "2020/04/21",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 177,
      "userID": 2,
      "destinationID": 20,
      "travelers": 6,
      "date": "2020/01/29",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    }
  ]
};

export default testData;
