import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCheck, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import BellToggle from './BellToggle/BellToggle.jsx';

export const NotificationBell = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/notifications');
      if (res.success) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      // Ignore polling notification errors
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 25000); // 25s polling
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true);
      await api.patch('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <BellToggle
        offLabel="Notifications"
        onLabel="Notifications"
        label="Notifications"
        color="#3A2418"
        background="#FBF7EF"
        onColor="#3A2418"
        onBackground="#E8D5B7"
        size="md"
        radius={12}
        ringAmplitude={17}
        ringPasses={5}
        ringDecay={1}
        ringDuration={820}
        ringPivot={16}
        crossfadeMs={200}
        revealBounce={0}
        count={unreadCount}
        badge
        badgeColor="#C96F4A"
        badgeTextColor="#FBF7EF"
        waves
        clapper={false}
        defaultPressed={false}
        pressed={isOpen}
        iconOnly
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FBF7EF] rounded-2xl shadow-xl border border-[#DCCBB5] z-50 overflow-hidden animate-scale-in text-[#3A2418]">
          <div className="px-4 py-3 bg-[#F1E7D6] border-b border-[#DCCBB5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#3A2418]">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-[#F0DDC7] text-[#7A452F] border border-[#DCCBB5] text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={loading}
                className="text-xs text-[#C96F4A] hover:text-[#B85D3B] font-bold flex items-center gap-1 transition"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-[#EADDCB]">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-[#8A7463] text-sm">
                <Bell className="w-8 h-8 text-[#D6BFA0] mx-auto mb-2" />
                No notifications yet.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => !n.read && handleMarkAsRead(n._id)}
                  className={`p-3.5 hover:bg-[#F1E7D6] transition cursor-pointer flex items-start gap-3 ${
                    !n.read ? 'bg-[#F0DDC7]/30' : ''
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      !n.read ? 'bg-[#C96F4A]' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#3A2418] leading-snug">{n.title}</p>
                    <p className="text-xs text-[#6B5140] mt-0.5 leading-relaxed">{n.message}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[#8A7463]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                      {n.link && (
                        <Link
                          to={n.link}
                          onClick={() => setIsOpen(false)}
                          className="text-[#C96F4A] hover:underline flex items-center gap-0.5 font-bold"
                        >
                          View <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
