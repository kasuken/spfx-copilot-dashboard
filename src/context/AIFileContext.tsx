import * as React from 'react';
import AIFileObject from '../models/AIFileObject';

interface IAIFileContext {
    searchResultItems: AIFileObject[];
    selectedItem?: AIFileObject;
    setSelectedItem: (item?: AIFileObject) => void;
}

export const AIFileContext = React.createContext<IAIFileContext>({
    searchResultItems: [],
    setSelectedItem: () => { },
});

export const AIFileContextProvider: React.FC<{ children: React.ReactNode, searchResultItems: AIFileObject[] }> = ({ children, searchResultItems }) => {
    const [selectedItem, setSelectedItem] = React.useState<AIFileObject | undefined>(undefined);

    const handleSetSelectedItem = (item: AIFileObject) => {
        console.log('Setting selected item:', item);
        setSelectedItem(item);
    };

    const value = ({
        searchResultItems,
        selectedItem,
        setSelectedItem: handleSetSelectedItem,
    });

    return (
        <AIFileContext.Provider value={value}>
            {children}
        </AIFileContext.Provider>
    );
};
