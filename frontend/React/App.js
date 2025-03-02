import axios from "axios";
import { useState, useEffect } from "react";

function UserPoints() {
    const [points, setPoints] = useState(0);
    const userId = "65af6b1b3d5a4c001ef97a7b"; // Replace with actual user ID

    useEffect(() => {
        // Fetch user points
        axios.get(`http://localhost:8000/api/users/points/${userId}`)
            .then(response => setPoints(response.data.points))
            .catch(error => console.error(error));
    }, []);

    const handleWatchVideo = () => {
        // Simulate watching a video
        axios.post("http://localhost:8000/api/users/add-points", {
            userId: userId,
            videoCount: 1 // Watching 1 video
        })
        .then(response => setPoints(response.data.totalPoints))
        .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Your Points: {points}</h1>
            <button onClick={handleWatchVideo}>Watch Video (Earn 5 Points)</button>
        </div>
    );
}

export default UserPoints;
