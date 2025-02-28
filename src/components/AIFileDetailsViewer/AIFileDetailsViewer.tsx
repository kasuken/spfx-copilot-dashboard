import * as React from "react";
import * as strings from 'AIFileDetailsViewerStrings';
import { Dialog, DialogContent, DialogType, IDialogContentProps, MessageBar, MessageBarType } from "@fluentui/react";
import { AIFilesContext } from "../../context/AIFilesContext";
import styles from "./AIFileDetailsViewer.module.scss";
import { buildFileUrl } from "./functions/buildFileUrl";


export type IAIFileDetailsProps = {
    isOpen: boolean;
    onDismiss: () => void;
}

export const AIFileDetailsViewer: React.FC<IAIFileDetailsProps> = (props) => {
    const { onDismiss } = props;
    const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);

    const handleDismiss = React.useCallback(() => {
        setSelectedAiFile(undefined);
        onDismiss();
    }, [setSelectedAiFile, onDismiss]);

    const selectedFileName = selectedAiFile?.Name ?? 'n/a';
    const aiFileUrl = buildFileUrl(selectedAiFile);

    const dialogProps: IDialogContentProps = {
        title: selectedFileName
    };

    return (
        <Dialog hidden={!props.isOpen} onDismiss={handleDismiss}
            styles={{ root: { width: '100%' }, main: { minWidth: '600px' } }}
            modalProps={{ isBlocking: true, className: `${styles.AIFileDetailsDialog}` }}
            dialogContentProps={dialogProps}>
            <DialogContent type={DialogType.normal} styles={
                { content: { width: '100%' } }}>
                <MessageBar messageBarType={MessageBarType.info}>
                    {strings.MessageBarText} {selectedAiFile?.FileExtension}.
                </MessageBar>
                {selectedAiFile &&
                    <iframe
                        name="aiFileViewer"
                        title={strings.IFrameTitle}
                        src={aiFileUrl}
                        style={{ width: '100%', height: '75vh', border: 'none' }}
                    />
                }
            </DialogContent>
        </Dialog>
    );
};