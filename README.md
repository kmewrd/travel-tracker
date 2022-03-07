# Travel Tracker

**A front end application built by Kim Ward.**

Travel Tracker is the final solo project built during Mod 2 of Turing School of Software & Design. This project focused on using Test Driven Development and Object Oriented Programming to build an interactive travel site where users can log in to view their trips and book a new trip. The Fetch API was used to retrieve and post data. The specifications can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).

## Goals

- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

<img width="1440" alt="Screen Shot 2022-03-06 at 12 15 38 PM" src="https://user-images.githubusercontent.com/79027364/156936358-06fd6d74-f797-4ddc-bd4a-9103c84deb77.png">

## How to Run
1. Clone the repo down to your machine
2. Clone the server repo [here](https://github.com/turingschool-examples/travel-tracker-api)
3. Open the root directory for each repo and run `npm install` to install dependencies
4. Run `npm start` in each repo to initialize the webpage and web server
5. Open the site by copying and pasting the server location http://localhost:8080/ in your address bar

### Technologies Used
- JavaScript
- CSS
- HTML
- Webpack
- Mocha & Chai
- Atom

### Future Additions & Improvements
- Add a logout button to the header.
- Add local storage to save requested trips.
- Add toggle to expand and collapse the form when it's at the top of the page on mobile devices.
- Allow users to filter view by all trips, upcoming trips, and pending trips.
- Add a profile view so users can view their account details and make changes to their name and traveler type.
- Add a travel agency view with their own login and dashboard of trip requests. Allow them to approve or deny trip requests, search users by name, and view traveler profiles to suggest activities for their trips. Agents will also be able to see the total income generated this year and the number of travelers on trips for today's date.

### Design Inspiration
For the color palette, I turned to Dribble creator Dmitry Lauretsky's [Travel Agency Website](https://dribbble.com/shots/15163981-Travel-Agency-Website). I also drew inspiration from the Airbnb booking site in using rounded corners, small cards for past trips, an approachable sans-serif font, and minimal pops of color.

<!-- ---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory.

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages. -->
