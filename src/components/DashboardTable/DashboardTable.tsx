import * as React from 'react';
import styles from './DashboardTable.module.scss';
import * as strings from "DashboardTableStrings";

import { DetailsListLayoutMode, SelectionMode, ShimmeredDetailsList, Pivot, PivotItem, IColumn } from '@fluentui/react';
import AIFileObject from '../../models/AIFileObject';
import { AIFilesContext } from '../../context/AIFilesContext';
import { AIFileDetailsViewer } from '../AIFileDetailsViewer/AIFileDetailsViewer';
import getTableColumns from './functions/getTableColumns';
import { filterItems, ItemType } from './functions/ItemsFunctions';
import DashboardToolbar from '../DashboardToolbar/DashboardToolbar';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDashboardTableProps {
  items?: AIFileObject[];
  disabled?: boolean;
  context?: WebPartContext;
}

const DashboardTable: React.FC<IDashboardTableProps> = (props) => {

  const { items, context } = props;
  const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);
  const [ showAllFiles, setShowAllFiles ] = React.useState(true);
  const columns = getTableColumns();

  const userLoginName = context?.pageContext?.user?.loginName;

  const getDashboardTable = (columns: IColumn[], items: AIFileObject[] | undefined, itemType: ItemType) => {
    const filteredItems = filterItems(items || [], itemType, showAllFiles, userLoginName);

    if (filteredItems.length === 0) {
      filteredItems.push({
        Name: strings.Messages.NoFileFound,
        FileExtension: undefined!,
        DefaultEncodingUrl: undefined!,
        ParentLink: undefined!,
        SPSiteURL: undefined!,
        CreatedBy: undefined!,
        AuthorOWSUser: undefined!,
      });
    }

    return <ShimmeredDetailsList
      items={filteredItems}
      columns={columns}
      setKey="set"
      enableShimmer={!items}
      layoutMode={DetailsListLayoutMode.justified}
      selectionMode={SelectionMode.none}
      selectionPreservedOnEmptyClick={true}
    />;
  }

  return (
    <section className={styles.dashboardTable}>
      <DashboardToolbar
        showAllFiles={showAllFiles}
        onChange={(checked) => {
          setShowAllFiles(checked === true);
        }}
      />

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
