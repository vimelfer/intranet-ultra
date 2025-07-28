function updateGreeting() {
  const greetingEl = document.getElementById("greeting");
  const dateEl = document.getElementById("current-date");
  const weekdayEl = document.getElementById("weekday");
  const iconEl = document.getElementById("weather-icon");

  const now = new Date();
  const hour = now.getHours();

  // Saudação
  let greeting = "Olá!";
  let icon = "fa-sun"; // ícone padrão

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia!";
    icon = "fa-sun";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde!";
    icon = "fa-cloud-sun";
  } else {
    greeting = "Boa noite!";
    icon = "fa-moon";
  }

  if (greetingEl) greetingEl.textContent = greeting;
  if (iconEl) iconEl.className = `fa ${icon}`;

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

// Executa ao carregar
updateGreeting();