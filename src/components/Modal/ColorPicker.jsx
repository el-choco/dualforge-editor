import React from 'react';
import { useTranslation } from 'react-i18next';

const ColorPicker = ({ isOpen, onClose, onSelect }) => {
  const { t } = useTranslation();
  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080', '#000000', '#777777', '#3498db',
    '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#FFC0CB', '#FF69B4', '#FF1493', '#C71585',
    '#ADD8E6', '#87CEEB', '#00BFFF', '#1E90FF', '#00008B', '#00FFFF', '#90EE90', '#00FA9A',
    '#32CD32', '#228B22', '#006400', '#556B2F', '#FFFFE0', '#FFFACD', '#FFD700', '#FF8C00',
    '#FF4500', '#FA8072', '#DC143C', '#B22222', '#8B0000', '#A52A2A', '#D2691E', '#FFFFFF',
    '#F5F5F5', '#D3D3D3', '#A9A9A9', '#696969', '#2C3E50', '#1A252F', '#16a085', '#27ae60',
    '#2980b9', '#8e44ad', '#2c3e50', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content color-picker-content" onClick={e => e.stopPropagation()}>
        <h3>{t('toolbar.html.color')}</h3>
        <div className="color-grid">
          {colors.map(color => (
            <button 
              key={color} 
              className="color-swatch" 
              style={{ backgroundColor: color }}
              onClick={() => onSelect(color)}
              title={color}
            />
          ))}
        </div>
        <button className="modal-close-btn" onClick={onClose}>{t('common.cancel')}</button>
      </div>
    </div>
  );
};

export default ColorPicker;