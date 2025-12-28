import { Calendar, Copy, Eye, PencilLine, Trash2, Search, Sparkles, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success(" Paste deleted", {
      style: {
        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        color: "white",
        border: "none",
        borderRadius: "12px",
      },
    });
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen py-10 max-w-[1150px] mx-auto px-5 lg:px-0 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col gap-y-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Sparkles className="text-white animate-spin" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Your Pastes
              </h1>
              <p className="text-gray-600 text-sm mt-1">Manage and organize all your saved code snippets</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full">
          <div
            className="relative w-full flex gap-3 px-6 py-4 rounded-2xl border border-white/30 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition duration-300 group"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <Search className="text-gray-400 flex-shrink-0 mt-1 group-hover:text-blue-500 transition" size={20} />
            <input
              type="search"
              placeholder="Search by paste title..."
              className="focus:outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Section */}
        {filteredPastes.length > 0 ? (
          <div className="flex flex-col gap-y-6">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                <p className="text-2xl font-bold text-blue-500">{filteredPastes.length}</p>
                <p className="text-xs text-gray-600 mt-1">Total Pastes</p>
              </div>
              <div
                className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                <p className="text-2xl font-bold text-purple-500">
                  {filteredPastes.reduce((sum, p) => sum + p.content.length, 0)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Total Chars</p>
              </div>
              <div
                className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(236, 72, 153, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                <p className="text-2xl font-bold text-pink-500">
                  {filteredPastes.reduce((sum, p) => sum + p.content.split(" ").length, 0)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Total Words</p>
              </div>
              <div
                className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                <p className="text-2xl font-bold text-green-500">{pastes.length}</p>
                <p className="text-xs text-gray-600 mt-1">All Time</p>
              </div>
            </div>

            {/* Paste Cards Grid */}
            <div className="grid grid-cols-1 gap-5">
              {filteredPastes.map((paste, index) => (
                <div
                  key={paste._id}
                  onMouseEnter={() => setHoveredId(paste._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative w-full p-6 rounded-2xl border border-white/30 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  style={{
                    boxShadow:
                      hoveredId === paste._id
                        ? "0 20px 50px 0 rgba(31, 38, 135, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
                        : "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {/* Gradient Background Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition duration-300 rounded-2xl pointer-events-none"></div>

                  {/* Content Container */}
                  <div className="relative flex flex-col sm:flex-row justify-between gap-6">
                    {/* Left Section - Content */}
                    <div className="flex-1 flex flex-col space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-200/50 flex-shrink-0">
                          <ArrowUpRight className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent line-clamp-2">
                              {paste.title}
                            </h3>
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white whitespace-nowrap">
                              #{index + 1}
                            </span>
                          </div>
                          <p className="text-sm font-normal line-clamp-3 text-gray-600 leading-relaxed">
                            {paste.content}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-gray-600 text-xs px-3 py-1 rounded-lg bg-gray-100/50 backdrop-blur">
                          <Calendar size={14} />
                          <span>{FormatDate(paste.createdAt)}</span>
                        </div>
                        <div className="text-xs font-bold px-3 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                          {paste.content.length} characters
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Action Buttons */}
                    <div className="flex flex-col gap-3 sm:items-end">
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        {/* Edit Button */}
                        <a href={`/?pasteId=${paste._id}`} className="transform transition hover:scale-110">
                          <button
                            className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                            title="Edit Paste"
                          >
                            <PencilLine size={20} />
                          </button>
                        </a>

                        {/* Delete Button */}
                        <button
                          className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                          onClick={() => handleDelete(paste._id)}
                          title="Delete Paste"
                        >
                          <Trash2 size={20} />
                        </button>

                        {/* View Button */}
                        <a href={`/pastes/${paste._id}`} target="_blank" rel="noopener noreferrer" className="transform transition hover:scale-110">
                          <button
                            className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                            title="View Paste"
                          >
                            <Eye size={20} />
                          </button>
                        </a>

                        {/* Copy Button */}
                        <button
                          className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                          onClick={() => {
                            navigator.clipboard.writeText(paste.content);
                            toast.success(" Copied to Clipboard", {
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
                          <Copy size={20} />
                        </button>
                      </div>

                      {/* Word Count Badge */}
                      <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-center">
                        {paste.content.split(" ").length} words
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-20 flex flex-col items-center justify-center">
            <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl text-center" style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}>
              <div className="text-6xl mb-4 animate-bounce">📭</div>
              <p className="text-2xl font-bold text-gray-800 mb-2">No Pastes Found</p>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search terms or create a new paste"
                  : "Create your first paste to get started!"}
              </p>
            </div>
          </div>
        )}
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

export default Paste;
