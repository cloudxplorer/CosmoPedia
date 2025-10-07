const apiKey = "ngJVmMBdTXrOJwcCKTdpeKlose7FmZcrRHhModFe";
const apodContent = document.getElementById("apodContent");
const refreshBtn = document.getElementById("refreshBtn");
const blinkingStarsContainer = document.getElementById("blinkingStars");

function createBlinkingStars() {
    const starCount = window.innerWidth < 768 ? 80 : 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        star.style.left = `${left}vw`;
        star.style.top = `${top}vh`;
        
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 4;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        blinkingStarsContainer.appendChild(star);
    }
}

async function fetchAPOD() {
    apodContent.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <div class="loading-text">Exploring the cosmos...</div>
        </div>
    `;
    
    try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        apodContent.innerHTML = `
            <h2 id="title">${data.title || 'Cosmic Wonder'}</h2>
            <p id="date">${data.date || 'Unknown Date'}</p>
            <div class="media-container">
                ${data.media_type === "video" 
                    ? `<iframe id="apodVideo" src="${data.url}" frameborder="0" allowfullscreen></iframe>`
                    : `<img id="apodImage" src="${data.url}" alt="Cosmic Wonder">`
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
        document.getElementById("retryBtn").addEventListener("click", fetchAPOD);
    }
}

refreshBtn.addEventListener("click", fetchAPOD);
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        blinkingStarsContainer.innerHTML = '';
        createBlinkingStars();
    }, 250);
});

createBlinkingStars();
fetchAPOD();
