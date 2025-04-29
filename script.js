

const systemInfo = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language,
  cookiesEnabled: navigator.cookieEnabled,
  online: navigator.onLine,
  screenResolution: `${screen.width}x${screen.height}`,
};

localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

const savedInfo = JSON.parse(localStorage.getItem('systemInfo'));
const footer = document.getElementById('footer-info');

if (savedInfo) {
  footer.innerHTML = `
    <p><strong>Device:</strong> ${savedInfo.platform}</p>
    <p><strong>Browser:</strong> ${savedInfo.userAgent}</p>
    <p><strong>Language:</strong> ${savedInfo.language}</p>
    <p><strong>Cookies Enabled:</strong> ${savedInfo.cookiesEnabled ? "Yes" : "No"}</p>
    <p><strong>Currently Online:</strong> ${savedInfo.online ? "Yes" : "No"}</p>
    <p><strong>Screen Size:</strong> ${savedInfo.screenResolution}</p>
  `;
}

// Логіка отримання даних зі сервера
// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.data-list');

  fetch('https://jsonplaceholder.typicode.com/posts/14/comments')
    .then(response => response.json())
    .then(json => {
      json.forEach(item => {
        const ul = document.createElement('ul');

        // Create a <li> only for ID
        const idLi = document.createElement('li');
        idLi.textContent = `ID: ${item.id}`;
        ul.appendChild(idLi);

        // Create plain text (without bullet) for name, email, body
        const name = document.createElement('div');
        name.textContent = `Name: ${item.name}`;

        const email = document.createElement('div');
        email.textContent = `Email: ${item.email}`;

        const body = document.createElement('div');
        body.textContent = `Body: ${item.body}`;

        // Append them inside the <ul> (they will not have bullets)
        ul.appendChild(name);
        ul.appendChild(email);
        ul.appendChild(body);

        // Optional: spacing
        ul.style.marginBottom = '20px';

        container.appendChild(ul);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});




// Логіка відправлення даних з форми

document.addEventListener('DOMContentLoaded', function () {
  // After 60 seconds, show modal
  setTimeout(() => {
    showModal();
  }, 10); // 60000 ms = 1 minute

  function showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Modal HTML content with a close (X) button
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-btn">&times;</button>
        <h2>Feedback</h2>
         <form action="https://formspree.io/f/xeogobzd" method="POST">
         <div class="modal-form">
  <label>
    Name:
    <input type="text" name="name" required>
  </label>
  

  <label>
    Email:
    <input type="email" name="email" required>
  </label>
  

  <label>
    Phone:
    <input type="tel" name="phone" required>
  </label>
  

  <label>
    Message:
    <textarea name="message" rows="5" required></textarea>
  </label>
 
     </div>

  <button type="submit" class="submit-button">Send</button>
</form>
   
      </div>


      

    `;

    

    document.body.appendChild(modal);

    // Close modal when the "X" is clicked
    const closeButton = modal.querySelector('.close-btn');
    closeButton.addEventListener('click', function () {
      modal.remove();
    });

    // Handle form submission
    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Form submitted!');
      modal.remove(); // Close modal after submit
    });
  }
});


document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  const icon = document.querySelector('.theme-toggle i');
  if (document.body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun'); // Change icon to sun
  } else {
    icon.classList.replace('fa-sun', 'fa-moon'); // Change icon back to moon
  }
});

// Функція для автоматичного перемикання теми залежно від часу доби
function setAutoTheme() {
  const currentHour = new Date().getHours(); // Отримуємо поточну годину
  if (currentHour >= 7 && currentHour < 21) {
    // Якщо година між 07:00 і 21:00, денна тема
    document.body.classList.remove('dark-theme');
    document.querySelector('.theme-toggle i').classList.replace('fa-sun', 'fa-moon'); // Ставимо іконку місяця
  } else {
    // Якщо година з 21:00 до 07:00, нічна тема
    document.body.classList.add('dark-theme');
    document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun'); // Ставимо іконку сонця
  }
}

// Викликаємо функцію для автоматичного перемикання теми при завантаженні сторінки
setAutoTheme();