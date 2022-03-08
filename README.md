# Travel Tracker

**A front end application built by Kim Ward.**

Travel Tracker is the final solo project built during Mod 2 of Turing School of Software & Design. This project focused on using Test Driven Development and Object Oriented Programming to build an interactive travel site where users can log in to view their trips and book a new trip. The Fetch API was used to retrieve and post data. Specifications for this project can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).

## Goals

- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

<img width="1440" alt="Login page for Travel Tracker website" src="https://user-images.githubusercontent.com/79027364/156955676-2ca728dd-72d9-41e5-8c7f-8603ab0f8617.png">

## How to Run

1. Clone the repo down to your machine
2. Clone the server repo [here](https://github.com/turingschool-examples/travel-tracker-api)
3. Open the root directory for each repo and run `npm install` to install dependencies
4. Run `npm start` in each repo to initialize the webpage and web server
5. Open the site by copying and pasting the server location http://localhost:8080/ in your address bar

---

## Features

**Login:**
On load, the user user sees a login form. To log in, enter `traveler` followed by a number between 1 and 50 in the username field. The password for all users is `traveler`.

**User Dashboard:**
Once logged in, a user can see all of their trips displayed and sorted by date according to trip type (upcoming, pending, or past). The header also includes the stats on how much they've spent on trips this year.

**Book a Trip:**
A booking form is displayed in the sidebar in desktop view. Users can fill out this form to request a new trip. Before submitting a request, the estimated cost for the trip is displayed when all form fields are valid. Upon submission the new trip populates in the Pending Trips column on the dashboard.

![Travel Tracker Application Demo](https://user-images.githubusercontent.com/79027364/157303638-016cfd41-808d-434a-afe8-4b8a53cb0999.gif)

#### Accessibility & Responsive Layout

This application was tested with Lighthouse and the WAVE Chrome extension in order to address the needs of all users.

![Travel Tracker Mobile View](https://user-images.githubusercontent.com/79027364/157307114-83033dd6-5b9b-472e-82a6-39dbca085007.gif)

---

### Technologies Used
- JavaScript
- CSS/SCSS
- HTML
- Webpack
- Mocha & Chai
- Atom

#### Future Additions & Improvements
- Add a logout button to the header.
- Add local storage to save requested trips.
- Add toggle to expand and collapse the form when it's at the top of the page.
- Allow users to filter view by all trips, upcoming trips, and pending trips.
- Add a profile view so users can view their account details and make changes to their name and traveler type.

#### Design Inspiration
For the color palette, I was inspired by Dribble creator Dmitry Lauretsky's [Travel Agency Website](https://dribbble.com/shots/15163981-Travel-Agency-Website). I also drew inspiration from the Airbnb booking site in using rounded corners, small cards for past trips, an approachable sans-serif font, and minimal pops of color.
