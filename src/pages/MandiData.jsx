import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

const MandiData = () => {
  const [data, setData] = useState([]);
  const [district, setDistrict] = useState("");
  const [commodity, setCommodity] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (district) params.district = district;
      if (commodity) params.commodity = commodity;

      const res = await axios.get(`${API_BASE}/api/mgnrega`, { params });
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌾 Kerala Mandi Data Dashboard
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Enter District (e.g., Kozhikode)"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border rounded-lg p-2 w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="Enter Commodity (e.g., Banana)"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="border rounded-lg p-2 w-full sm:w-1/3"
        />
        <button
          onClick={fetchData}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          🔍 Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2">District</th>
                <th className="p-2">Market</th>
                <th className="p-2">Commodity</th>
                <th className="p-2">Variety</th>
                <th className="p-2">Min Price</th>
                <th className="p-2">Max Price</th>
                <th className="p-2">Modal Price</th>
                <th className="p-2">Arrival Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-t hover:bg-green-50">
                  <td className="p-2">{item.district}</td>
                  <td className="p-2">{item.market}</td>
                  <td className="p-2">{item.commodity}</td>
                  <td className="p-2">{item.variety}</td>
                  <td className="p-2">{item.min_price}</td>
                  <td className="p-2">{item.max_price}</td>
                  <td className="p-2">{item.modal_price}</td>
                  <td className="p-2">{item.arrival_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">No data found. Try syncing again.</p>
      )}
    </div>
  );
};

export default MandiData;
