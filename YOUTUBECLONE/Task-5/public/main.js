const socket = io();
const myVideo = document.getElementById("myVideo");
const peerVideo = document.getElementById("peerVideo");
const startCall = document.getElementById("startCall");
const shareScreen = document.getElementById("shareScreen");
const recordBtn = document.getElementById("record");
const stopRecordBtn = document.getElementById("stopRecord");

let localStream;
let peerConnection;
let recorder;
let recordedChunks = [];

const constraints = { video: true, audio: true };

// Get user media
async function startMedia() {
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    myVideo.srcObject = localStream;
}

startCall.addEventListener("click", async () => {
    await startMedia();
    socket.emit("join-room", "room1", socket.id);
});

// WebRTC Peer Connection
socket.on("user-connected", async (userId) => {
    peerConnection = new RTCPeerConnection();
    
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
        peerVideo.srcObject = event.streams[0];
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("offer", { offer, userId });
});

// Screen Sharing
shareScreen.addEventListener("click", async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

    screenStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, screenStream);
    });
});

// Recording Video
recordBtn.addEventListener("click", () => {
    recorder = new MediaRecorder(localStream, { mimeType: "video/webm" });
    
    recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    recorder.start();
    console.log("Recording started...");
});

stopRecordBtn.addEventListener("click", () => {
    recorder.stop();
    const blob = new Blob(recordedChunks, { type: "video/webm" });

    // Save video locally
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "video-call-recording.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log("Recording stopped & saved.");
});
