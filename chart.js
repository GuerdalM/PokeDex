function renderPokeStatsChart() {
    const ctx = document.getElementById('myChart');


    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: pokeStatsName,
        datasets: [{
          label: 'Rate',
          data: pokeStats,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: 'rgba(0, 0, 0, 0.7)', 
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}
