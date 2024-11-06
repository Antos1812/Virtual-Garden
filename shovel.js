document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    const scoreCounterDisplay = document.getElementById("scoreCounter");
    const plantGoldElement = document.getElementById("plantGold");
    let intervalId;
    
    //Garden boxes
    const g2 = document.getElementById("garden2");
    const g3 = document.getElementById("garden3");
    const g4 = document.getElementById("garden4");
    const g5 = document.getElementById("garden5");
    const g6 = document.getElementById("garden6");
    const g7 = document.getElementById("garden7");
    const g8 = document.getElementById("garden8");

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
            plant.style.width = '50'; 
            plant.style.height = 'auto'; 

            
            if (!plot.querySelector('img')) { 
                plot.innerHTML = ''; 
                plot.appendChild(plant); 

                function updateScore(){
                    score += 1;
                    scoreCounterDisplay.textContent = `Coins: ${score}`;

                    if(score >= 10 && !g2.classList.contains('visible')){
                        g2.classList.add('visible');
                    }

                    if(score >= 30 && !g3.classList.contains('visible')){
                        g3.classList.add('visible');
                    }
                    if(g3.classList.contains('visible')){
                        score += 2;
                        scoreCounterDisplay.textContent = `Coins: ${score}`;
                    }

                    if(score >= 100 && !g4.classList.contains('visible')){
                        g4.classList.add('visible');
                    }
                    if(g4.classList.contains('visible')){
                        score += 3;
                        scoreCounterDisplay.textContent = `Coins: ${score}`;
                    }
            
                    if(score >= 1000 && !plantGoldElement.classList.contains('visible')){
                        plantGoldElement.classList.add('visible');
                    }
                }

                if (!intervalId){
                    intervalId = setInterval(updateScore, 500);
                }
                updateScore()
            }
        });
    });
});
