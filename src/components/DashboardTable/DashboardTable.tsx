import * as React from 'react';
import styles from './DashboardTable.module.scss';
import * as strings from "DashboardTableStrings";

import { DetailsListLayoutMode, SelectionMode, ShimmeredDetailsList, Pivot, PivotItem, IColumn } from '@fluentui/react';
import AIFileObject from '../../models/AIFileObject';
import { AIFilesContext } from '../../context/AIFilesContext';
import { AIFileDetailsViewer } from '../AIFileDetailsViewer/AIFileDetailsViewer';
import getTableColumns from './functions/getTableColumns';
import { filterItems, ItemType } from './functions/filterItems';

export interface IDashboardTableProps {
  items?: AIFileObject[];
  disabled?: boolean;
}

const DashboardTable: React.FC<IDashboardTableProps> = (props) => {

  const { items } = props;
  const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);
  const columns = getTableColumns();

  const getDashboardTable = (columns: IColumn[], items: AIFileObject[] | undefined, itemType: ItemType) => {
    return <ShimmeredDetailsList
      items={filterItems(items || [], itemType)}
      columns={columns}
      setKey="set"
      enableShimmer={!items}
      layoutMode={DetailsListLayoutMode.justified}
      selectionMode={SelectionMode.none}
      selectionPreservedOnEmptyClick={true}
    />
  }

  return (
    <section className={styles.dashboardTable}>
      <Pivot>
        <PivotItem headerText={strings.AllTabTitle}>
          {getDashboardTable(columns, items, ItemType.All)}
        </PivotItem>
        <PivotItem headerText={strings.CopilotsTabTitle}>
          {getDashboardTable(columns, items, ItemType.Copilots)}
        </PivotItem>
        <PivotItem headerText={strings.AgentsTabTitle}>
          {getDashboardTable(columns, items, ItemType.Agents)}
        </PivotItem>      
      </Pivot>

      <AIFileDetailsViewer
        isOpen={selectedAiFile !== undefined}
        onDismiss={() => { setSelectedAiFile(undefined); }}
      />
    </section>
  );
};

export default DashboardTable;
