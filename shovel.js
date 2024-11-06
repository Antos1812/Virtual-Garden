document.addEventListener('DOMContentLoaded', () => {
    let score = 900;
    const scoreCounterDisplay = document.getElementById("scoreCounter");
    const plantGoldElement = document.getElementById("plantGold");
    let intervalId; 
    let isIntervalRunning = false; 

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
            plant.style.width = '50px'; 
            plant.style.height = 'auto'; 

            
            if (!plot.querySelector('img')) { 
                plot.innerHTML = ''; 
                plot.appendChild(plant); 

                
                if (!isIntervalRunning) {
                    isIntervalRunning = true;
                    intervalId = setInterval(() => {
                        let activePlantsInGarden = 0;

                        
                        Array.from(gardenPlots).forEach(plot => {
                            if (plot.querySelector('img')) {
                                activePlantsInGarden++;
                            }
                        });

                        
                        if (activePlantsInGarden > 0) {
                            score += activePlantsInGarden;
                            scoreCounterDisplay.textContent = `Coins: ${score}`;
                        }

                        if (score >= 1000) {
                            plantGoldElement.style.display = "block";
                        }
                    }, 1000);
                }
            }
        });
    });
});
