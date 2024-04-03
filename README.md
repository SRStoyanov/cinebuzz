# Cinebuzz

Cinebuzz is a simplified Letterboxd clone built with AngularJS. It uses Firebase Authentication for user authentication and Firestore for the backend database. The application is styled with Tailwind CSS and is deployed live to Firebase Hosting and available at https://cinebuzz-34f85.web.app.

## Features

- **Guest Users:** Can search for movies and read any reviews published on the website. They can also view movie details such as title, year of release, synopsis, and poster, courtesy of themoviedb.org's API.
- **Registered Users:** Can write, edit, and delete their own reviews (CRUD). They can also browse their own user profiles as well as other users' profiles.

## Installation

First, install the dependencies:

```bash
npm i

```

Then, run the application:

```bash
ng serve

```

Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Future Improvements

- Better generalize code used in write-review and edit-review.
- Better generalize code used in write-review and navbar (for the search functionality).
- Make the UI fully responsive, and generally improve the UI.
- Hide API key and access it via the Firebase hosting.
- Better protect the /edit-review and /user-profile routes.
- Implement unit testing.
- Add loading states for making API requests.

## Known Bugs

- If the movie-detail view has rendered about one movie, and the user somehow reroutes to a different /movies/:movieId, the view doesn't change.
