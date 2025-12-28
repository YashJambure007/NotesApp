import { Copy, PlusCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    if (!title.trim()) {
      toast.error(" Please enter a title", {
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
        },
      });
      return;
    }

    if (!value.trim() && !pasteId) {
      toast.error(" Please enter some content", {
        style: {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
        },
      });
      return;
    }

    setIsAnimating(true);
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      toast.success(" Paste updated successfully", {
        style: {
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
        },
      });
      dispatch(updatePastes(paste));
    } else {
      toast.success(" Paste created successfully", {
        style: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
        },
      });
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
    setTimeout(() => setIsAnimating(false), 600);
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="relative w-full min-h-screen py-10 max-w-[1150px] mx-auto px-5 lg:px-0 overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col gap-y-6 items-start relative z-10">
        {/* Header Section */}
        <div className="w-full flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <Sparkles className="text-blue-500 animate-spin" size={24} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Create Your Paste
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Share code snippets and content with ease</p>
        </div>

        {/* Input Section */}
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter a title for your paste..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-6 py-4 text-gray-700 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300 hover:bg-white/90 ${
                pasteId ? "w-[80%]" : "w-[85%]"
              }`}
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              }}
            />
          </div>
          <button
            onClick={createPaste}
            className={`relative px-6 py-4 text-white font-semibold rounded-2xl shadow-xl transition duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 ${
              isAnimating ? "animate-pulse" : ""
            }`}
            style={{
              boxShadow: "0 8px 32px 0 rgba(59, 130, 246, 0.3)",
            }}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
          {pasteId && (
            <button
              onClick={resetPaste}
              className="p-4 text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-2xl shadow-xl transition duration-300 transform hover:scale-105 active:scale-95"
              style={{
                boxShadow: "0 8px 32px 0 rgba(168, 85, 247, 0.3)",
              }}
            >
              <PlusCircle size={24} />
            </button>
          )}
        </div>

        {/* Editor Container */}
        <div
          className="w-full rounded-3xl border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden transition duration-500 hover:shadow-3xl transform hover:-translate-y-1"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Editor Header */}
          <div className="flex items-center justify-between gap-x-4 px-6 py-4 border-b border-white/30 bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm">
            <div className="flex gap-x-3 items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg hover:scale-125 transition"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg hover:scale-125 transition"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg hover:scale-125 transition"></div>
            </div>
            <button
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white/50 transition duration-300 transform hover:scale-110 active:scale-95"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success(" Copied to Clipboard", {
                  position: "top-right",
                  style: {
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                  },
                });
              }}
            >
              <Copy size={20} className="drop-shadow" />
            </button>
          </div>

          {/* TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here... "
            className="w-full px-6 py-6 text-gray-700 bg-white/50 rounded-b-3xl focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder-gray-400 transition duration-300"
            style={{
              caretColor: "#3b82f6",
              minHeight: "400px",
            }}
            rows={20}
          />
        </div>

        {/* Stats Info */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition">
            <p className="text-2xl font-bold text-blue-500">{value.length}</p>
            <p className="text-xs text-gray-600">Characters</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition">
            <p className="text-2xl font-bold text-purple-500">{value.split(" ").length}</p>
            <p className="text-xs text-gray-600">Words</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition">
            <p className="text-2xl font-bold text-pink-500">{value.split("\n").length}</p>
            <p className="text-xs text-gray-600">Lines</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition">
            <p className="text-2xl font-bold text-green-500">{title.length}</p>
            <p className="text-xs text-gray-600">Title</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
