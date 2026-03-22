import React, { useState } from "react";
import jobs from "../data/Jobs";

const highlightText = (text, search) => {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span
        key={index}
        className="bg-amber-300 text-amber-900 font-bold px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const JobList = () => {
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState({});

  const handleApply = (id) => {
    setAppliedJobs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    const combinedText =
      `${job.company} ${job.role} ${job.city} ${job.type}`.toLowerCase();
    return combinedText.includes(search.toLowerCase());
  });

  return (
    <div className="vintage-card rounded-lg p-6 sticky top-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">💼</div>
        <h2 className="font-serif text-2xl font-bold text-amber-900">
          Job Listings
        </h2>
        <p className="font-serif text-amber-700/60 text-sm mt-1">
          Find work-study opportunities
        </p>
        <div className="w-12 h-px bg-amber-600/30 mx-auto mt-3"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search jobs by company, role, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-amber-50 border-2 border-amber-600/30 rounded-lg font-serif text-amber-800 placeholder-amber-400 focus:outline-none focus:border-amber-600 transition-all duration-300"
          />
          <span className="absolute right-3 top-3 text-amber-600">🔍</span>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scroll">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <p className="font-serif text-amber-700">
              No jobs found matching your search
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isApplied = appliedJobs[job.id];

            return (
              <div
                key={job.id}
                className="group relative bg-gradient-to-r from-amber-50 to-amber-100/30 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:translate-x-1"
              >
                {/* Decorative corner */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-600/20"></div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Job Icon */}
                  <div className="text-4xl sm:text-3xl">
                    {job.type === "Full-time"
                      ? "🏢"
                      : job.type === "Part-time"
                        ? "⏰"
                        : "💻"}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">
                      {highlightText(job.role, search)}
                    </h3>

                    <div className="space-y-1">
                      <p className="font-serif text-amber-800">
                        <span className="font-semibold">🏢 Company:</span>{" "}
                        {highlightText(job.company, search)}
                      </p>
                      <p className="font-serif text-amber-800">
                        <span className="font-semibold">📍 Location:</span>{" "}
                        {highlightText(job.city, search)}
                      </p>
                      <p className="font-serif text-amber-800">
                        <span className="font-semibold">⏱️ Type:</span>{" "}
                        {highlightText(job.type, search)}
                      </p>
                      <p className="font-serif text-amber-800">
                        <span className="font-semibold">💰 Pay:</span> {job.pay}
                      </p>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="sm:self-center">
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied}
                      className={`relative px-6 py-2 font-serif transition-all duration-300 rounded ${
                        isApplied
                          ? "bg-green-700 text-amber-100 cursor-not-allowed"
                          : "vintage-button hover:scale-105"
                      }`}
                    >
                      {isApplied ? (
                        <span className="flex items-center gap-2">
                          ✅ Applied
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          📝 Apply
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-amber-600/20">
        <div className="flex justify-between items-center">
          <div className="font-mono text-sm text-amber-700">
            📊 Total Listings: {filteredJobs.length}
          </div>
          <div className="font-mono text-sm text-amber-700">
            ✅ Applied: {Object.values(appliedJobs).filter(Boolean).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
