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

export interface IDashboardTableProps {
  items?: AIFileObject[];
  disabled?: boolean;
  userLoginName?: string;
  onItemClicked?: (selectedItem: AIFileObject) => void;
}

const DashboardTable: React.FC<IDashboardTableProps> = (props) => {

  const { items, userLoginName } = props;
  const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);
  const [showAllFiles, setShowAllFiles] = React.useState(true);
  const columns = getTableColumns();

  const filteredItems = React.useCallback((itemType: ItemType) => {
    const filtered = filterItems(items || [], itemType, showAllFiles, userLoginName);

    if (filtered.length === 0) {
      filtered.push({
        Name: strings.Messages.NoFileFound,
        FileExtension: undefined!,
        DefaultEncodingUrl: undefined!,
        ParentLink: undefined!,
        SPSiteURL: undefined!,
        CreatedBy: undefined!,
        AuthorOWSUser: undefined!,
      });
    }
    return filtered;
  }, [showAllFiles]);

  const renderDashboardTable = (columns: IColumn[], items: AIFileObject[]) => {
    return <ShimmeredDetailsList
      items={items}
      columns={columns}
      setKey="set"
      enableShimmer={!items}
      layoutMode={DetailsListLayoutMode.justified}
      selectionMode={SelectionMode.none}
      selectionPreservedOnEmptyClick={true}
      onActiveItemChanged={(item: AIFileObject) => {
        if (props.onItemClicked) {
          props.onItemClicked(item);
        }
      }
      }
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
          {renderDashboardTable(columns, filteredItems(ItemType.All))}
        </PivotItem>
        <PivotItem headerText={strings.CopilotsTabTitle}>
          {renderDashboardTable(columns, filteredItems(ItemType.Copilots))}
        </PivotItem>
        <PivotItem headerText={strings.AgentsTabTitle}>
          {renderDashboardTable(columns, filteredItems(ItemType.Agents))}
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
