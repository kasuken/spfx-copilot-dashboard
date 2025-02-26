import * as React from "react";
import { Dialog, DialogContent, DialogType } from "@fluentui/react";
import { AIFilesContext } from "../../context/AIFilesContext";

export type IAIFileDetailsProps = {
    isOpen: boolean;
    onDismiss: () => void;
}

export const AIFileDetails: React.FC<IAIFileDetailsProps> = (props) => {
    const { onDismiss } = props;
    const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);

    const handleDismiss = React.useCallback(() => {
        setSelectedAiFile(undefined);
        onDismiss();
    }, [setSelectedAiFile, onDismiss]);

    React.useEffect(() => {
        if (selectedAiFile) {
            console.log('Selected item in details:', selectedAiFile);
        }
    }, [selectedAiFile]);

    const selectedFileName = `${selectedAiFile?.Name}.${selectedAiFile?.FileExtension}`;
    return (
        <Dialog hidden={!props.isOpen} onDismiss={handleDismiss} styles={{ root: { width: '100%' }, main: { minWidth: '600px' } }}>
            <DialogContent title={selectedFileName} type={DialogType.normal} styles={
                { content: { width: '100%' } }}>
                {selectedAiFile &&
                    <iframe
                        src="https://tmaestrinimvp.sharepoint.com/sites/allcompany/_layouts/15/chat.aspx"
                        style={{ width: '100%', height: '75vh', border: 'none' }}
                    />
                }
            </DialogContent>
        </Dialog>
    );
};