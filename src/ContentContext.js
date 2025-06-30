import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultContent } from "./content";

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem("content");
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};
