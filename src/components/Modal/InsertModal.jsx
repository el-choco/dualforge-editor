import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const InsertModal = ({ isOpen, type, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setText('');
      setUrl('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'link') {
      onConfirm(`[${text}](${url})`);
    } else {
      onConfirm(`![${text}](${url})`);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">
          {type === 'link' ? t('modal.link_title') : t('modal.image_title')}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
          <input 
            className="ui-input-full"
            placeholder={t('modal.text')} 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
          />
          <input 
            className="ui-input-full"
            placeholder={t('modal.url')} 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
          />
        </div>
        <div className="modal-actions-row">
          <button className="ui-btn-primary" onClick={handleConfirm}>{t('common.confirm')}</button>
          <button className="modal-close-btn" onClick={onClose}>{t('common.cancel')}</button>
        </div>
      </div>
    </div>
  );
};

export default InsertModal;