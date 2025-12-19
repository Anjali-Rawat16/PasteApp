import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();

  // ✅ correct slice key + safe fallback
  const allPastes = useSelector(state => state.paste?.pastes || []);

  // ✅ use find (cleaner than filter)
  const paste = allPastes.find(p => p._id === id);

  if (!paste) {
    return (
      <div className="bg-black min-h-screen p-4 text-white">
        Paste not found
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          value={paste.title}
          disabled
          className="p-2 rounded w-[70%] bg-black text-white border border-gray-600"
        />
      </div>

      <textarea
        value={paste.content}
        disabled
        className="w-full h-[70vh] mt-4 p-4 bg-black text-white border border-gray-600 rounded text-lg resize-none"
      />
    </div>
  );
};

export default ViewPaste;



