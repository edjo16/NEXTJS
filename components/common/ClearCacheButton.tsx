import React, { useEffect } from "react";

const ClearCacheButton: React.FC = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "F4") {
        localStorage.removeItem("dataCache2");
        alert("Cache limpiado con éxito.");
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return null; 
};

export default ClearCacheButton;
