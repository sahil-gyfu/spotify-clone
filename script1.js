document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const playPauseButton = document.querySelector('.songbuttons img:nth-child(2)');
    const prevButton = document.querySelector('.songbuttons img:nth-child(1)');
    const nextButton = document.querySelector('.songbuttons img:nth-child(3)');
    let currentAudio = null;
    let currentIndex = -1;
    const songs = [
        'songs/tauba tauba.mp3',
        'songs/IDK HOW.mp3',
        'songs/sluggerboy.mp3'
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

    function playSong(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset current song
        }
        currentAudio = new Audio(songs[index]);
        currentAudio.play();
        currentIndex = index;
        updatePlayPauseIcon();
    }

    function updatePlayPauseIcon() {
        if (currentAudio && currentAudio.paused) {
            playPauseButton.src = 'masterplay.svg'; // Change to play icon
        } else {
            playPauseButton.src = 'pause.svg'; // Change to pause icon
        }
    }
});
