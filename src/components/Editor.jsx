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
import TableGenerator from './Modal/TableGenerator.jsx';
import InsertModal from './Modal/InsertModal.jsx';
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
  const isScrolling = useRef(false);

  const processExtensions = (text) => {
    let processed = text;

    if (processed.includes('[[toc]]')) {
      const tokens = marked.lexer(processed);
      const toc = tokens.filter(token => token.type === 'heading');
      
      let tocHtml = '<div class="toc-container"><strong>Inhalt</strong><ul>';
      toc.forEach(h => {
        const text = h.text;
        const level = h.depth;
        tocHtml += `<li style="margin-left: ${(level - 1) * 20}px"><a href="#${text.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</a></li>`;
      });
      tocHtml += '</ul></div>';
      
      processed = processed.replace(/\[\[toc\]\]/g, tocHtml);
    }

    processed = processed.replace(
      /^:::(tip|info|warning|danger)\s*\n([\s\S]*?)\n:::/gm,
      (match, type, innerContent) => {
        const title = type.toUpperCase();
        return `<div class="admonition ${type}"><div class="admonition-title">${title}</div>\n\n${innerContent}\n\n</div>`;
      }
    );

    processed = processed.replace(
      /\$\$([\s\S]*?)\$\$/gm,
      '<div class="math-block">$$$1$$</div>'
    );

    return processed;
  };

  useEffect(() => {
    localStorage.setItem('dualforge_content', content);
    
    const extendedContent = processExtensions(content);

    const rawHtml = marked.parse(extendedContent, { breaks: true, gfm: true });
    
    const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe', 'i', 'div', 'span'], 
      ADD_ATTR: ['allowfullscreen', 'frameborder', 'target', 'class', 'style', 'id'] 
    });
    
    setPreviewHtml(sanitizedHtml);
  }, [content]);

  useEffect(() => {
    if (window.hljs) {
      window.hljs.highlightAll();
    }
    if (window.renderMathInElement && previewRef.current) {
      window.renderMathInElement(previewRef.current, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ]
      });
    }
  }, [previewHtml]);

  const handleScroll = (source) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    const editor = textAreaRef.current;
    const preview = previewRef.current;

    if (source === 'editor' && editor && preview) {
      const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    } else if (source === 'preview' && editor && preview) {
      const percentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
      editor.scrollTop = percentage * (editor.scrollHeight - editor.clientHeight);
    }

    setTimeout(() => { isScrolling.current = false; }, 50);
  };

  const handleInsert = (before, after = '') => {
    const el = textAreaRef.current;
    if (!el) return;
    
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const scrollTop = el.scrollTop;
    
    const selectedText = el.value.substring(start, end);
    const newText = el.value.substring(0, start) + before + selectedText + after + el.value.substring(end);
    
    setContent(newText);
    setActiveModal(null);
    
    setTimeout(() => {
      el.focus();
      const pos = start + before.length + selectedText.length + after.length;
      el.setSelectionRange(pos, pos);
      el.scrollTop = scrollTop;
    }, 0);
  };

  const handleCleanUp = () => {
    setContent(cleanHTML(content));
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
          onOpenLink={() => setActiveModal('link')}
          onOpenImage={() => setActiveModal('image')}
          onOpenTable={() => setActiveModal('table')}
          onToggleSearch={() => setShowSearch(!showSearch)}
          onCleanUp={handleCleanUp}
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
          onScroll={() => handleScroll('editor')}
          className="editor-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('editor.placeholder')}
        />
        <div 
          ref={previewRef}
          onScroll={() => handleScroll('preview')}
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
      <InsertModal isOpen={activeModal === 'link' || activeModal === 'image'} type={activeModal} onClose={() => setActiveModal(null)} onConfirm={(code) => handleInsert(code)} />
      <TableGenerator isOpen={activeModal === 'table'} onClose={() => setActiveModal(null)} onConfirm={(md) => handleInsert(md)} />
    </div>
  );
};

export default Editor;