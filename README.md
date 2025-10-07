# CosmoPedia
CosmoPedia is an interactive web application that lets users explore the universe through NASA's Astronomy Picture of the Day (APOD) API. Users can view stunning images and videos from space, along with detailed explanations of celestial phenomena, all within a visually immersive cosmic interface.

## Description
CosmoPedia brings the beauty of the universe to your screen. With a captivating cosmic-themed interface featuring blinking stars, smooth animations, and responsive design, users can explore NASA's daily space media. The application automatically fetches the Astronomy Picture of the Day and displays either images or videos, along with descriptions, titles, and dates. Users can refresh the content anytime to discover new cosmic wonders.

This project is perfect for space enthusiasts, students, and anyone fascinated by the mysteries of the universe.

## Features
- **NASA APOD Integration**: Fetches daily images or videos from NASA's Astronomy Picture of the Day API.
- **Cosmic UI**: Dynamic starfield background with blinking stars and gradient overlays for a visually stunning experience.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Loading & Error Handling**: Animated loading spinner while fetching data and graceful error messages if fetching fails.
- **Refresh Button**: Allows users to fetch a new APOD instantly.
- **Media Support**: Supports both images and videos.
- **Smooth Animations**: Hover effects, animated borders, and gradient text enhance the user experience.
- **Accessible & Interactive**: Easy-to-read explanations and interactive UI elements for a modern web experience.

## How It Works
1. On page load, the application initializes a blinking starfield and fetches the latest Astronomy Picture of the Day from NASA's API.
2. The fetched media (image or video) along with its title, date, and explanation is displayed in the main content area.
3. Users can click the "Refresh Cosmos" button to fetch a new APOD.
4. If an error occurs (e.g., network or API issues), a user-friendly error message appears with a retry button.
5. The application is fully responsive and adapts the starfield and media layout based on screen size.

## Functions & Features in Code

### createBlinkingStars()
- Dynamically generates stars in the background.
- Adjusts the number of stars based on screen width.
- Applies random position, size, animation delay, and duration for a realistic effect.

### fetchAPOD()
- Fetches Astronomy Picture of the Day from NASA API using fetch().
- Displays media (image or video), title, date, and explanation.
- Handles API errors gracefully and provides a retry mechanism.

### Event Listeners
- **Refresh Button**: Updates APOD content.
- **Window Resize**: Regenerates starfield on screen size change.

## Installation & Usage
1. Clone or download the repository.
2. Open index.html in a web browser.
3. Click Refresh Cosmos to fetch the latest Astronomy Picture of the Day.
4. Explore the explanations and media in the main container.
5. Resize the browser window to see dynamic starfield adjustments.

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

