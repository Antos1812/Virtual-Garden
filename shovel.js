document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    const scoreCounterDisplay = document.getElementById("scoreCounter");

    const plants = document.querySelectorAll(".plant");
    plants.forEach(plant => {
        plant.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    const gardenPlots = document.getElementsByClassName("Garden")[0].children;
    Array.from(gardenPlots).forEach(plot => {
        plot.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        plot.addEventListener('drop', (e) => {
            e.preventDefault();
            const plantId = e.dataTransfer.getData('text/plain');
            const plant = document.getElementById(plantId).cloneNode(true);

            plant.removeAttribute('draggable');
            plant.style.cursor = 'default';
            plant.style.width = '50'; // Ustaw szerokość na 100%
            plant.style.height = 'auto'; // Ustaw wysokość na auto, aby zachować proporcje

            // Dodanie rośliny do pola
            if (!plot.querySelector('img')) { // Sprawdź, czy nie ma już obrazka
                plot.innerHTML = ''; // Czyść pole przed dodaniem nowej rośliny
                plot.appendChild(plant); // Dodaj nową roślinę do pola
                window.setInterval(function () {
                    score += 1;
                    scoreCounterDisplay.textContent = `Coins: ${score}`;
                }, 1000);
            };
        });
    });
});
