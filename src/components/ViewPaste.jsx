import { Copy, Sparkles, Calendar, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormatDate } from "../utlis/formatDate";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast.success(" Paste link copied to clipboard", {
      style: {
        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        color: "white",
        border: "none",
        borderRadius: "12px",
      },
    });
  };

  if (!paste) {
    return (
      <div className="relative w-full min-h-screen py-10 max-w-[1150px] mx-auto px-5 lg:px-0 overflow-hidden flex items-center justify-center">
        {/* Animated background gradient */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl text-center" style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        }}>
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-2xl font-bold text-gray-800 mb-2">Paste Not Found</p>
          <p className="text-gray-600">The paste you're looking for doesn't exist.</p>
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
  }

  return (
    <div className="relative w-full min-h-screen py-10 max-w-[1150px] mx-auto px-5 lg:px-0 overflow-hidden">
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
            <Sparkles className="text-blue-500 animate-spin" size={28} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              View Paste
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Read-only view of your saved content</p>
        </div>

        {/* Title Input Section */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Paste Title</label>
          <input
            type="text"
            placeholder="Title"
            value={paste?.title || ""}
            disabled
            className="w-full px-6 py-4 text-gray-700 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl focus:outline-none transition duration-200 cursor-not-allowed"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          />
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
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg hover:scale-125 transition cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg hover:scale-125 transition cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg hover:scale-125 transition cursor-pointer"></div>
            </div>
            <div className="flex gap-x-2">
              <button
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white/50 transition duration-300 transform hover:scale-110 active:scale-95"
                onClick={handleShare}
                title="Share Paste Link"
              >
                <Share2 size={20} className="drop-shadow" />
              </button>
              <button
                className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-white/50 transition duration-300 transform hover:scale-110 active:scale-95"
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content || "");
                  toast.success(" Copied to Clipboard", {
                    position: "top-right",
                    style: {
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                    },
                  });
                }}
                title="Copy Content"
              >
                <Copy size={20} className="drop-shadow" />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={paste?.content || ""}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full px-6 py-6 text-gray-700 bg-white/50 rounded-b-3xl focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder-gray-400 transition duration-300 cursor-not-allowed"
            style={{
              caretColor: "#3b82f6",
              minHeight: "400px",
            }}
            rows={20}
          />
        </div>

        {/* Metadata Section */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition transform hover:-translate-y-1"
            style={{
              boxShadow: "0 8px 32px 0 rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-2xl font-bold text-blue-500">{paste?.content?.length || 0}</p>
            <p className="text-xs text-gray-600 mt-1">Characters</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition transform hover:-translate-y-1"
            style={{
              boxShadow: "0 8px 32px 0 rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-2xl font-bold text-purple-500">{paste?.content?.split(" ").length || 0}</p>
            <p className="text-xs text-gray-600 mt-1">Words</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition transform hover:-translate-y-1"
            style={{
              boxShadow: "0 8px 32px 0 rgba(236, 72, 153, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-2xl font-bold text-pink-500">{paste?.content?.split("\n").length || 0}</p>
            <p className="text-xs text-gray-600 mt-1">Lines</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg text-center hover:shadow-xl transition transform hover:-translate-y-1"
            style={{
              boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar size={16} className="text-green-500" />
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">{paste?.createdAt ? FormatDate(paste.createdAt) : "N/A"}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Paste Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Paste ID</p>
              <p className="text-sm font-mono text-gray-700 break-all">{paste?._id}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Created At</p>
              <p className="text-sm text-gray-700">{paste?.createdAt ? new Date(paste.createdAt).toLocaleString() : "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Title</p>
              <p className="text-sm text-gray-700">{paste?.title}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Total Characters</p>
              <p className="text-sm text-gray-700">{paste?.content?.length || 0} chars</p>
            </div>
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

export default ViewPaste;
