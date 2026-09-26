import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Trash2, ShieldCheck, User } from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const CommentSection = ({ campaignId, creatorId }) => {
  const { user, isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/campaign/${campaignId}`);
      if (res.success) {
        setComments(res.data.comments || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [campaignId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const res = await api.post(`/comments/campaign/${campaignId}`, {
        content: newComment.trim(),
      });
      if (res.success) {
        setComments((prev) => [res.data.comment, ...prev]);
        setNewComment('');
        success('Comment posted.');
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      success('Comment deleted.');
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <div className="card-container p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#EADDCB]">
        <h3 className="text-base font-bold text-[#3A2418] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#C96F4A]" />
          Community Discussion ({comments.length})
        </h3>
      </div>

      {/* Post Comment Input */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-3">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="w-9 h-9 rounded-full border border-[#DCCBB5] mt-1 shrink-0 object-cover"
            />
            <div className="flex-1">
              <textarea
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question or share encouragement with the project team..."
                className="w-full p-3.5 rounded-2xl border border-[#D6BFA0] bg-[#FBF7EF] focus:border-[#C96F4A] text-xs text-[#3A2418] leading-relaxed"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="btn-primary text-xs py-2 px-4 gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-xl bg-[#F1E7D6] text-center text-xs text-[#6B5140] border border-[#DCCBB5]">
          Please <a href="/login" className="text-[#C96F4A] font-bold hover:underline">sign in</a> to participate in the project discussion.
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4 divide-y divide-[#EADDCB]">
        {comments.length === 0 ? (
          <p className="text-xs text-[#8A7463] text-center py-6">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => {
            const isAuthor = user && comment.user?._id === user._id;
            const isCreator = comment.user?._id === creatorId;
            const isAdmin = user?.role === 'admin';

            return (
              <div key={comment._id} className="pt-4 flex items-start gap-3 group">
                <img
                  src={comment.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user?.name || 'User'}`}
                  alt={comment.user?.name}
                  className="w-8 h-8 rounded-full border border-[#DCCBB5] shrink-0 mt-0.5 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#3A2418]">
                        {comment.user?.name || 'Supporter'}
                      </span>
                      {isCreator && (
                        <span className="badge bg-[#F0DDC7] text-[#7A452F] text-[10px] py-0 px-1.5">
                          Campaign Organizer
                        </span>
                      )}
                      {comment.user?.role === 'admin' && (
                        <span className="badge bg-[#EFE5D3] text-[#3A2418] text-[10px] py-0 px-1.5">
                          Moderator
                        </span>
                      )}
                      <span className="text-[11px] text-[#8A7463]">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {(isAuthor || isCreator || isAdmin) && (
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="opacity-0 group-hover:opacity-100 text-[#8A7463] hover:text-[#B85D3B] p-1 rounded transition"
                        title="Delete comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-[#6B5140] mt-1 leading-relaxed whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;
