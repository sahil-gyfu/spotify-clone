document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const playPauseButton = document.querySelector('.songbuttons img:nth-child(2)');
    const prevButton = document.querySelector('.songbuttons img:nth-child(1)');
    const nextButton = document.querySelector('.songbuttons img:nth-child(3)');
    const volumeButton = document.querySelector('#volume');
    const volumeSlider = document.querySelector('#volume-slider');
    const currentSongTitle = document.querySelector('#current-song');
    const currentTimeDisplay = document.querySelector('#current-time');
    const totalDurationDisplay = document.querySelector('#total-duration');
    
    
    let currentAudio = null;
    let currentIndex = -1;

    const songs = [
        { src: 'songs/tauba tauba.mp3', title: 'Tauba Tauba - Karan Aujla' },
        { src: 'songs/IDK HOW.mp3', title: 'IDK - Karan Aujla' },
        { src: 'songs/sluggerboy.mp3', title: 'SLUGGER BOY - BHAGGA' }
    ];

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            playSong(index);
        });
    });

    playPauseButton.addEventListener('click', () => {
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
            } else {
                currentAudio.pause();
            }
            updatePlayPauseIcon();
        }
    });

    


    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            playSong(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < songs.length - 1) {
            playSong(currentIndex + 1);
        }
    });

    let show = 0;
    volumeButton.addEventListener('click', () => {
        if (show === 0) {
            volumeSlider.style.display = "inline";
            show = 1;
        } else {
            volumeSlider.style.display = "none";
            show = 0;
        }
    });

    volumeSlider.addEventListener('input', () => {
        if (currentAudio) {
            currentAudio.volume = volumeSlider.value;
            console.log("Volume set to:", currentAudio.volume);

            if (volumeSlider.value === "0") {
                volumeButton.src = "volumeoff.svg";
            } else {
                volumeButton.src = "volumeon.svg";
            }
        } else {
            console.log("No audio is currently loaded.");
        }
    });

    function playSong(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset current song
        }
        currentAudio = new Audio(songs[index].src);
        currentAudio.volume = volumeSlider.value; // Set initial volume
        currentAudio.play();
        currentIndex = index;
        currentSongTitle.textContent = songs[index].title;

        currentAudio.addEventListener('timeupdate', updateTime);
        currentAudio.addEventListener('loadedmetadata', () => {
            totalDurationDisplay.textContent = formatTime(currentAudio.duration);
        });

        updatePlayPauseIcon();
    }

    function updateTime() {
        currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
    }

    function updatePlayPauseIcon() {
        if (currentAudio && currentAudio.paused) {
            playPauseButton.src = 'masterplay.svg'; // Change to play icon
        } else {
            playPauseButton.src = 'pause.svg'; // Change to pause icon
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
