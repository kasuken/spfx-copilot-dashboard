import * as React from 'react';
import styles from './DashboardTable.module.scss';

import { DetailsListLayoutMode, SelectionMode, ShimmeredDetailsList } from '@fluentui/react';
import AIFileObject from '../../models/AIFileObject';
import { AIFilesContext } from '../../context/AIFilesContext';
import { AIFileDetailsViewer } from '../AIFileDetailsViewer/AIFileDetailsViewer';
import getTableColumns from './functions/getTableColumns';

export interface IDashboardTableProps {
  items?: AIFileObject[];
  disabled?: boolean;
}

const DashboardTable: React.FC<IDashboardTableProps> = (props) => {

  const { items } = props;
  const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);
  const columns = getTableColumns();

  return (
    <section className={styles.dashboardTable}>
      <ShimmeredDetailsList
        items={items || []}
        columns={columns}
        setKey="set"
        enableShimmer={!items}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        selectionPreservedOnEmptyClick={true}
      />

      <AIFileDetailsViewer
        isOpen={selectedAiFile !== undefined}
        onDismiss={() => { setSelectedAiFile(undefined); }}
      />
    </section>
  );
};

export default DashboardTable;
