import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Grid3X3, Clipboard } from 'lucide-react';

const TableGenerator = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  useEffect(() => {
    const newData = Array(rows).fill('').map((_, rIndex) => 
      Array(cols).fill('').map((_, cIndex) => 
        (data[rIndex] && data[rIndex][cIndex]) ? data[rIndex][cIndex] : ''
      )
    );
    setData(newData);
  }, [rows, cols]);

  const handleCellChange = (r, c, value) => {
    const newData = [...data];
    newData[r][c] = value;
    setData(newData);
  };

  const processPasteData = (text) => {
    const rowsData = text.split(/\r\n|\n|\r/).filter(row => row.trim() !== '');
    if (rowsData.length === 0) return;

    let newRows = Math.max(rows, rowsData.length);
    let newCols = cols;

    rowsData.forEach(row => {
      const cells = row.split(/\t/);
      newCols = Math.max(newCols, cells.length);
    });

    setRows(newRows);
    setCols(newCols);

    setTimeout(() => {
      setData(prevData => {
        const newData = Array(newRows).fill('').map((_, rIndex) => 
          Array(newCols).fill('').map((_, cIndex) => 
             (prevData[rIndex] && prevData[rIndex][cIndex]) ? prevData[rIndex][cIndex] : ''
          )
        );

        rowsData.forEach((rowStr, i) => {
          const cellValues = rowStr.split(/\t/);
          cellValues.forEach((val, j) => {
            if (newData[i] && newData[i][j] !== undefined) {
              newData[i][j] = val.trim();
            }
          });
        });
        return newData;
      });
    }, 50);
  };

  const handleSmartPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      processPasteData(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handlePasteEvent = (e, r, c) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    
    if (r === 0 && c === 0) {
        processPasteData(pasteData);
    } else {
         processPasteData(pasteData); 
    }
  };

  const generateMarkdown = () => {
    if (!data || data.length === 0) return;

    let md = '| ' + data[0].join(' | ') + ' |\n';
    
    md += '| ' + data[0].map(() => '---').join(' | ') + ' |\n';

    for (let i = 1; i < data.length; i++) {
      md += '| ' + data[i].join(' | ') + ' |\n';
    }

    onConfirm(md);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '900px', width: '95%' }} onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Grid3X3 size={20}/> {t('modal.table.title')}
          </h3>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="controls" style={{ display: 'flex', gap: '15px', marginBottom: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '8px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>{t('modal.table.rows')}</label>
            <input type="number" min="1" max="50" value={rows} onChange={(e) => setRows(parseInt(e.target.value) || 1)} style={{ width: '60px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>{t('modal.table.cols')}</label>
            <input type="number" min="1" max="20" value={cols} onChange={(e) => setCols(parseInt(e.target.value) || 1)} style={{ width: '60px', padding: '5px' }} />
          </div>
          
          <button 
            onClick={handleSmartPaste}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '5px', 
              background: '#2563eb', color: 'white', border: 'none', 
              padding: '6px 12px', borderRadius: '4px', cursor: 'pointer',
              height: '32px', fontSize: '13px'
            }}
            title={t('modal.table.paste_btn')}
          >
            <Clipboard size={14} /> {t('modal.table.paste_btn')}
          </button>
          
          <div style={{ fontSize: '12px', color: '#666', alignSelf: 'center', marginLeft: 'auto' }}>
            {t('modal.table.tip')}
          </div>
        </div>

        <div className="table-grid-container" style={{ overflowX: 'auto', maxHeight: '500px', border: '1px solid #ddd' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {data.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.map((cell, cIndex) => (
                    <td key={`${rIndex}-${cIndex}`} style={{ padding: 0, border: '1px solid #ccc' }}>
                      <input 
                        type="text" 
                        value={cell} 
                        onChange={(e) => handleCellChange(rIndex, cIndex, e.target.value)}
                        onPaste={(e) => handlePasteEvent(e, rIndex, cIndex)}
                        placeholder={rIndex === 0 ? `${t('modal.table.header')} ${cIndex+1}` : ''}
                        style={{ 
                          width: '100%', 
                          border: 'none', 
                          padding: '8px', 
                          fontWeight: rIndex === 0 ? 'bold' : 'normal',
                          background: rIndex === 0 ? '#e6f3ff' : 'white',
                          borderBottom: rIndex === 0 ? '2px solid #b3d7ff' : 'none',
                          minWidth: '120px'
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="modal-btn cancel" onClick={onClose}>{t('common.cancel')}</button>
          <button className="modal-btn confirm" onClick={generateMarkdown}>{t('common.insert')}</button>
        </div>

      </div>
    </div>
  );
};

export default TableGenerator;