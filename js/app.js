function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock();

const pokemonTypesData = {
    labels: ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow'],
    datasets: [{
        label: 'Pokémon types',
        data: [0, 0, 1, 1, 0, 1, 2, 0, 0, 1, 3, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        backgroundColor: [
            '#A8A878', '#C03028', '#A890F0', '#A040A0', '#E0C068',
            '#B8A038', '#A8B820', '#705898', '#B8B8D0', '#F08030',
            '#6890F0', '#78C850', '#F8D030', '#F85888', '#98D8D8',
            '#7038F8', '#705848', '#EE99AC', '#68A090', '#705898'
        ],
        borderWidth: 2
    }]
};

const ctx1 = document.getElementById('chart1').getContext('2d');
new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: pokemonTypesData.labels.filter((_, i) => pokemonTypesData.datasets[0].data[i] > 0),
        datasets: [{
            data: pokemonTypesData.datasets[0].data.filter(value => value > 0),
            backgroundColor: pokemonTypesData.datasets[0].backgroundColor.filter((_, i) => pokemonTypesData.datasets[0].data[i] > 0)
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
    data: pokemonTypesData,
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
