let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let volumeSlider = document.getElementById("volume-slider");
let currentTitle = document.getElementById("current-title");
let currentArtist = document.getElementById("current-artist");
let currentSongImg = document.getElementById("current-song-img");
let currentSongIndex = 0;

let songs = Array.from(document.querySelectorAll(".song-details audio"));
let songIndex = 0;

const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

const playlist = [
    { src: "music/MITRAZ - Panah (Official Audio).mp3", title: "Panah", artist: "Mitraz", img: "pic/panah.jpeg" },
    { src: "music/Khwahish - Official Music Video  @MITRAZ & @aroohmusic   Latest Pop Song 2022.mp3", title: "Khwahish", artist: "Mitraz", img: "pic/Khwahish2.jpeg" },
    { src: "music/MITRAZ - Khayaal (Official Audio).mp3", title: "Khayaal", artist: "Mitraz", img: "pic/khayaal.jpeg" },
    { src: "music/Chadya.mp3", title: "Chadya", artist: "Mitraz", img: "pic/chadya2.jpg" },
    { src: "music/MITRAZ - Raatein (Official Audio).mp3", title: "Raatein", artist: "Mitraz", img: "pic/Raatein.jpg" },
    { src: "music/Noor E Khuda Full Video - My Name is KhanShahrukh KhanKajolAdnan SamiShreya Ghoshal.mp3", title: "Noor-E-Khuda", artist: "Adnan Sami", img: "pic/noor-e-khuda.jpg" },
    { src: "music/Tera Chehra Title Track Full (Audio) Song Adnan Sami Pop Album Songs.mp3", title: "Tera Chehra", artist: "Adnan Sami", img: "pic/tera-chehra2.jpg" }
];

// Volume Control
volumeSlider.oninput = function() {
    song.volume = this.value;
};

// Load the initial song
function loadSong(index) {
    song.src = playlist[index].src;
    document.querySelector('.details h2').textContent = playlist[index].title;
    document.querySelector('.details p').textContent = playlist[index].artist;
    document.querySelector('.song-img').src = playlist[index].img;

    song.load();
    song.play();
    updatePlayIcon();

    // Display total time when metadata is loaded
    song.onloadedmetadata = function() {
        totalTimeEl.textContent = formatTime(song.duration);
        progress.max = song.duration;
    };
}

// Format time in minutes and seconds
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Update current time and progress bar as song plays
song.ontimeupdate = function() {
    currentTimeEl.textContent = formatTime(song.currentTime);
    progress.value = song.currentTime;
};

// Update play/pause icon
function updatePlayIcon() {
    ctrlIcon.classList.add("fa-pause-circle");
    ctrlIcon.classList.remove("fa-circle-play");
}

// Seek song position when progress bar changes
progress.oninput = function() {
    song.currentTime = progress.value;
};

// Play or pause the song
function playPause() {
    if (ctrlIcon.classList.contains("fa-pause-circle")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause-circle");
        ctrlIcon.classList.add("fa-circle-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause-circle");
        ctrlIcon.classList.remove("fa-circle-play");
    }
}

// Select Song from Playlist
function selectSong(element) {
    let selectedAudio = element.querySelector("audio");
    song.src = selectedAudio.src;
    currentTitle.textContent = element.getAttribute("data-title");
    currentArtist.textContent = element.getAttribute("data-artist");
    currentSongImg.src = element.querySelector(".pic").src;
    playPause();
}

// Play the next song in the playlist
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
}

// Play the previous song in the playlist
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
}

// Update Current Song Info
function updateCurrentSong() {
    let newSong = songs[songIndex];
    song.src = newSong.src;
    currentTitle.textContent = newSong.closest(".song-details").getAttribute("data-title");
    currentArtist.textContent = newSong.closest(".song-details").getAttribute("data-artist");
    currentSongImg.src = newSong.closest(".song-details").querySelector(".pic").src;
    playPause();
}

// Search Songs
function searchSongs() {
    let searchText = document.getElementById("search-input").value.toLowerCase();
    document.querySelectorAll(".song-details").forEach(song => {
        let title = song.getAttribute("data-title").toLowerCase();
        let artist = song.getAttribute("data-artist").toLowerCase();
        song.style.display = title.includes(searchText) || artist.includes(searchText) ? "flex" : "none";
    });
}

// Filter Songs by Category
function filterSongs() {
    let category = document.getElementById("filter-category").value;
    document.querySelectorAll(".song-details").forEach(song => {
        let artist = song.getAttribute("data-artist");
        song.style.display = category === "all" || artist === category ? "flex" : "none";
    });
}

// Event listeners for next and previous icons
document.querySelector(".fa-forward-step").addEventListener("click", nextSong);
document.querySelector(".fa-backward-step").addEventListener("click", prevSong);

// Add event listeners to each song in the playlist
document.querySelectorAll('.song-details').forEach((songItem, index) => {
    songItem.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
    });
});

// Initialize the first song
loadSong(currentSongIndex);
