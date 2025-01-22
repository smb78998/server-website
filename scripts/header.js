//display for header
export let serverName = 'Bob William';

export const displayTime= function displayTime() {
  const now = new Date();
  let timeString = now.toLocaleTimeString();

  document.querySelector('.js-header-info').innerHTML = `
  <div class="header-info">
      <p class="heder-info-time">${timeString}</p>
      <p class="heder-info-name">${serverName}</p>
    </div>
  `
}

