import React, { useState, useEffect } from "react";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [district, setDistrict] = useState("Detecting...");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lon: longitude });

                try {
                    // Step 2: Use OpenStreetMap reverse geocoding to get district name
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    const detectedDistrict =
                        data.address.district ||
                        data.address.state_district ||
                        data.address.city_district ||
                        data.address.county ||
                        data.address.city ||
                        data.address.suburb ||
                        "Unknown Location";


                    setDistrict(detectedDistrict);
                } catch (error) {
                    console.error("Error fetching location:", error);
                    setDistrict("Could not detect");
                }
            });
        } else {
            setDistrict("Geolocation not supported");
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            alert(`File "${file.name}" uploaded successfully!`);
            setFile(null);
        } else {
            alert("Please upload a voice file first!");
        }
    };

    return (
        <div className="text-center my-5">
            <h2 className="fw-bold text-success mb-3">Upload Your Voice Recording</h2>
            <p>
                Your District (detected): <strong>{district}</strong>
            </p>

            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="form-control w-50 mx-auto"
                    />
                </div>

                {file && (
                    <p className="text-success mt-3">
                        Uploaded File: <strong>{file.name}</strong>
                    </p>
                )}

                <button type="submit" className="btn btn-success mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
}
