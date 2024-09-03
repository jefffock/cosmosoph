import React from 'react';
import { WisdomRow } from '../../../../shared/types';


interface WisdomTableRowProps {
  wisdom: WisdomRow;
}

const WisdomTableRow: React.FC<WisdomTableRowProps> = ({ wisdom }) => {
  const cellStyle: React.CSSProperties = {
    padding: '8px',
    borderBottom: '1px solid #ddd'
  };

  return (
    <tr>
      <td style={cellStyle}>{wisdom.wisdom_id}</td>
      <td style={{...cellStyle, fontWeight: 'bold'}}>{wisdom.content}</td>
      <td style={cellStyle}>{wisdom.author || 'N/A'}</td>
      <td style={cellStyle}>{wisdom.source_id !== null ? wisdom.source_id : 'N/A'}</td>
      <td style={cellStyle}>{new Date(wisdom.created_at).toLocaleString()}</td>
      <td style={cellStyle}>{new Date(wisdom.updated_at).toLocaleString()}</td>
    </tr>
  );
};

export default WisdomTableRow;