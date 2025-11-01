import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  // 🌍 Fetch location name from backend proxy (/api/location)
  const fetchLocation = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/location?lat=${lat}&lon=${lon}`);
      setAddress(res.data.address);
    } catch (err) {
      console.error("Error fetching location:", err);
      setAddress("Unable to fetch location");
    }
  };

  // 📍 Get user's geolocation
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
        fetchLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve location. Please allow location access.");
      }
    );
  };

  // 📤 Handle file upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  // 🚀 Submit to backend AI model
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please upload an image first.");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🌱 MGNREGA AI Crop Analysis
      </h1>

      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
        {/* Left side: Upload box */}
        <div className="flex flex-col items-center border-2 border-dashed border-green-400 p-6 rounded-xl hover:bg-green-50 transition-all">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Upload Crop Image
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className="w-64 h-64 object-cover rounded-lg border border-green-200"
            />
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg"
          >
            {loading ? "Analyzing..." : "Analyze Crop"}
          </button>
        </div>

        {/* Right side: Results */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Diagnosis & Recommendation
            </h2>

            {result ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Disease:</strong> {result.prediction}
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Recommendation:</strong> {result.recommendation}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Upload an image to see the diagnosis.
              </p>
            )}
          </div>

          {/* Location section */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              📍 Location Information
            </h2>
            <button
              onClick={getUserLocation}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Get Current Location
            </button>

            {location && (
              <div className="mt-3 text-gray-700">
                <p>
                  <strong>Coordinates:</strong> {location}
                </p>
                <p>
                  <strong>Address:</strong> {address || "Fetching..."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
