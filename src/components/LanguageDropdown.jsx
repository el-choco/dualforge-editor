import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = ({ onSelect }) => {
  const { t } = useTranslation();
  const languages = ['javascript', 'html', 'css', 'php', 'python', 'java', 'sql', 'bash', 'json', 'mermaid'];

  return (
    <select className="ui-select" onChange={(e) => {
      if(e.target.value) onSelect(`\`\`\`${e.target.value}\n`, '\n\`\`\`');
      e.target.value = "";
    }}>
      <option value="">{t('toolbar.markdown.code')}</option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;