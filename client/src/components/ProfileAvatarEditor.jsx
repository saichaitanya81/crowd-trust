import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Upload, Trash2, X, ZoomIn, ZoomOut, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import api from '../services/api.js';

export const ProfileAvatarEditor = ({
  size = 'lg',
  className = '',
  showNameUnder = false,
  editable = true,
}) => {
  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [validationError, setValidationError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageElementRef = useRef(null);
  const modalRef = useRef(null);

  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    user?.name || 'CrowdTrust'
  )}`;
  const currentAvatar = user?.avatar || defaultAvatar;
  const hasCustomAvatar = Boolean(user?.avatar && user.avatar !== defaultAvatar);

  // Size variations
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl',
  };

  const buttonSizeClasses = {
    sm: 'w-5 h-5 -bottom-1 -right-1',
    md: 'w-6 h-6 -bottom-1 -right-1',
    lg: 'w-7 h-7 sm:w-8 sm:h-8 -bottom-1 -right-1',
    xl: 'w-9 h-9 -bottom-1.5 -right-1.5',
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
    xl: 'w-4 h-4 sm:w-5 sm:h-5',
  };

  const openModal = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setValidationError('');
    setIsOpen(true);
  };

  const closeModal = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setValidationError('');
    setIsOpen(false);
  };

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Validate and handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous preview
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setValidationError('');

    // Check file format
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setValidationError('Please upload a valid image file (JPG, PNG, or WEBP).');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Check file size (max 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setValidationError('Image size exceeds 5MB. Please choose a smaller image.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Drag pan handlers for repositioning
  const handleMouseDown = (e) => {
    if (!previewUrl) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!previewUrl || !e.touches[0]) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches[0]) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  // Generate cropped/processed image using canvas
  const getCroppedImageBlob = useCallback(async () => {
    if (!imageElementRef.current) return null;

    const canvas = document.createElement('canvas');
    const size = 320; // High resolution square canvas
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const img = imageElementRef.current;

    // Fill background
    ctx.fillStyle = '#FBF7EF';
    ctx.fillRect(0, 0, size, size);

    // Draw circular clip path
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Calculate dimensions with zoom and pan
    const aspect = img.naturalWidth / img.naturalHeight;
    let drawWidth = size * zoom;
    let drawHeight = size * zoom;

    if (aspect > 1) {
      drawWidth = size * aspect * zoom;
    } else {
      drawHeight = (size / aspect) * zoom;
    }

    const drawX = size / 2 - drawWidth / 2 + pan.x * (size / 160);
    const drawY = size / 2 - drawHeight / 2 + pan.y * (size / 160);

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        'image/webp',
        0.92
      );
    });
  }, [zoom, pan]);

  // Save new profile photo
  const handleSavePhoto = async () => {
    if (!selectedFile && !previewUrl) return;

    try {
      setIsSaving(true);
      setValidationError('');

      let avatarUrl = '';

      // Try generating cropped blob and uploading via /api/upload
      const croppedBlob = await getCroppedImageBlob();
      const fileToUpload = croppedBlob
        ? new File([croppedBlob], `avatar_${Date.now()}.webp`, { type: 'image/webp' })
        : selectedFile;

      if (fileToUpload) {
        try {
          const formData = new FormData();
          formData.append('file', fileToUpload);

          const uploadRes = await api.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (uploadRes?.success && uploadRes?.data?.fileUrl) {
            avatarUrl = uploadRes.data.fileUrl;
          }
        } catch (uploadErr) {
          console.warn('Backend multipart upload warning, fallback to base64 data URL:', uploadErr.message);
        }
      }

      // If backend fileUrl was not obtained, create a compressed data URL fallback
      if (!avatarUrl) {
        if (croppedBlob) {
          avatarUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(croppedBlob);
          });
        } else if (previewUrl) {
          avatarUrl = previewUrl;
        }
      }

      // Persist avatar into user profile
      const updateRes = await updateProfile({ avatar: avatarUrl });
      if (updateRes?.success !== false) {
        success('Profile photo updated successfully!');
        closeModal();
      } else {
        setValidationError(updateRes?.error || 'Failed to update profile photo.');
      }
    } catch (err) {
      console.error('Profile photo update failed:', err);
      setValidationError(err.message || 'An error occurred while saving profile photo.');
      error(err.message || 'Failed to save profile photo.');
    } finally {
      setIsSaving(false);
    }
  };

  // Remove photo and revert to default avatar
  const handleRemovePhoto = async () => {
    try {
      setIsSaving(true);
      const res = await updateProfile({ avatar: '' });
      if (res?.success !== false) {
        success('Profile photo removed.');
        closeModal();
      } else {
        setValidationError(res?.error || 'Failed to remove photo.');
      }
    } catch (err) {
      setValidationError(err.message || 'Failed to remove photo.');
      error(err.message || 'Failed to remove photo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Visual Avatar Element */}
      <div className={`relative inline-block ${className}`}>
        <div
          className={`${sizeClasses[size] || sizeClasses.lg} overflow-hidden border-2 border-[#DCCBB5] bg-[#EFE5D3] shadow-xs relative flex items-center justify-center`}
        >
          <img
            src={currentAvatar}
            alt={user?.name ? `${user.name}'s profile avatar` : 'User profile avatar'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
        </div>

        {/* Edit Button Overlay */}
        {editable && (
          <button
            type="button"
            onClick={openModal}
            aria-label="Change profile photo"
            title="Change profile photo"
            className={`absolute ${buttonSizeClasses[size] || buttonSizeClasses.lg} rounded-full bg-[#C96F4A] hover:bg-[#B85D3B] text-[#FFF8EE] border-2 border-[#FBF7EF] flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C96F4A] focus-visible:ring-offset-2 cursor-pointer z-10`}
          >
            <Camera className={iconSizes[size] || iconSizes.lg} />
          </button>
        )}
      </div>

      {/* Profile Photo Customization Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-3xl bg-[#FBF7EF] border border-[#DCCBB5] p-6 shadow-2xl space-y-6 text-[#3A2418] motion-safe:animate-in motion-safe:zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#DCCBB5] pb-4">
              <h2 id="profile-modal-title" className="text-base sm:text-lg font-black text-[#3A2418] tracking-tight">
                Profile Photo
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="p-1.5 rounded-full text-[#8A7463] hover:text-[#3A2418] hover:bg-[#F1E7D6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Avatar Preview & Crop Frame */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div
                className="relative w-40 h-40 rounded-full border-4 border-[#DCCBB5] bg-[#EFE5D3] overflow-hidden shadow-inner flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                {previewUrl ? (
                  <img
                    ref={imageElementRef}
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-none pointer-events-none transition-transform duration-75"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: 'center center',
                    }}
                    draggable={false}
                  />
                ) : (
                  <img
                    src={currentAvatar}
                    alt="Current Avatar"
                    className="w-full h-full object-cover pointer-events-none"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                )}

                {/* Circular guideline ring */}
                <div className="absolute inset-0 rounded-full border border-black/10 pointer-events-none" />
              </div>

              {previewUrl && (
                <div className="w-full max-w-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#8A7463]">
                    <span className="flex items-center gap-1">
                      <ZoomOut className="w-3.5 h-3.5" /> Zoom
                    </span>
                    <span className="flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    aria-label="Image zoom slider"
                    className="w-full accent-[#C96F4A] cursor-pointer"
                  />
                  <p className="text-[10px] text-center text-[#8A7463]">Drag photo to reposition</p>
                </div>
              )}

              {!previewUrl && (
                <p className="text-xs text-[#8A7463] text-center">
                  Choose a new profile photo to personalize your CrowdTrust account.
                </p>
              )}
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="p-3 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-xs font-semibold text-[#9B1C1C] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
              id="avatar-file-upload-input"
              aria-label="Upload profile image"
            />

            {/* Action Buttons: Choose & Remove */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#D6BFA0] bg-[#F7F0E3] hover:bg-[#E8D5B7] text-xs font-bold text-[#3A2418] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Upload className="w-4 h-4 text-[#C96F4A]" />
                <span>{previewUrl ? 'Choose Different Image' : 'Choose Image'}</span>
              </button>

              {(hasCustomAvatar || previewUrl) && (
                <button
                  type="button"
                  onClick={previewUrl ? () => setPreviewUrl(null) : handleRemovePhoto}
                  disabled={isSaving}
                  className="py-2.5 px-4 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{previewUrl ? 'Clear Selection' : 'Remove Photo'}</span>
                </button>
              )}
            </div>

            {/* Modal Footer Controls: Cancel / Save */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DCCBB5]">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSaving}
                className="py-2 px-4 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] hover:bg-[#F1E7D6] text-xs font-bold text-[#6B5140] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSavePhoto}
                disabled={!previewUrl || isSaving}
                className="py-2 px-5 rounded-xl bg-[#C96F4A] hover:bg-[#B85D3B] text-xs font-bold text-[#FFF8EE] transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Photo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileAvatarEditor;
