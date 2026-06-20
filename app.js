// ==========================================
// SUMBER DATA: Dataset Kaggle (Top Spotify Songs 2023)
// ==========================================

// 10 baris representatif dari data CSV
const spotifyData = [
    { judul: "Seven (feat. Latto)", artis: "Jung Kook", streams: 141381703, bpm: 125, danceability: 80 },
    { judul: "LALA", artis: "Myke Towers", streams: 133716286, bpm: 92, danceability: 71 },
    { judul: "vampire", artis: "Olivia Rodrigo", streams: 140003974, bpm: 138, danceability: 51 },
    { judul: "Cruel Summer", artis: "Taylor Swift", streams: 800840817, bpm: 170, danceability: 55 },
    { judul: "WHERE SHE GOES", artis: "Bad Bunny", streams: 303236322, bpm: 144, danceability: 65 },
    { judul: "Sprinter", artis: "Dave, Central Cee", streams: 183706234, bpm: 141, danceability: 92 },
    { judul: "Ella Baila Sola", artis: "Eslabon Armado", streams: 725980112, bpm: 148, danceability: 67 },
    { judul: "Columbia", artis: "Quevedo", streams: 58149378, bpm: 100, danceability: 67 },
    { judul: "fukumean", artis: "Gunna", streams: 95217315, bpm: 130, danceability: 85 },
    { judul: "La Bebe - Remix", artis: "Peso Pluma", streams: 553634067, bpm: 170, danceability: 81 }
];

// Pemetaan data
const labelsLagu = spotifyData.map(lagu => lagu.judul);
const dataStreams = spotifyData.map(lagu => (lagu.streams / 1000000).toFixed(1));
const dataDanceability = spotifyData.map(lagu => lagu.danceability);
const dataBpm = spotifyData.map(lagu => lagu.bpm);

// Konfigurasi Chart (Animasi & Interaktif Aktif Default)
const commonOptions = {
    responsive: true,
    color: '#ffffff', // Warna teks legend
    animation: {
        duration: 1500,
        easing: 'easeOutQuart'
    },
    plugins: {
        tooltip: { enabled: true, backgroundColor: 'rgba(29, 185, 84, 0.9)', titleColor: '#fff', bodyColor: '#fff' },
        legend: { display: true, position: 'bottom', labels: { color: '#ffffff' } }
    }
};

// CHART 1: Bar Chart
const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: labelsLagu,
        datasets: [{
            label: 'Total Streams (Juta)',
            data: dataStreams,
            backgroundColor: 'rgba(30, 215, 96, 0.8)',
            borderColor: '#1DB954',
            borderWidth: 1
        }]
    },
    options: Object.assign({}, commonOptions, {
        scales: {
            x: { ticks: { color: '#b3b3b3' } },
            y: { ticks: { color: '#b3b3b3' } }
        }
    })
});

// CHART 2: Doughnut Chart
const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: labelsLagu,
        datasets: [{
            label: 'Skor Danceability (%)',
            data: dataDanceability,
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#E7E9ED', '#8AC926', '#1982C4', '#F15BB5'
            ],
            borderColor: '#1e1e1e',
            borderWidth: 2
        }]
    },
    options: commonOptions
});

// CHART 3: Line Chart
const ctxLine = document.getElementById('lineChart').getContext('2d');
new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: labelsLagu,
        datasets: [{
            label: 'Tempo Lagu (BPM)',
            data: dataBpm,
            borderColor: '#FFCE56',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    },
    options: Object.assign({}, commonOptions, {
        scales: {
            x: { ticks: { color: '#b3b3b3' } },
            y: { ticks: { color: '#b3b3b3' }, beginAtZero: false }
        }
    })
});

// ==========================================
// LOGIKA DOM UNTUK KARTU SOROTAN CEPAT (DINAMIS)
// ==========================================

// 1. Mencari lagu dengan Streams terbanyak
const laguTerbanyak = spotifyData.reduce((prev, current) => {
    return (prev.streams > current.streams) ? prev : current;
});
document.getElementById('top-stream-title').innerText = laguTerbanyak.judul;
document.getElementById('top-stream-val').innerText = `(${(laguTerbanyak.streams / 1000000).toFixed(1)} Juta Streams)`;

// 2. Mencari lagu dengan skor Danceability tertinggi
const laguTerasik = spotifyData.reduce((prev, current) => {
    return (prev.danceability > current.danceability) ? prev : current;
});
document.getElementById('top-dance-title').innerText = laguTerasik.judul;
document.getElementById('top-dance-val').innerText = `(Skor ${laguTerasik.danceability}%)`;

// 3. Menghitung Rata-rata Tempo (BPM)
const totalBpm = spotifyData.reduce((sum, lagu) => sum + lagu.bpm, 0);
const rataRataBpm = Math.round(totalBpm / spotifyData.length);
document.getElementById('avg-bpm-val').innerText = `${rataRataBpm} BPM`;
