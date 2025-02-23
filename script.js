document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("quran.json");
    const quran = await response.json();
    const surahSelect = document.getElementById("surah");
    const quranText = document.getElementById("quran-text");
    const increaseFontButton = document.getElementById("increase-font");
    const decreaseFontButton = document.getElementById("decrease-font");
    const themeToggle = document.getElementById("theme-toggle");
    const countdownElement = document.getElementById("countdown");
    const lastPartElement = document.getElementById("last-part");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }

    // Load saved font size
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
        quranText.style.fontSize = savedFontSize;
    }

    // Load last selected surah
    const savedSurah = localStorage.getItem("lastSurah");
    if (savedSurah) {
        surahSelect.value = savedSurah;
        const selectedSurah = quran.find(s => s.surah_number == savedSurah);
        quranText.innerHTML = selectedSurah.ayahs.map(a => `<p>${a.ayah_number}. ${a.text}</p>`).join("");
    }

    // Populate surah select
    quran.forEach(surah => {
        let option = document.createElement("option");
        option.value = surah.surah_number;
        option.textContent = `سورة رقم ${surah.surah_number}`;
        surahSelect.appendChild(option);
    });

    surahSelect.addEventListener("change", () => {
        const selectedSurah = quran.find(s => s.surah_number == surahSelect.value);
        quranText.innerHTML = selectedSurah.ayahs.map(a => `<p>${a.ayah_number}. ${a.text}</p>`).join("");
        localStorage.setItem("lastSurah", surahSelect.value);
    });

    // Font size controls
    increaseFontButton.addEventListener("click", () => {
        const currentSize = parseFloat(window.getComputedStyle(quranText).fontSize);
        quranText.style.fontSize = `${currentSize + 2}px`;
        localStorage.setItem("fontSize", quranText.style.fontSize);
    });

    decreaseFontButton.addEventListener("click", () => {
        const currentSize = parseFloat(window.getComputedStyle(quranText).fontSize);
        quranText.style.fontSize = `${currentSize - 2}px`;
        localStorage.setItem("fontSize", quranText.style.fontSize);
    });

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDarkTheme = document.body.classList.contains("dark-theme");
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    });

    // Countdown timer
    const endDate = new Date("2025-04-01"); // Set your end date here
    function updateCountdown() {
        const now = new Date();
        const timeLeft = endDate - now;
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        countdownElement.textContent = `${daysLeft} يوم`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Track last part
    const trackerForm = document.getElementById("tracker-form");
    trackerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const part = document.getElementById("part").value;
        lastPartElement.textContent = part;
        localStorage.setItem("lastPart", part);
    });

    // Load last part
    const savedPart = localStorage.getItem("lastPart");
    if (savedPart) {
        lastPartElement.textContent = savedPart;
    }
});
