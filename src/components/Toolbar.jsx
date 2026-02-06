import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  Link, Image, Code, MoreHorizontal, Smile, Shapes, 
  List, ListOrdered, Table, MessageSquare, AlignLeft, 
  AlignCenter, AlignRight, Palette, Highlighter, 
  Underline, Superscript, Subscript, Eye, Code2, 
  CheckSquare, Hash, Workflow, Sigma, Wand2, Layout, LayoutGrid,
  AlertOctagon, ListTree, Keyboard, MonitorPlay, Search, Percent
} from 'lucide-react';
import { snippets } from '../utils/snippets.js';
import LanguageDropdown from './LanguageDropdown.jsx';

const Toolbar = ({ onInsert, onOpenPicker, onOpenColor, onOpenEmoji, onOpenIcon, onOpenIframe, onToggleSearch, onCleanUp }) => {
  const { t } = useTranslation();

  return (
    <div className="toolbars-ui-root">
      <div className="ui-row md-blue">
        <span className="ui-label">{t('toolbar.markdown.label')}</span>
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('**', '**')} title={t('toolbar.markdown.bold')}><Bold size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('*', '*')} title={t('toolbar.markdown.italic')}><Italic size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('~~', '~~')} title={t('toolbar.markdown.strike')}><Strikethrough size={16} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('# ')} title={t('toolbar.markdown.h1')}>H1</button>
          <button className="ui-btn" onClick={() => onInsert('## ')} title={t('toolbar.markdown.h2')}>H2</button>
          <button className="ui-btn" onClick={() => onInsert('### ')} title={t('toolbar.markdown.h3')}>H3</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('[', '](url)')} title={t('toolbar.markdown.link')}><Link size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('![alt](', ')')} title={t('toolbar.markdown.image')}><Image size={16} /></button>
          <LanguageDropdown onSelect={onInsert} />
          <button className="ui-btn" onClick={() => onInsert('...', '')} title={t('toolbar.markdown.more')}><MoreHorizontal size={16} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={onOpenEmoji} title={t('toolbar.markdown.emoji')}><Smile size={16} /></button>
          <button className="ui-btn" onClick={onOpenIcon} title={t('toolbar.html.icon')}><Shapes size={16} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('- ')} title={t('toolbar.markdown.list')}><List size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('1. ')} title={t('toolbar.markdown.ordered')}><ListOrdered size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('| col | col |\n|---|---|\n| val | val |')} title={t('toolbar.markdown.table')}><Table size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('> ')} title={t('toolbar.markdown.quote')}><MessageSquare size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('---')} title={t('toolbar.markdown.hr')}>---</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('[ ] ')} title={t('toolbar.markdown.tasklist')}><CheckSquare size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('[^1]', '\n\n[^1]: ')} title={t('toolbar.markdown.footnote')}><Hash size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.mermaid)} title={t('toolbar.markdown.mermaid')}><Workflow size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.math)} title={t('toolbar.markdown.math')}><Sigma size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.admonition)} title={t('toolbar.markdown.admonition')}><AlertOctagon size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.toc)} title={t('toolbar.markdown.toc')}><ListTree size={16} /></button>
        </div>
      </div>

      <div className="ui-row html-green">
        <span className="ui-label">{t('toolbar.html.label')}</span>
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('<div style="text-align:left">', '</div>')} title={t('toolbar.html.left')}><AlignLeft size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('<div style="text-align:center">', '</div>')} title={t('toolbar.html.center')}><AlignCenter size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('<div style="text-align:right">', '</div>')} title={t('toolbar.html.right')}><AlignRight size={16} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={onOpenColor} title={t('toolbar.html.color')}><Palette size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('<mark>', '</mark>')} title={t('toolbar.html.mark')}><Highlighter size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('<small>', '</small>')} title={t('toolbar.html.small')}>Small</button>
          <button className="ui-btn" onClick={() => onInsert('<span style="font-size:1.5rem">', '</span>')} title={t('toolbar.html.large')}>Large</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert('<u>', '</u>')} title={t('toolbar.html.underline')}><Underline size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert('<sup>', '</sup>')} title={t('toolbar.html.sup')}>x²</button>
          <button className="ui-btn" onClick={() => onInsert('<sub>', '</sub>')} title={t('toolbar.html.sub')}>H₂O</button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert(snippets.details)} title={t('toolbar.html.spoiler')}><Eye size={16} /> Spoiler</button>
          <button className="ui-btn" onClick={() => onInsert('<br />')} title={t('toolbar.html.br')}>&lt;br&gt;</button>
          <button className="ui-btn" onClick={onOpenPicker} title={t('toolbar.html.picker')}><Code2 size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.kbd)} title={t('toolbar.html.kbd')}><Keyboard size={16} /></button>
        </div>
        <div className="ui-sep" />
        <div className="ui-group">
          <button className="ui-btn" onClick={() => onInsert(snippets.flexbox)} title={t('toolbar.html.flex')}><Layout size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.grid)} title={t('toolbar.html.grid')}><LayoutGrid size={16} /></button>
          <button className="ui-btn" onClick={() => onInsert(snippets.progress)} title={t('toolbar.html.progress')}><Percent size={16} /></button>
          <button className="ui-btn" onClick={onOpenIframe} title={t('toolbar.html.iframe')}><MonitorPlay size={16} /></button>
          <button className="ui-btn" onClick={onToggleSearch} title={t('toolbar.html.search')}><Search size={16} /></button>
          <button className="ui-btn" onClick={onCleanUp} title={t('toolbar.html.cleanup')}><Wand2 size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;