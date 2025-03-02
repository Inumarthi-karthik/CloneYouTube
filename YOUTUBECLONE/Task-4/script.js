const video = document.getElementById("videoPlayer");
const overlay = document.getElementById("overlay");
const commentSection = document.getElementById("commentSection");

let tapCount = 0;
let lastTapTime = 0;

overlay.addEventListener("click", (event) => {
    const now = new Date().getTime();
    tapCount++;

    if (tapCount === 1) {
        setTimeout(() => {
            if (tapCount === 1) {
                // Single tap: Play/Pause
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            } else if (tapCount === 2) {
                // Double tap: Check left or right
                if (event.clientX > window.innerWidth / 2) {
                    // Right side double-tap: Skip 10s
                    video.currentTime += 10;
                } else {
                    // Left side double-tap: Rewind 10s
                    video.currentTime -= 10;
                }
            } else if (tapCount === 3) {
                // Triple tap: Perform actions
                if (event.clientX > window.innerWidth / 2) {
                    // Right side triple-tap: Close website
                    window.close();
                } else if (event.clientX < window.innerWidth / 3) {
                    // Left side triple-tap: Show comments
                    commentSection.classList.toggle("hidden");
                } else {
                    // Middle triple-tap: Next video
                    video.src = "videos/next-video.mp4"; // Load the next video
                    video.play();
                }
            }
            tapCount = 0;
        }, 300);
    }
});
