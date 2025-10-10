# CosmoPedia
A visually stunning web application that allows users to explore NASA's Astronomy Picture of the Day (APOD) for any date, featuring cosmic backgrounds, interactive calendar, and immersive animations.

## Description
This project is a front-end web application that fetches the Astronomy Picture of the Day from NASA's APOD API and displays it in an interactive, visually engaging interface. Users can select any date to view the respective astronomical media, which may be an image or a video, accompanied by a detailed explanation. The app is designed with a cosmic theme including animated stars, floating particles, and glassmorphic UI elements for a modern, immersive experience.

## Features
- Fetch and display NASA’s Astronomy Picture of the Day (image or video) with title, date, and description.
- Interactive calendar for selecting any date starting from June 16, 1995 (APOD launch date) to today.
- Highlights available and unavailable dates dynamically.
- Stunning cosmic background with animated stars and floating particles.
- Responsive design for desktops, tablets, and mobile devices.
- Glassmorphic APOD card with hover animations.
- Loading spinner with animated text during data fetch.
- Error handling with retry option if API request fails.
- Date formatting for both input field and displayed APOD date.
- Navigation for browsing previous and next months in the calendar.
- Smooth UI transitions and animations.

## How It Works
1. The app initializes by creating floating particles and setting up the interactive calendar.
2. The current date is selected by default and displayed in the input field.
3. When a date is selected:
   - The app checks whether data is available for that date via NASA’s APOD API.
   - If available, the app fetches the media (image/video) and description.
   - The APOD card updates dynamically with the fetched content.
4. Users can navigate months and select different dates via the calendar.
5. The app handles errors gracefully and allows retrying failed API requests.

## Functions and Their Purpose
- createParticles() – Generates animated floating particles in the background for visual effect.
- formatDate(date) – Converts a Date object into YYYY-MM-DD string format for API requests.
- formatDisplayDate(date) – Converts a Date object into a human-readable format (e.g., "October 3, 2025").
- checkDateAvailability(dateStr) – Checks if APOD data exists for a given date and caches the result.
- renderCalendar(date) – Renders the calendar for a given month with availability indicators.
- initCalendar() – Initializes the calendar, navigation buttons, and input interactions.
- fetchAPOD(date) – Fetches APOD data from NASA’s API and updates the UI.

## Installation & Usage
1. Clone or download the repository.
2. Open the index.html file in a modern web browser.
3. Use the date picker to select a date.
4. View the astronomy image or video along with its description.
5. If an error occurs (e.g., API failure), click "Retry Cosmic Journey" to attempt again.

OR 

- git clone https://github.com/cloudxplorer/CosmoPedia
- cd CosmoPedia
- python -m http.server 4444

Open your Browser and Visit.
- http://localhost:4444
- **DEMO**: [CosmoPedia](https://cloudxplorer.github.io/CosmoPedia).

## Usage Notes
- Replace the apiKey in script.js with your own NASA API key for production use.
- The application works best on modern browsers with support for CSS3 animations and Flexbox.
- Ensure internet connectivity to fetch APOD content.

## Tech Stack
- **HTML5**: Structure of the web application.
- **CSS3**: Styling with gradients, animations, and responsive design.
- **JavaScript (ES6+)**: Fetching API data, DOM manipulation, event handling, dynamic starfield creation.
- **API**: [NASA APOD API](https://api.nasa.gov/).
- **Font Awesome**: Icons for buttons and error messages.

## License
This project is open-source and free to use for personal and educational purposes.

