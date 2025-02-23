document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("quran.json");
    const quran = await response.json();
    const surahSelect = document.getElementById("surah");
    const quranText = document.getElementById("quran-text");
    
    quran.forEach(surah => {
        let option = document.createElement("option");
        option.value = surah.surah_number;
        option.textContent = `سورة رقم ${surah.surah_number}`;
        surahSelect.appendChild(option);
    });

    surahSelect.addEventListener("change", () => {
        const selectedSurah = quran.find(s => s.surah_number == surahSelect.value);
        quranText.innerHTML = selectedSurah.ayahs.map(a => `<p>${a.ayah_number}. ${a.text}</p>`).join("");
    });
});