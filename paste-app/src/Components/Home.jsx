import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, UpdateToPastes } from "../redux/pasteSlice";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";


const Home = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (id) {
      const paste = pastes.find((p) => p._id === id);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [id, pastes]);

  const handleSave = () => {
    if (!title || !value) return;

    const existingPaste = pastes.find((p) => p._id === id);

    const paste = {
      _id: id || Date.now().toString(36),
      title,
      content: value,
      createdAt: id
        ? existingPaste?.createdAt
        : new Date().toISOString(),
    };

    if (id) {
      dispatch(UpdateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    navigate("/pastes");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-100">
          {id ? "Edit Paste" : "Create New Paste"}
        </h1>

        {/* Card */}
        <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6 space-y-4">

          {/* Title + Button */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={title}
              placeholder="Paste title"
              onChange={(e) => setTitle(e.target.value)}
              className="
                flex-1 p-3 rounded-lg
                bg-[#0f0f0f] text-gray-100
                border border-[#2a2a2a]
                placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <div className="flex gap-2">
              {/* COPY ICON */}
              <button
                type="button"
                title="Copy content"
                disabled={!value}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to clipboard");
                }}
                className="
        p-3 rounded-lg
        bg-gray-700 hover:bg-gray-600
        text-white
        disabled:opacity-50 disabled:cursor-not-allowed
      "
              >
                <FiCopy size={18} />
              </button>
              </div>


              <button
                onClick={handleSave}
                className="
                px-6 py-3 rounded-lg font-medium
                bg-blue-600 hover:bg-blue-500
                transition-colors
                text-white
              "
              >
                {id ? "Update Paste" : "Create Paste"}
              </button>
            </div>

            {/* Content */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write your paste content here..."
              className="
              w-full h-[65vh] p-4
              bg-[#0f0f0f] text-gray-100
              border border-[#2a2a2a] rounded-lg
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500
              resize-none
            "
            />
          </div>
      </div>
      </div>
      );
};

      export default Home;

