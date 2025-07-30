function updateGreeting() {
  const greetingEl = document.getElementById("greeting");
  const dateEl = document.getElementById("current-date");
  const weekdayEl = document.getElementById("weekday");

  const now = new Date();
  const hour = now.getHours();

  // Saudação
  let greeting = "Olá!";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia!";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde!";
  } else {
    greeting = "Boa noite!";
  }

  if (greetingEl) greetingEl.textContent = greeting;

  // Data atual (dd/mm)
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  if (dateEl) dateEl.textContent = `${day}/${month}`;

  // Dia da semana por extenso
  const weekdays = [
    "Domingo", "Segunda-feira", "Terça-feira",
    "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
  ];
  if (weekdayEl) weekdayEl.textContent = weekdays[now.getDay()];
}

async function updateWeather() {
  const apiKey = '00ee0427ae6c4827ba1152112252807'; // Substitua pela sua chave válida da WeatherAPI
  const city = 'Campo Grande';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pt`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (!data.current) {
      document.getElementById('weather-info').textContent = 'Clima indisponível';
      return;
    }

    const temp = Math.round(data.current.temp_c);
    const condition = data.current.condition.text.toLowerCase();
    let icon = 'fa-sun';

    if (condition.includes('nuvem') || condition.includes('nublado')) icon = 'fa-cloud';
    if (condition.includes('chuva')) icon = 'fa-cloud-showers-heavy';
    if (condition.includes('tempestade')) icon = 'fa-bolt';
    if (condition.includes('ensolarado')) icon = 'fa-sun';

    document.getElementById('weather-info').innerHTML =
      `<i class="fa ${icon}"></i> ${temp}&deg;C`;
  } catch (e) {
    document.getElementById('weather-info').textContent = 'Clima indisponível';
    console.error(e);
  }
}