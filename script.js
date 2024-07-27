document.addEventListener('DOMContentLoaded', function () {
  fetch('https://script.google.com/macros/s/AKfycbyUOtpuvbJuY5wj5CcbrQ-yEtcbBdBhdUY7XVaWg6kN3XatxULZpPypV8Fc8JDcS2VGuA/exec')
    .then(response => response.json())
    .then(data => buildPlans(data))
    .catch(error => console.error('Error fetching data:', error));

  function buildPlans(data) {
    const planNames = data[0]; // First row (A1:F1)
    const planPrices = data[1]; // Second row (A2:F2)
    const priceContainer = document.getElementById('price');

    planNames.forEach((name, index) => {
      const price = planPrices[index];
      const unit = index < 2 ? 'Hours' : 'Days'; // First 2 use "Hours", the rest use "Days"
      const planHtml = `
        <div class="plan plan-${index}">
          <div class="plan-inner">
            <div class="entry-title">
              <h3>${name}</h3>
              <div class="price">${price}<span> ${unit}</span></div>
            </div>
            <div class="entry-content">
              <ul></ul>
            </div>
            <div><a></a></div>
          </div>
        </div>
      `;
      priceContainer.innerHTML += planHtml;
    });
  }
});
