import * as React from "react";
import AIFileObject from "../models/AIFileObject";

type IAIFilesContext = {
  selectedAiFile?: AIFileObject;
  setSelectedAiFile: (aiFile: AIFileObject | undefined) => void;
  aiFiles: AIFileObject[];
}

type AIFilesContextProviderProps = {
  searchResults: AIFileObject[];
  children: React.ReactNode;
}

export const AIFilesContext = React.createContext<IAIFilesContext>({
  selectedAiFile: undefined,
  setSelectedAiFile: (aiFile: AIFileObject) => { },
  aiFiles: []
});

export const AIFilesContextProvider: React.FC<AIFilesContextProviderProps> = (props: React.PropsWithChildren<AIFilesContextProviderProps>) => {
  const [selectedAiFile, setSelectedAiFile] = React.useState<AIFileObject | undefined>(undefined);
  const [aiFiles] = React.useState<AIFileObject[]>(props.searchResults);

  return (
    <AIFilesContext.Provider value={{ selectedAiFile, setSelectedAiFile, aiFiles }}>
      {props.children}
    </AIFilesContext.Provider>
  );
}