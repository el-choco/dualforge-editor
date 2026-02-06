import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Replace } from 'lucide-react';

const SearchReplace = ({ content, onUpdate }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');

  const handleReplace = () => {
    const newContent = content.split(search).join(replace);
    onUpdate(newContent);
  };

  return (
    <div className="search-replace-bar">
      <div className="search-group">
        <Search size={14} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('toolbar.search')} />
      </div>
      <div className="search-group">
        <Replace size={14} />
        <input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder={t('toolbar.replace')} />
      </div>
      <button className="ui-btn-small" onClick={handleReplace}>{t('common.confirm')}</button>
    </div>
  );
};

export default SearchReplace;