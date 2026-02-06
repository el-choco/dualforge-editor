import React from 'react';
import { useTranslation } from 'react-i18next';

const IconPicker = ({ isOpen, onClose, onSelect }) => {
  const { t } = useTranslation();
  
  const icons = [
    'user', 'envelope', 'check', 'xmark', 'house', 'magnifying-glass', 'gear', 'bell', 'heart', 'star', 
    'image', 'music', 'video', 'camera', 'file', 'folder', 'trash', 'pen', 'calendar', 'clock', 
    'location-dot', 'phone', 'paper-plane', 'share-nodes', 'download', 'upload', 'cloud', 'wifi', 'battery-full', 
    'sun', 'moon', 'circle-info', 'circle-exclamation', 'triangle-exclamation', 'lock', 'unlock', 'key', 
    'shield', 'rocket', 'truck', 'cart-shopping', 'credit-card', 'money-bill', 'book', 'bookmark', 'graduation-cap', 
    'briefcase', 'building', 'hospital', 'car', 'bicycle', 'bus', 'plane', 'train', 'ticket', 'globe', 
    'map', 'compass', 'flag', 'fire', 'bolt', 'droplet', 'snowflake', 'umbrella', 'gift', 'trophy', 
    'medal', 'crown', 'gamepad', 'puzzle-piece', 'ghost', 'mug-hot', 'utensils', 'burger', 'pizza-slice', 
    'thumbs-up', 'thumbs-down', 'hand-point-right', 'face-smile', 'face-frown', 'question', 'hashtag', 'percent', 
    'code', 'terminal', 'bug', 'laptop', 'desktop', 'mobile', 'keyboard', 'headphones', 'microphone', 
    'volume-high', 'play', 'pause', 'stop', 'forward', 'backward', 'arrow-right', 'arrow-left', 'arrow-up', 
    'arrow-down', 'rotate', 'list', 'bars', 'filter', 'sort', 'eye', 'eye-slash', 'link', 'paperclip'
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{t('modal.icon')}</h3>
        <div className="grid-selection icon-grid">
          {icons.map((name) => (
            <button 
              key={name} 
              className="select-tile" 
              onClick={() => onSelect(`<i class="fa-solid fa-${name}"></i>`)}
            >
              <i className={`fa-solid fa-${name}`}></i>
            </button>
          ))}
        </div>
        <button className="modal-close-btn" onClick={onClose}>
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default IconPicker;