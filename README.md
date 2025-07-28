# WeatherScope - Interactive Weather App

A modern, responsive weather application that provides real-time weather conditions and 5-day forecasts for locations worldwide. Built with vanilla HTML, CSS, and JavaScript featuring beautiful animations and a glassmorphic design.

## 🌟 Features

- 🌤️ **Real-time Weather Data** - Current weather conditions using OpenWeatherMap API
- 📅 **5-Day Forecast** - Extended weather predictions
- 🔍 **City Search** - Search weather by city name
- 📍 **Geolocation Support** - Automatic location detection
- 🎨 **Beautiful UI** - Glassmorphic design with animated gradients
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌡️ **Comprehensive Data** - Temperature, humidity, wind speed, pressure, visibility
- ✨ **Smooth Animations** - Floating weather icons and transition effects

## 🛠️ Technologies Used

- **HTML5, CSS3, Vanilla JavaScript**
- **OpenWeatherMap API** - Real-time weather data
- **Geolocation API** - Location-based weather detection
## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/keshav-192/WeatherScope.git
cd WeatherScope
```

2. **Get your API key:**
- Sign up at [OpenWeatherMap](https://openweathermap.org/api)
- Generate a free API key

3. **Configure API key:**
- Open `weather.js`
- Replace the placeholder API key:
```javascript
const API_KEY = 'your_32_character_api_key_here';
```

4. **Launch the app:**
- Open `index.html` in your web browser
## 🎯 Usage

### Search by City
1. Type a city name in the search bar
2. Press Enter or click the search button (🔍)

### Use Current Location
1. Click the location button (📍)
2. Allow location access when prompted

## 📁 Project Structure

```
weatherscope/
│
├── index.html # Main HTML structure
├── weather.css # Styling and animations
├── weather.js # JavaScript functionality
└── README.md # Documentation
```
## 🔧 Configuration
# API Settings
In weather.js, you can modify:

javascript
const API_KEY = 'your_api_key_here'; // Your OpenWeatherMap API key
const USE_REAL_API = true; // Enable/disable real API calls
const DEBUG_MODE = false; // Enable console logging

## Units
The app uses metric units by default (Celsius, km/h, km). The isMetricUnits variable in weather.js controls this setting.

## 🎨 Design Features
## Glassmorphic UI
Semi-transparent cards with backdrop blur effects
Subtle borders and shadows
Smooth hover animations
## Animated Background
Dynamic gradient animation that shifts colors continuously
Creates an engaging visual experience
## Weather Icons
Emoji-based weather representations
Floating animation for main weather icon
Contextual icons for different weather conditions
## Responsive Grid
CSS Grid layout for weather details
Automatic column adjustment based on screen size
Mobile-optimized touch interactions
## 🔄 Fallback System
WeatherScope includes a robust fallback system:

Demo Mode: When API key is missing or invalid
Mock Data: Realistic sample weather data
Error Handling: User-friendly error messages
Network Resilience: Graceful handling of connection issues
## 🌐 API Integration
OpenWeatherMap API Endpoints Used:
Current Weather: api.openweathermap.org/data/2.5/weather
5-Day Forecast: api.openweathermap.org/data/2.5/forecast
## API Features Implemented:
Search by city name
Search by geographic coordinates
Metric and imperial unit support
Comprehensive weather data parsing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)

---

## 📞 Contact
Name - @keshav-192 - keshavsinghjnv677999@gmail.com

Project Link: https://keshav-192.github.io/Weather_Scope/

**Made by [Keshav Singh]**

