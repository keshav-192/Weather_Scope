let currentWeatherData = null;
        let isMetricUnits = true;
        // 🔧 API Configuration
        
        const API_KEY = '9c00f82eb607ad1fed45c3afdb0b956a';
        
        // ✅ Real weather data enabled!
        const USE_REAL_API = true;
        const DEBUG_MODE = false; // Disabled since API is working

        // Initialize the app
        document.addEventListener('DOMContentLoaded', async function() {
            updateCurrentDate();
            
            // Test API key if in debug mode
            if (DEBUG_MODE) {
                console.log('🚀 WeatherScope Debug Mode Enabled');
                const apiWorks = await testApiKey();
                if (!apiWorks) {
                    console.warn('⚠️ API key test failed - will use mock data');
                    showError('API key issue detected. Using demo data. Check console for details.');
                }
            }
            
            // Try to get user's location weather on load
            getCurrentLocationWeather();
        });

        // Update current date
        function updateCurrentDate() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
        }

        // Handle search on Enter key press
        function handleSearchKeyPress(event) {
            if (event.key === 'Enter') {
                searchWeather();
            }
        }

        // Search weather by city name
        async function searchWeather() {
            const cityInput = document.querySelector('.city-search-input');
            const cityName = cityInput.value.trim();
            
            if (!cityName) {
                showError('Please enter a city name');
                return;
            }

            showLoading(true);
            hideError();

            try {
                let weatherData;
                if (USE_REAL_API && API_KEY !== 'YOUR_32_CHARACTER_API_KEY_HERE' && API_KEY.length >= 32) {
                    console.log('🌐 Using Real API for search');
                    weatherData = await fetchWeatherData(cityName);
                } else {
                    console.log('🎭 Using Demo Data for search');
                    if (!USE_REAL_API) {
                        showError('Currently in demo mode. Add your API key to get real weather data!');
                    }
                    weatherData = getMockWeatherData(cityName);
                }
                displayWeatherData(weatherData);
                cityInput.value = '';
            } catch (error) {
                console.error('🚨 Search Weather Error Details:', error);
                
                // Show more specific error messages
                let errorMessage = 'Unable to fetch weather data. ';
                if (error.message.includes('404')) {
                    errorMessage = 'City not found. Please check the spelling and try again.';
                } else if (error.message.includes('401')) {
                    errorMessage = 'API key error. Using demo data while you verify your API key.';
                    console.warn('🔑 API Key Issue - Falling back to mock data');
                    // Fallback to mock data when API key fails
                    const weatherData = getMockWeatherData(cityName);
                    displayWeatherData(weatherData);
                    cityInput.value = '';
                    return;
                } else if (error.message.includes('429')) {
                    errorMessage = 'Too many requests. Please try again later.';
                } else if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Network error. Please check your internet connection.';
                } else {
                    errorMessage += error.message;
                }
                
                showError(errorMessage);
                console.error('Error fetching weather data:', error);
            } finally {
                showLoading(false);
            }
        }

        // Get current location weather
        function getCurrentLocationWeather() {
            if (navigator.geolocation) {
                showLoading(true);
                hideError();
                
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const { latitude, longitude } = position.coords;
                            let weatherData;
                            if (USE_REAL_API && API_KEY !== 'YOUR_32_CHARACTER_API_KEY_HERE' && API_KEY.length >= 32) {
                                console.log('🌐 Using Real API for location');
                                weatherData = await fetchWeatherDataByCoords(latitude, longitude);
                            } else {
                                console.log('🎭 Using Demo Data for location');
                                if (!USE_REAL_API) {
                                    showError('Demo mode: Showing sample location weather. Add API key for real data!');
                                }
                                weatherData = getMockWeatherDataByCoords(latitude, longitude);
                            }
                            displayWeatherData(weatherData);
                        } catch (error) {
                            console.error('🚨 Location Weather Error Details:', error);
                            
                            let errorMessage = 'Unable to fetch weather for your location. ';
                            if (error.message.includes('401')) {
                                errorMessage = 'API key error. Please check your API key.';
                            } else if (error.message.includes('Failed to fetch')) {
                                errorMessage = 'Network error. Please check your internet connection.';
                            } else {
                                errorMessage += error.message;
                            }
                            
                            showError(errorMessage);
                            console.error('Error:', error);
                        } finally {
                            showLoading(false);
                        }
                    },
                    (error) => {
                        showLoading(false);
                        showError('Location access denied. Please search for a city manually.');
                        console.error('Geolocation error:', error);
                    }
                );
            } else {
                showError('Geolocation is not supported by this browser');
            }
        }

        // Mock weather data (replace with real API calls)
        function getMockWeatherData(cityName) {
            return {
                name: cityName,
                country: 'Demo',
                temperature: Math.round(Math.random() * 30 + 5),
                feelsLike: Math.round(Math.random() * 30 + 5),
                description: 'Partly cloudy',
                icon: '⛅',
                humidity: Math.round(Math.random() * 50 + 30),
                windSpeed: Math.round(Math.random() * 20 + 5),
                pressure: Math.round(Math.random() * 50 + 1000),
                visibility: Math.round(Math.random() * 10 + 5),
                sunrise: '06:30',
                sunset: '18:45',
                forecast: generateMockForecast()
            };
        }

        function getMockWeatherDataByCoords(lat, lon) {
            return {
                name: 'Current Location',
                country: 'Your Area',
                temperature: Math.round(Math.random() * 30 + 5),
                feelsLike: Math.round(Math.random() * 30 + 5),
                description: 'Clear sky',
                icon: '☀️',
                humidity: Math.round(Math.random() * 50 + 30),
                windSpeed: Math.round(Math.random() * 20 + 5),
                pressure: Math.round(Math.random() * 50 + 1000),
                visibility: Math.round(Math.random() * 10 + 5),
                sunrise: '06:30',
                sunset: '18:45',
                forecast: generateMockForecast()
            };
        }

        function generateMockForecast() {
            const days = ['Tomorrow', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            const icons = ['☀️', '⛅', '☁️', '🌧️', '⛈️'];
            
            return days.map((day, index) => ({
                day: day,
                icon: icons[index % icons.length],
                high: Math.round(Math.random() * 15 + 20),
                low: Math.round(Math.random() * 10 + 10),
                description: 'Partly cloudy'
            }));
        }

        // Display weather data
        function displayWeatherData(data) {
            currentWeatherData = data;
            
            // Update main weather card
            document.getElementById('currentLocation').textContent = `${data.name}, ${data.country}`;
            document.getElementById('mainWeatherIcon').textContent = data.icon;
            document.getElementById('currentTemperature').textContent = `${data.temperature}°${isMetricUnits ? 'C' : 'F'}`;
            document.getElementById('weatherDescription').textContent = data.description;
            document.getElementById('feelsLikeTemp').textContent = `Feels like ${data.feelsLike}°${isMetricUnits ? 'C' : 'F'}`;
            
            // Update weather details
            document.getElementById('windSpeed').textContent = `${data.windSpeed} ${isMetricUnits ? 'km/h' : 'mph'}`;
            document.getElementById('humidity').textContent = `${data.humidity}%`;
            document.getElementById('visibility').textContent = `${data.visibility} ${isMetricUnits ? 'km' : 'mi'}`;
            document.getElementById('pressure').textContent = `${data.pressure} hPa`;
            document.getElementById('sunrise').textContent = data.sunrise;
            document.getElementById('sunset').textContent = data.sunset;
            
            // Update forecast
            displayForecast(data.forecast);
            
            // Show all sections
            document.getElementById('mainWeatherCard').style.display = 'block';
            document.getElementById('weatherDetailsGrid').style.display = 'grid';
            document.getElementById('forecastSection').style.display = 'block';
        }

        // Display forecast
        function displayForecast(forecast) {
            const container = document.getElementById('forecastContainer');
            container.innerHTML = '';
            
            forecast.forEach(day => {
                const card = document.createElement('div');
                card.className = 'forecast-card';
                card.innerHTML = `
                    <div class="forecast-day">${day.day}</div>
                    <div class="forecast-icon">${day.icon}</div>
                    <div class="forecast-temps">
                        <span class="forecast-high">${day.high}°</span>
                        <span class="forecast-low">${day.low}°</span>
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">${day.description}</div>
                `;
                container.appendChild(card);
            });
        }

        

        // Utility functions
        function showLoading(show) {
            document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
        }

        function showError(message) {
            const errorElement = document.getElementById('errorMessage');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                hideError();
            }, 5000);
        }

        function hideError() {
            document.getElementById('errorMessage').style.display = 'none';
        }

        // Real API functions with better error handling
        async function fetchWeatherData(cityName) {
            console.log(`🔍 Searching weather for: ${cityName}`);
            console.log(`🔑 Using API key: ${API_KEY.substring(0, 8)}...`);
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${isMetricUnits ? 'metric' : 'imperial'}`;
            console.log(`📡 Weather API URL: ${weatherUrl}`);
            
            try {
                const response = await fetch(weatherUrl);
                console.log(`📊 Weather API Response Status: ${response.status}`);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('❌ Weather API Error:', errorData);
                    throw new Error(errorData.message || `HTTP ${response.status}: Weather data not found`);
                }
                
                const data = await response.json();
                console.log('✅ Weather data received:', data);
                
                // Fetch 5-day forecast
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${isMetricUnits ? 'metric' : 'imperial'}`;
                const forecastResponse = await fetch(forecastUrl);
                
                let forecastData = { list: [] }; // Default empty forecast
                if (forecastResponse.ok) {
                    forecastData = await forecastResponse.json();
                    console.log('✅ Forecast data received');
                } else {
                    console.warn('⚠️ Forecast data failed, using mock forecast');
                }
                
                return processWeatherData(data, forecastData);
            } catch (error) {
                console.error('🚨 Fetch Weather Error:', error);
                throw error;
            }
        }

        async function fetchWeatherDataByCoords(lat, lon) {
            console.log(`🌍 Getting weather for coordinates: ${lat}, ${lon}`);
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${isMetricUnits ? 'metric' : 'imperial'}`;
            
            try {
                const response = await fetch(weatherUrl);
                console.log(`📊 Coordinates API Response Status: ${response.status}`);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('❌ Coordinates API Error:', errorData);
                    throw new Error(errorData.message || `HTTP ${response.status}: Weather data not found`);
                }
                
                const data = await response.json();
                console.log('✅ Location weather data received:', data);
                
                // Fetch 5-day forecast
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${isMetricUnits ? 'metric' : 'imperial'}`;
                const forecastResponse = await fetch(forecastUrl);
                
                let forecastData = { list: [] }; // Default empty forecast
                if (forecastResponse.ok) {
                    forecastData = await forecastResponse.json();
                    console.log('✅ Location forecast data received');
                } else {
                    console.warn('⚠️ Location forecast data failed, using mock forecast');
                }
                
                return processWeatherData(data, forecastData);
            } catch (error) {
                console.error('🚨 Fetch Location Weather Error:', error);
                throw error;
            }
        }

        function processWeatherData(data, forecastData) {
            console.log('🔄 Processing weather data...');
            
            // Process forecast data with error handling
            let forecast = [];
            try {
                if (forecastData && forecastData.list && forecastData.list.length > 0) {
                    forecast = processForecastData(forecastData);
                } else {
                    console.warn('⚠️ No forecast data available, using mock forecast');
                    forecast = generateMockForecast();
                }
            } catch (error) {
                console.error('❌ Forecast processing failed:', error);
                forecast = generateMockForecast();
            }
            
            const processedData = {
                name: data.name,
                country: data.sys.country,
                temperature: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                description: data.weather[0].description,
                icon: getWeatherIcon(data.weather[0].icon),
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * (isMetricUnits ? 3.6 : 1)), // Convert m/s to km/h or keep mph
                pressure: data.main.pressure,
                visibility: Math.round((data.visibility || 10000) / 1000),
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}),
                forecast: forecast
            };
            
            console.log('✅ Weather data processed successfully:', processedData);
            return processedData;
        }

        function processForecastData(forecastData) {
            const dailyForecasts = {};
            
            forecastData.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dayKey = date.toDateString();
                
                if (!dailyForecasts[dayKey]) {
                    dailyForecasts[dayKey] = {
                        day: getDayName(date),
                        icon: getWeatherIcon(item.weather[0].icon),
                        temps: [],
                        description: item.weather[0].description
                    };
                }
                
                dailyForecasts[dayKey].temps.push(item.main.temp);
            });
            
            return Object.values(dailyForecasts).slice(1, 6).map(day => ({
                day: day.day,
                icon: day.icon,
                high: Math.round(Math.max(...day.temps)),
                low: Math.round(Math.min(...day.temps)),
                description: day.description
            }));
        }

        function getDayName(date) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date().getDay();
            const targetDay = date.getDay();
            
            if (targetDay === (today + 1) % 7) return 'Tomorrow';
            return days[targetDay];
        }

        function getWeatherIcon(iconCode) {
            const iconMap = {
                '01d': '☀️', '01n': '🌙',
                '02d': '⛅', '02n': '☁️',
                '03d': '☁️', '03n': '☁️',
                '04d': '☁️', '04n': '☁️',
                '09d': '🌧️', '09n': '🌧️',
                '10d': '🌦️', '10n': '🌧️',
                '11d': '⛈️', '11n': '⛈️',
                '13d': '❄️', '13n': '❄️',
                '50d': '🌫️', '50n': '🌫️'
            };
            return iconMap[iconCode] || '☀️';
        }