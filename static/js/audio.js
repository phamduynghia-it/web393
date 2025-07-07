document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const toggleBtn = document.getElementById("toggle-music-btn");
    const musicIcon = document.getElementById("music-icon");
    let hasStarted = false;
    let isPlaying = false;

    // Hiển thị nút trên mọi thiết bị
    if (toggleBtn) {
        toggleBtn.style.display = "block";
    }
    // Đặt icon mặc định là loa tắt nếu chưa phát nhạc
    updateMusicIcon();

    // Function to start music
    function startMusic() {
        if (!hasStarted) {
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then((_) => {
                        hasStarted = true;
                        isPlaying = true;
                        updateMusicIcon();
                        console.log("Music started successfully");
                    })
                    .catch((error) => {
                        console.log("Playback failed:", error);
                    });
            }
        } else {
            audio.play();
            isPlaying = true;
            updateMusicIcon();
        }
    }

    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updateMusicIcon();
    }

    function updateMusicIcon() {
        if (isPlaying) {
            musicIcon.innerHTML = "🎵"; // nốt nhạc khi bật
        } else {
            musicIcon.innerHTML = "&#x1F507;"; // loa tắt
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (isPlaying) {
                pauseMusic();
            } else {
                startMusic();
            }
        });
    }

    // Add touch event listener to the entire document
    document.addEventListener(
        "touchstart",
        function (e) {
            e.preventDefault();
            startMusic();
        },
        { once: true }
    ); // Only trigger once

    // Add click event listener as fallback for non-touch devices
    document.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            startMusic();
        },
        { once: true }
    ); // Only trigger once

    // Add event listener for when audio ends to restart it
    audio.addEventListener("ended", function () {
        audio.currentTime = 0;
        audio.play();
    });
});
