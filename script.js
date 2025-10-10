const apiKey = "ngJVmMBdTXrOJwcCKTdpeKlose7FmZcrRHhModFe";

const apodContent = document.getElementById("apodContent");
const particlesContainer = document.getElementById("particles");
const dateInput = document.getElementById("dateInput");
const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let selectedDate = new Date();
const minDate = new Date('1995-06-16');
const maxDate = new Date();

const availableDates = new Set();
const unavailableDates = new Set();

function createParticles() {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDelay = Math.random() * 15 + "s";
        particle.style.animationDuration = (10 + Math.random() * 20) + "s";
        particle.style.width = (2 + Math.random() * 3) + "px";
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDisplayDate(date) {
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

async function checkDateAvailability(dateStr) {
    if (availableDates.has(dateStr)) return true;
    if (unavailableDates.has(dateStr)) return false;
    
    try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateStr}`;
        const res = await fetch(url, { method: 'HEAD' });
        const isAvailable = res.ok;
        
        if (isAvailable) {
            availableDates.add(dateStr);
        } else {
            unavailableDates.add(dateStr);
        }
        
        return isAvailable;
    } catch (error) {
        unavailableDates.add(dateStr);
        return false;
    }
}

async function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    monthYear.textContent = date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDayOfWeek = firstDay.getDay();
    
    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'disabled');
        daysContainer.appendChild(emptyDay);
    }
    
    const promises = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        
        const currentDay = new Date(year, month, day);
        const dateStr = formatDate(currentDay);
        
        if (currentDay < minDate || currentDay > maxDate) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', () => {
                selectedDate = new Date(year, month, day);
                dateInput.value = formatDisplayDate(selectedDate);
                calendar.classList.remove('show');
                fetchAPOD(dateStr);
            });
            
            if (currentDay.toDateString() === new Date().toDateString()) {
                dayElement.classList.add('today');
            }
            
            if (currentDay.toDateString() === selectedDate.toDateString()) {
                dayElement.classList.add('selected');
            }
            
            promises.push(
                checkDateAvailability(dateStr).then(isAvailable => {
                    if (isAvailable) {
                        dayElement.classList.add('available');
                    } else {
                        dayElement.classList.add('unavailable');
                    }
                })
            );
        }
        
        daysContainer.appendChild(dayElement);
    }
    
    await Promise.all(promises);
}

function initCalendar() {
    renderCalendar(currentDate);
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    
    dateInput.addEventListener('click', () => {
        calendar.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!dateInput.contains(e.target) && !calendar.contains(e.target)) {
            calendar.classList.remove('show');
        }
    });
    
    selectedDate = new Date();
    dateInput.value = formatDisplayDate(selectedDate);
}

async function fetchAPOD(date = null) {
    apodContent.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <div class="loading-text">Exploring the cosmos...</div>
        </div>
    `;
    
    try {
        const fetchDate = date || formatDate(new Date());
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fetchDate}`;
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        apodContent.innerHTML = `
            <h2 id="title">${data.title || 'Cosmic Wonder'}</h2>
            <p id="date">${data.date ? new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date'}</p>
            <div class="media-container">
                ${data.media_type === "video" 
                    ? `<iframe id="apodVideo" src="${data.url}" frameborder="0" allowfullscreen></iframe>`
                    : `<img id="apodImage" src="${data.url}" alt="${data.title || 'Astronomy Picture'}">`
                }
            </div>
            <p id="explanation">${data.explanation || 'The universe holds endless mysteries waiting to be discovered.'}</p>
        `;
        
    } catch (error) {
        console.error("Error fetching APOD:", error);
        apodContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i><br>
                Cosmic connection failed!<br>
                Please check your API key and internet connection.<br>
                Error: ${error.message}
            </div>
            <button id="retryBtn" style="margin-top: 1.5rem; padding: 0.7rem 2rem; background: linear-gradient(45deg, #ff6b6b, #ff8fab); color: white; border: none; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 1.1rem; box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);">
                <i class="fas fa-redo"></i> Retry Cosmic Journey
            </button>
        `;
        document.getElementById("retryBtn").addEventListener("click", () => fetchAPOD(date));
    }
}

createParticles();
initCalendar();
fetchAPOD();