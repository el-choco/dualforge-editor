import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  Link, Image, Code, MoreHorizontal, Smile, Shapes, 
  List, ListOrdered, Table, MessageSquare, AlignLeft, 
  AlignCenter, AlignRight, Palette, Highlighter, 
  Underline, Superscript, Subscript, Eye, Code2, 
  CheckSquare, Hash, Workflow, Sigma, Wand2, Layout, LayoutGrid,
  AlertOctagon, ListTree, Keyboard, MonitorPlay, Search, Percent, Minus,
  Languages, FileCode, ChevronDown
} from 'lucide-react';
import { snippets } from '../utils/snippets.js';

const Toolbar = ({ 
  onInsert, onOpenPicker, onOpenColor, onOpenEmoji, 
  onOpenIcon, onOpenIframe, onOpenLink, onOpenImage, 
  onOpenTable,
  onToggleSearch, onCleanUp 
}) => {
  const { t, i18n } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [showLangs, setShowLangs] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(newLang);
  };

  const codeLanguages = [
    { name: 'JS', val: 'javascript' },
    { name: 'HTML', val: 'html' },
    { name: 'CSS', val: 'css' },
    { name: 'Py', val: 'python' },
    { name: 'Java', val: 'java' },
    { name: 'SQL', val: 'sql' },
    { name: 'Bash', val: 'bash' }
  ];

  return (
    <div className="toolbars-ui-root">
      <div className="ui-row md-blue">
        <span className="ui-label">{t('toolbar.markdown.label')}</span>
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('**', '**')} title={t('toolbar.markdown.bold')}><Bold size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('*', '*')} title={t('toolbar.markdown.italic')}><Italic size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('~~', '~~')} title={t('toolbar.markdown.strike')}><Strikethrough size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('`', '`')} title={t('toolbar.markdown.code')}><Code size={18} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('# ')} title={t('toolbar.markdown.h1')}>H1</button>
          <button className="ui-btn" onClick={() => onInsert('## ')} title={t('toolbar.markdown.h2')}>H2</button>
          <button className="ui-btn" onClick={() => onInsert('### ')} title={t('toolbar.markdown.h3')}>H3</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={onOpenLink} title={t('toolbar.markdown.link')}><Link size={18} /></button>
          <button className="ui-btn" onClick={onOpenImage} title={t('toolbar.markdown.image')}><Image size={18} /></button>
          
          <div className="dropdown-container">
            <button className="ui-btn" onClick={() => setShowLangs(!showLangs)} title="Code Block">
              <FileCode size={18} /> <ChevronDown size={10} style={{marginLeft:2}}/>
            </button>
            {showLangs && (
              <div className="dropdown-menu" onMouseLeave={() => setShowLangs(false)}>
                {codeLanguages.map(l => (
                  <button key={l.val} className="dropdown-item" onClick={() => { onInsert(`\`\`\`${l.val}\n`, '\n\`\`\`'); setShowLangs(false); }}>
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="dropdown-container">
            <button className="ui-btn" onClick={() => setShowMore(!showMore)} title={t('toolbar.markdown.more')}><MoreHorizontal size={18} /></button>
            {showMore && (
              <div className="dropdown-menu" onMouseLeave={() => setShowMore(false)}>
                <button className="dropdown-item" onClick={() => { onInsert('[ ] '); setShowMore(false); }}><CheckSquare size={16}/> {t('toolbar.markdown.tasklist')}</button>
                <button className="dropdown-item" onClick={() => { onInsert('[^1]', '\n\n[^1]: '); setShowMore(false); }}><Hash size={16}/> {t('toolbar.markdown.footnote')}</button>
                <button className="dropdown-item" onClick={() => { onInsert(snippets.mermaid); setShowMore(false); }}><Workflow size={16}/> Mermaid</button>
              </div>
            )}
          </div>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={onOpenEmoji} title={t('toolbar.markdown.emoji')}><Smile size={18} /></button>
          <button className="ui-btn" onClick={onOpenIcon} title={t('toolbar.html.icon')}><Shapes size={18} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('- ')} title={t('toolbar.markdown.list')}><List size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('1. ')} title={t('toolbar.markdown.ordered')}><ListOrdered size={18} /></button>
          <button className="ui-btn" onClick={onOpenTable} title={t('toolbar.markdown.table')}><Table size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('> ')} title={t('toolbar.markdown.quote')}><MessageSquare size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('---\n')} title={t('toolbar.markdown.hr')}><Minus size={18} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('$$\n', '\n$$')} title={t('toolbar.markdown.math')}><Sigma size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert(':::tip\n', '\n:::')} title={t('toolbar.markdown.admonition')}><AlertOctagon size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('[[toc]]')} title={t('toolbar.markdown.toc')}><ListTree size={18} /></button>
        </div>
        <div className="ui-sep" style={{ marginLeft: 'auto' }} />
        <div className="ui-group">
          <button className="ui-btn" onClick={toggleLanguage} title={i18n.language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}>
            <Languages size={18} />
            <span style={{ marginLeft: '6px', fontSize: '11px', fontWeight: '700', color: '#1a73e8' }}>
              {i18n.language.toUpperCase()}
            </span>
          </button>
        </div>
      </div>

      <div className="ui-row html-green">
        <span className="ui-label">{t('toolbar.html.label')}</span>
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('<div style="text-align:left">', '</div>')} title={t('toolbar.html.left')}><AlignLeft size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('<div style="text-align:center">', '</div>')} title={t('toolbar.html.center')}><AlignCenter size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('<div style="text-align:right">', '</div>')} title={t('toolbar.html.right')}><AlignRight size={18} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={onOpenColor} title={t('toolbar.html.color')}><Palette size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('<mark>', '</mark>')} title={t('toolbar.html.mark')}><Highlighter size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('<small>', '</small>')} title={t('toolbar.html.small')}>Small</button>
          <button className="ui-btn" onClick={() => onInsert('<span style="font-size:1.5rem">', '</span>')} title={t('toolbar.html.large')}>Large</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('<u>', '</u>')} title={t('toolbar.html.underline')}><Underline size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('<sup>', '</sup>')} title={t('toolbar.html.sup')}>x²</button>
          <button className="ui-btn" onClick={() => onInsert('<sub>', '</sub>')} title={t('toolbar.html.sub')}>H₂O</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert(
            '<details style="border: 1px solid #aaa; border-radius: 4px; padding: .5em .5em 0;"><summary style="font-weight: bold; margin: -.5em -.5em 0; padding: .5em; cursor: pointer;">Details</summary><div style="padding: .5em;">',
            '</div></details>'
          )} title={t('toolbar.html.spoiler')}><Eye size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert('<br>')} title={t('toolbar.html.br')}>&lt;br&gt;</button>
          <button className="ui-btn" onClick={onOpenPicker} title={t('toolbar.html.picker')}><Code2 size={18} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.kbd)} title={t('toolbar.html.kbd')}><Keyboard size={18} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert(
            '<div style="display: flex; gap: 15px; justify-content: center; align-items: center; border: 1px dashed #ccc; padding: 10px;">',
            '</div>'
          )} title={t('toolbar.html.flex')}><Layout size={18} /></button>
          
          <button className="ui-btn" onClick={() => onInsert(
            '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; border: 1px dashed #ccc; padding: 10px;">',
            '</div>'
          )} title={t('toolbar.html.grid')}><LayoutGrid size={18} /></button>
          
          <button className="ui-btn" onClick={() => onInsert(snippets.progress)} title={t('toolbar.html.progress')}><Percent size={18} /></button>
          <button className="ui-btn" onClick={onOpenIframe} title={t('toolbar.html.iframe')}><MonitorPlay size={18} /></button>
          <button className="ui-btn" onClick={onToggleSearch} title={t('toolbar.html.search')}><Search size={18} /></button>
          <button className="ui-btn" onClick={onCleanUp} title={t('toolbar.html.cleanup')}><Wand2 size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;