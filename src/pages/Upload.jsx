import React, { useState, useEffect } from "react";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [district, setDistrict] = useState("Detecting...");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/api/location?lat=${latitude}&lon=${longitude}`
                    );

                    const data = await response.json();

                    const detectedDistrict =
                        data.address.district ||
                        data.address.state_district ||
                        data.address.city_district ||
                        data.address.county ||
                        data.address.city ||
                        "Unknown Location";

                    setDistrict(detectedDistrict);
                } catch (error) {
                    console.error("Error detecting location:", error);
                    setDistrict("Could not detect");
                }
            });
        } else {
            setDistrict("Geolocation not supported");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload a voice or video file first!");

        const formData = new FormData();
        formData.append("audio", file);
        formData.append("district", district);

        try {
            console.log("Uploading to:", import.meta.env.VITE_BACKEND_URL);

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(` ${data.message}`);
                setFile(null);
            } else {
                setMessage(`❌ Error: ${data.error || "Upload failed"}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("❌ Server error during upload.");
        }
    };

    return (
        <div className="container text-center my-5">
            <h2 className="fw-bold text-success mb-3">Upload Your Voice or Video Recording</h2>
            <p>
                Your District (detected): <strong>{district}</strong>
            </p>

            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <input
                        type="file"
                        accept="audio/*,video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="form-control w-50 mx-auto"
                    />
                </div>

                {file && (
                    <p className="text-success mt-3">
                        Selected File: <strong>{file.name}</strong>
                    </p>
                )}

                <button type="submit" className="btn btn-success mt-3">
                    Submit
                </button>
            </form>

            {message && <p className="mt-4 fw-semibold text-primary">{message}</p>}
        </div>
    );
}
