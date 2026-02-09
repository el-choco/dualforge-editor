import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MonitorPlay, Globe, Maximize, LayoutTemplate } from 'lucide-react';

const IframeGenerator = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState('560');
  const [height, setHeight] = useState('315');
  const [hasBorder, setHasBorder] = useState(false);
  const [allowFullscreen, setAllowFullscreen] = useState(true);

  const handleConfirm = () => {
    if (!url) return;
    
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be/')) {
      embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
    }

    const borderStyle = hasBorder ? 'border: 1px solid #ccc;' : 'border: none;';
    const fullscreenAttr = allowFullscreen ? 'allowfullscreen' : '';
    
    const iframeCode = `<iframe 
      src="${embedUrl}" 
      width="${width}" 
      height="${height}" 
      style="${borderStyle}" 
      ${fullscreenAttr}
      loading="lazy">
    </iframe>`;

    onConfirm(iframeCode);
    onClose();
    setUrl('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MonitorPlay size={20}/> {t('modal.iframe.title')}
          </h3>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
            <Globe size={14} style={{ display: 'inline', marginRight: '5px' }}/> 
            {t('modal.iframe.url')}
          </label>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="https://www.youtube.com/..." 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            autoFocus
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>{t('modal.iframe.width')}</label>
            <input 
              type="text" 
              value={width} 
              onChange={(e) => setWidth(e.target.value)} 
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>{t('modal.iframe.height')}</label>
            <input 
              type="text" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
            <input 
              type="checkbox" 
              checked={allowFullscreen} 
              onChange={(e) => setAllowFullscreen(e.target.checked)} 
            />
            <Maximize size={14}/> {t('modal.iframe.fullscreen')}
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
            <input 
              type="checkbox" 
              checked={hasBorder} 
              onChange={(e) => setHasBorder(e.target.checked)} 
            />
            <LayoutTemplate size={14}/> {t('modal.iframe.border')}
          </label>
        </div>

        <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="modal-btn cancel" onClick={onClose}>{t('common.cancel')}</button>
          <button className="modal-btn confirm" onClick={handleConfirm}>{t('common.insert')}</button>
        </div>

      </div>
    </div>
  );
};

export default IframeGenerator;