import React from "react";
import { WisdomItem, Category } from "../../../shared/types";

interface WisdomTableRowProps {
  wisdom: WisdomItem;
}

const WisdomTableRow: React.FC<WisdomTableRowProps> = ({ wisdom }) => {
  const cellStyle: React.CSSProperties = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <tr>
      <td style={{ ...cellStyle, fontWeight: "bold" }}>{wisdom.content}</td>
      <td style={cellStyle}>{wisdom.author || "N/A"}</td>
      <td style={cellStyle}>
        {wisdom.categories?.map((category: Category) => (
          <span
            key={category.category_id}
            style={{
              marginRight: "5px",
              padding: "2px 5px",
              backgroundColor: "#f0f0f0",
              borderRadius: "3px",
            }}
          >
            {category.name}
          </span>
        )) || "N/A"}
      </td>
    </tr>
  );
};

export default WisdomTableRow;
