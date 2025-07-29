document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const location = document.getElementById('locationInput').value;
  const apiKey = "89cbc7a0b9534dd7bfc174017252907";  // 🔁 Replace with your real API key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      return response.json();
    })
    .then(data => {
      const weatherHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <img src="${data.current.condition.icon}" alt="weather icon">
      `;
      document.getElementById('weatherResult').innerHTML = weatherHTML;
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});

