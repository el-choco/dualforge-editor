import React from 'react';
import { useTranslation } from 'react-i18next';
import Editor from './components/Editor.jsx';

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>{t('editor.title')}</h1>
      </header>
      <main>
        <Editor />
      </main>
    </div>
  );
};

export default App;