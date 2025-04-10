function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock();

async function fetchPokemonData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();

        const labels = data.results.map(type => type.name);
        const counts = await Promise.all(
            data.results.map(async type => {
                const typeResponse = await fetch(type.url);
                const typeData = await typeResponse.json();
                return typeData.pokemon.length;
            })
        );

        updateCharts(labels, counts);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function updateCharts(labels, counts) {
    const backgroundColors = [
        '#A8A878', '#C03028', '#A890F0', '#A040A0', '#E0C068',
        '#B8A038', '#A8B820', '#705898', '#B8B8D0', '#F08030',
        '#6890F0', '#78C850', '#F8D030', '#F85888', '#98D8D8',
        '#7038F8', '#705848', '#EE99AC', '#68A090', '#705898'
    ];

    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: labels.filter((_, i) => counts[i] > 0),
            datasets: [{
                data: counts.filter(count => count > 0),
                backgroundColor: backgroundColors.slice(0, counts.length).filter((_, i) => counts[i] > 0)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Pokemon Types Donut'
                }
            }
        }
    });

    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Pokémon',
                data: counts,
                backgroundColor: backgroundColors.slice(0, counts.length)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Pokemon Types Bar'
                }
            }
        }
    });
}

fetchPokemonData();
