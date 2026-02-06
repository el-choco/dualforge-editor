import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const IframeGenerator = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('560');
  const [height, setHeight] = useState('315');

  if (!isOpen) return null;

  const handleGenerate = () => {
    const embedUrl = url.replace('watch?v=', 'embed/');
    const iframe = `<iframe width="${width}" height="${height}" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
    onConfirm(iframe);
    setUrl('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{t('modal.iframe_title')}</h3>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="URL (YouTube/Maps)" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
          />
          <div className="dimension-row">
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="W" />
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="H" />
          </div>
        </div>
        <div className="modal-actions">
          <button className="ui-btn-primary" onClick={handleGenerate}>{t('common.confirm')}</button>
          <button className="modal-close-btn" onClick={onClose}>{t('common.cancel')}</button>
        </div>
      </div>
    </div>
  );
};

export default IframeGenerator;