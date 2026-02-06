import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Toolbar from './Toolbar.jsx';
import Picker from './Modal/Picker.jsx';
import ColorPicker from './Modal/ColorPicker.jsx';
import EmojiPicker from './Modal/EmojiPicker.jsx';
import IconPicker from './Modal/IconPicker.jsx';
import IframeGenerator from './Modal/IframeGenerator.jsx';
import SearchReplace from './SearchReplace.jsx';
import { cleanHTML } from '../utils/formatter.js';

const Editor = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState(() => localStorage.getItem('dualforge_content') || '');
  const [previewHtml, setPreviewHtml] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [readMode, setReadMode] = useState(false);
  
  const textAreaRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('dualforge_content', content);
    
    const rawHtml = marked.parse(content, { breaks: true, gfm: true });
    
    const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe', 'i'], 
      ADD_ATTR: ['allowfullscreen', 'frameborder', 'target', 'class', 'style'] 
    });
    
    setPreviewHtml(sanitizedHtml);
  }, [content]);

  const handleScroll = (e) => {
    const editor = textAreaRef.current;
    const preview = previewRef.current;
    if (editor && preview) {
      const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    }
  };

  const handleInsert = (before, after = '') => {
    const el = textAreaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selectedText = el.value.substring(start, end);
    const newText = el.value.substring(0, start) + before + selectedText + after + el.value.substring(end);
    setContent(newText);
    setActiveModal(null);
    setTimeout(() => {
      el.focus();
      const pos = start + before.length + selectedText.length + after.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const stats = {
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    chars: content.length
  };

  return (
    <div className={`dualforge-main-container ${readMode ? 'read-mode' : ''}`}>
      {!readMode && (
        <Toolbar 
          onInsert={handleInsert} 
          onOpenPicker={() => setActiveModal('picker')}
          onOpenColor={() => setActiveModal('color')}
          onOpenEmoji={() => setActiveModal('emoji')}
          onOpenIcon={() => setActiveModal('icon')}
          onOpenIframe={() => setActiveModal('iframe')}
          onToggleSearch={() => setShowSearch(!showSearch)}
          onCleanUp={() => setContent(cleanHTML(content))}
          toggleReadMode={() => setReadMode(true)}
        />
      )}

      {showSearch && (
        <SearchReplace 
          content={content} 
          onUpdate={setContent} 
          onClose={() => setShowSearch(false)} 
        />
      )}
      
      {readMode && (
        <button className="exit-read-mode" onClick={() => setReadMode(false)}>
          Esc / Exit Mode
        </button>
      )}

      <div className="editor-split-screen">
        <textarea
          ref={textAreaRef}
          onScroll={handleScroll}
          className="editor-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('editor.placeholder')}
        />
        <div 
          ref={previewRef}
          className="editor-preview markdown-body"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>

      <div className="status-bar">
        <span>{t('status.words')}: {stats.words}</span>
        <span>{t('status.chars')}: {stats.chars}</span>
        {content && <span className="auto-save-tag">{t('status.saved')}</span>}
      </div>

      <Picker isOpen={activeModal === 'picker'} onClose={() => setActiveModal(null)} onConfirm={(a) => handleInsert(`<div class="${a.class}" id="${a.id}">`, `</div>`)} />
      <ColorPicker isOpen={activeModal === 'color'} onClose={() => setActiveModal(null)} onSelect={(c) => handleInsert(`<span style="color:${c}">`, `</span>`)} />
      <EmojiPicker isOpen={activeModal === 'emoji'} onClose={() => setActiveModal(null)} onSelect={(e) => handleInsert(e, '')} />
      <IconPicker isOpen={activeModal === 'icon'} onClose={() => setActiveModal(null)} onSelect={(i) => handleInsert(i, '')} />
      <IframeGenerator isOpen={activeModal === 'iframe'} onClose={() => setActiveModal(null)} onConfirm={(code) => handleInsert(code)} />
    </div>
  );
};

export default Editor;