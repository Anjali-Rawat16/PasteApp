import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-100">
          My Pastes
        </h1>

        {/* Search */}
        <input
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full p-3 rounded-lg
            bg-[#181818] text-gray-100
            border border-[#2a2a2a]
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        {/* Paste List */}
        {filteredData.length > 0 ? (
          <div className="space-y-4">
            {filteredData.map((paste) => (
              <div
                key={paste._id}
                className="
                  bg-[#181818]
                  border border-[#2a2a2a]
                  rounded-xl p-5
                  space-y-3
                "
              >
                {/* Title */}
                <h2 className="text-lg font-medium text-gray-100">
                  {paste.title}
                </h2>

                {/* Content Preview */}
                <p className="text-gray-400 line-clamp-3 text-sm">
                  {paste.content}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to={`/pastes/edit/${paste._id}`}
                    className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/pastes/view/${paste._id}`}
                    className="px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      const pasteURL = `${window.location.origin}/pastes/view/${paste._id}`;
                      navigator.clipboard.writeText(pasteURL);
                      toast.success("Paste link copied!");
                    }}
                    className="px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm"
                  >
                    Share
                  </button>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500">
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No pastes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
