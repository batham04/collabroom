"use client";

import { useEffect, useState } from "react";

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const res = await fetch("/api/recordings");
        const data = await res.json();
        setRecordings(data);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);

  if (loading) {
    return <div className="p-6">Loading recordings...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Recordings</h1>

      {recordings.length === 0 ? (
        <p>No recordings found</p>
      ) : (
        <div className="grid gap-6">
          {recordings.map((rec, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow-sm"
            >
              <p className="text-sm text-gray-500">
                Call ID: {rec.call_id}
              </p>

              <video
                controls
                src={rec.url}
                className="w-full mt-3 rounded-lg"
              />

              <a
                href={rec.url}
                target="_blank"
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                Open Recording
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}