import * as React from "react";
import { Dialog, DialogContent } from "@fluentui/react";
import { AIFileContext } from "../../context/AIFileContext";

export type IAIFileDetailsProps = {
    isOpen: boolean;
    onDismiss: () => void;
}

export const AIFileDetails: React.FC<IAIFileDetailsProps> = (props) => {
    const { isOpen, onDismiss } = props;
    const { selectedItem, setSelectedItem } = React.useContext(AIFileContext);

    const handleDismiss = React.useCallback(() => {
        setSelectedItem(undefined);
        onDismiss();
    }, [setSelectedItem, onDismiss]);

    React.useEffect(() => {
        if (selectedItem) {
            console.log('Selected item in details:', selectedItem);
        }
    }, [selectedItem]);
    console.log(selectedItem);
    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={handleDismiss}
            modalProps={{
                isBlocking: false,
                styles: {
                    main: { maxWidth: '100vw', width: '100vw', minWidth: '100vw', height: '90vh' },
                    root: { maxWidth: '100vw !important', width: '100vw !important' },
                }
            }}>

            <DialogContent title={selectedItem?.Name}>
                {selectedItem &&
                    <iframe
                        src="https://tmaestrinimvp.sharepoint.com/sites/allcompany/_layouts/15/chat.aspx"
                        style={{ width: '100%', height: '75vh', border: 'none' }}
                    />
                }
            </DialogContent>
        </Dialog>
    );
};