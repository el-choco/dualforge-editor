import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Trash2, Grid3X3 } from 'lucide-react';

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

  const handlePaste = (e, r, c) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const rowsData = pasteData.split(/\r\n|\n|\r/).filter(row => row.trim() !== '');
    
    if (rowsData.length === 0) return;

    let newRows = Math.max(rows, r + rowsData.length);
    let newCols = cols;

    rowsData.forEach(row => {
      const cells = row.split(/\t/); 
      newCols = Math.max(newCols, c + cells.length);
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
            if (newData[r + i] && newData[r + i][c + j] !== undefined) {
              newData[r + i][c + j] = val.trim();
            }
          });
        });
        return newData;
      });
    }, 50);
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
      <div className="modal-content" style={{ maxWidth: '800px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Grid3X3 size={20}/> {t('modal.table_generator', 'Tabellen Generator')}
          </h3>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="controls" style={{ display: 'flex', gap: '20px', marginBottom: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Zeilen</label>
            <input type="number" min="1" max="50" value={rows} onChange={(e) => setRows(parseInt(e.target.value) || 1)} style={{ width: '60px', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Spalten</label>
            <input type="number" min="1" max="20" value={cols} onChange={(e) => setCols(parseInt(e.target.value) || 1)} style={{ width: '60px', padding: '5px' }} />
          </div>
          <div style={{ fontSize: '12px', color: '#666', alignSelf: 'center', marginLeft: 'auto' }}>
            💡 Tipp: Copy & Paste aus Excel funktioniert!
          </div>
        </div>

        <div className="table-grid-container" style={{ overflowX: 'auto', maxHeight: '400px', border: '1px solid #ddd' }}>
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
                        onPaste={(e) => handlePaste(e, rIndex, cIndex)}
                        placeholder={rIndex === 0 ? `Header ${cIndex+1}` : ''}
                        style={{ 
                          width: '100%', 
                          border: 'none', 
                          padding: '8px', 
                          fontWeight: rIndex === 0 ? 'bold' : 'normal',
                          background: rIndex === 0 ? '#f0f8ff' : 'white',
                          minWidth: '100px'
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
          <button className="modal-btn cancel" onClick={onClose}>{t('common.cancel', 'Abbrechen')}</button>
          <button className="modal-btn confirm" onClick={generateMarkdown}>{t('common.insert', 'Tabelle einfügen')}</button>
        </div>

      </div>
    </div>
  );
};

export default TableGenerator;