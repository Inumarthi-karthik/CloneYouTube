async function downloadVideo(videoId, userId) {
    const response = await fetch(`/api/videos/download/${videoId}?userId=${userId}`);
    const data = await response.json();

    if (data.success) {
        window.location.href = data.videoUrl;
    } else {
        alert(data.message);
    }
}
