import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Picker = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [attributes, setAttributes] = useState({ class: '', id: '' });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{t('toolbar.html.picker')}</h3>
        <input 
          type="text" 
          placeholder="Class" 
          value={attributes.class}
          onChange={(e) => setAttributes({ ...attributes, class: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="ID" 
          value={attributes.id}
          onChange={(e) => setAttributes({ ...attributes, id: e.target.value })}
        />
        <div className="modal-actions">
          <button onClick={() => onConfirm(attributes)}>{t('common.confirm')}</button>
          <button onClick={onClose}>{t('common.cancel')}</button>
        </div>
      </div>
    </div>
  );
};

export default Picker;