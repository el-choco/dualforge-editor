import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const IconPicker = ({ isOpen, onClose, onSelect }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const icons = [
    'house', 'magnifying-glass', 'user', 'check', 'download', 'image', 'phone', 'bars', 'envelope', 'star', 
    'location-dot', 'music', 'wand-magic-sparkles', 'heart', 'arrow-right', 'circle-xmark', 'bomb', 'poo', 
    'camera', 'comment', 'gear', 'video', 'trash', 'pen-to-square', 'share-nodes', 'cart-shopping', 'bell', 
    'calendar', 'play', 'circle-info', 'fire', 'eye', 'plane', 'truck-fast', 'receipt', 'ticket', 'compass', 
    'pencil', 'eraser', 'briefcase', 'gift', 'film', 'key', 'lock', 'unlock', 'bullhorn', 'flag', 'wallet', 
    'credit-card', 'book', 'bookmark', 'user-plus', 'user-minus', 'users', 'circle-user', 'thumbs-up', 
    'thumbs-down', 'comments', 'quote-left', 'quote-right', 'face-smile', 'face-frown', 'face-meh', 
    'face-surprise', 'face-tired', 'face-angry', 'face-grin-hearts', 'hand-point-up', 'hand-point-down', 
    'hand-point-left', 'hand-point-right', 'handshake', 'sun', 'moon', 'cloud', 'bolt', 'snowflake', 
    'umbrella', 'temperature-three-quarters', 'droplet', 'wind', 'water', 'earth-americas', 'earth-europe', 
    'earth-africa', 'globe', 'map', 'map-pin', 'location-arrow', 'route', 'traffic-light', 'car', 'bus', 
    'train', 'subway', 'bicycle', 'motorcycle', 'plane-departure', 'plane-arrival', 'ship', 'anchor', 
    'rocket', 'shuttle-space', 'gamepad', 'ghost', 'puzzle-piece', 'dice', 'chess-knight', 'headset', 
    'laptop', 'mobile', 'tablet', 'desktop', 'keyboard', 'mouse', 'print', 'floppy-disk', 'hard-drive', 
    'server', 'wifi', 'signal', 'battery-full', 'battery-half', 'battery-quarter', 'battery-empty', 
    'plug', 'power-off', 'microphone', 'microphone-slash', 'volume-high', 'volume-low', 'volume-off', 
    'camera-retro', 'circle-play', 'circle-pause', 'circle-stop', 'backward', 'forward', 'step-backward', 
    'step-forward', 'eject', 'repeat', 'shuffle', 'expand', 'compress', 'arrow-left', 'arrow-up', 'arrow-down', 
    'rotate-left', 'rotate-right', 'arrow-rotate-right', 'list', 'list-ul', 'list-ol', 'clipboard', 
    'clipboard-check', 'folder', 'folder-open', 'file', 'file-lines', 'file-pdf', 'file-word', 'file-excel', 
    'file-image', 'file-audio', 'file-video', 'file-code', 'file-zipper', 'code', 'terminal', 'bug', 
    'code-branch', 'filter', 'sort', 'sort-up', 'sort-down', 'align-left', 'align-center', 'align-right', 
    'align-justify', 'font', 'text-height', 'text-width', 'bold', 'italic', 'underline', 'strikethrough', 
    'link', 'link-slash', 'paperclip', 'scissors', 'copy', 'paste', 'clock', 'hourglass', 'stopwatch', 
    'calendar-days', 'calendar-check', 'hospital', 'stethoscope', 'user-doctor', 'heart-pulse', 'syringe', 
    'pills', 'kit-medical', 'graduation-cap', 'school', 'building-columns', 'book-open', 'chalkboard-user', 
    'money-bill', 'money-bill-1', 'coins', 'sack-dollar', 'piggy-bank', 'chart-line', 'chart-pie', 
    'chart-bar', 'chart-area', 'table', 'database', 'layer-group', 'cubes', 'cube', 'tree', 'leaf', 
    'seedling', 'plant-wilt', 'paw', 'cat', 'dog', 'fish', 'crow', 'dragon', 'hippo', 'horse', 'spider', 
    'mug-hot', 'glass-water', 'bottle-water', 'utensils', 'burger', 'pizza-slice', 'ice-cream', 'cake-candles', 
    'bacon', 'carrot', 'apple-whole', 'lemon', 'pepper-hot', 'shirt', 'socks', 'hat-cowboy', 'glasses', 
    'shoe-prints', 'crown', 'medal', 'trophy', 'award', 'ribbon', 'shield', 'shield-halved', 'dungeon', 
    'scroll', 'ring', 'gem', 'magic-wand-sparkles', 'gavel', 'scale-balanced', 'handcuffs', 'bell-slash', 
    'eye-slash', 'circle-question', 'circle-exclamation', 'triangle-exclamation', 'ban', 'circle-minus', 
    'circle-plus', 'infinity', 'percent', 'hashtag', 'at', 'facebook', 'twitter', 'instagram', 'tiktok', 
    'linkedin', 'github', 'discord', 'youtube', 'twitch', 'whatsapp', 'telegram', 'snapchat', 'pinterest', 
    'reddit', 'spotify', 'apple', 'android', 'windows', 'linux', 'google', 'amazon', 'paypal', 'stripe', 
    'bitcoin', 'ethereum', 'react', 'node', 'npm', 'docker', 'aws', 'wordpress', 'joomla', 'php', 'python', 
    'java', 'js', 'html5', 'css3', 'sass', 'less', 'vuejs', 'angular', 'bootstrap', 'figma', 'sketch', 
    'invision', 'dribbble', 'behance', 'medium', 'stack-overflow', 'gitlab', 'bitbucket'
  ];

  const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 className="modal-title" style={{ margin: 0 }}>{t('modal.icon')}</h3>
          <div className="search-group">
            <i className="fa-solid fa-search" style={{ color: '#aaa' }}></i>
            <input 
              type="text" 
              placeholder="Suchen..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="grid-selection icon-grid">
          {filteredIcons.map((name) => (
            <button 
              key={name} 
              className="select-tile" 
              onClick={() => onSelect(`<i class="${name.match(/^(facebook|twitter|instagram|tiktok|linkedin|github|discord|youtube|twitch|whatsapp|telegram|snapchat|pinterest|reddit|spotify|apple|android|windows|linux|google|amazon|paypal|stripe|bitcoin|ethereum|react|node|npm|docker|aws|wordpress|joomla|php|python|java|js|html5|css3|sass|less|vuejs|angular|bootstrap|figma|sketch|invision|dribbble|behance|medium|stack-overflow|gitlab|bitbucket)/) ? 'fa-brands' : 'fa-solid'} fa-${name}"></i>`)}
              title={name}
            >
              <i className={`${name.match(/^(facebook|twitter|instagram|tiktok|linkedin|github|discord|youtube|twitch|whatsapp|telegram|snapchat|pinterest|reddit|spotify|apple|android|windows|linux|google|amazon|paypal|stripe|bitcoin|ethereum|react|node|npm|docker|aws|wordpress|joomla|php|python|java|js|html5|css3|sass|less|vuejs|angular|bootstrap|figma|sketch|invision|dribbble|behance|medium|stack-overflow|gitlab|bitbucket)/) ? 'fa-brands' : 'fa-solid'} fa-${name}`}></i>
            </button>
          ))}
        </div>
        <div className="modal-actions-row">
          <button className="modal-close-btn" onClick={onClose}>
            {t('common.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;