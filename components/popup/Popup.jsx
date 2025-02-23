import React from "react";

function Popup({ children, onDismiss }) {
  return (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 z-50"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={(e) => onDismiss(e)}
    >
      <div className="flex items-center justify-center h-full p-4">
        <div className="" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
