import React from 'react';

const LanguageDropdown = ({ onSelect }) => {
  const languages = ['javascript', 'html', 'css', 'php', 'python', 'sql', 'mermaid'];

  return (
    <select className="ui-select" onChange={(e) => onSelect(`\`\`\`${e.target.value}\n`, '\n\`\`\`')}>
      <option value="">Code Lang</option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;