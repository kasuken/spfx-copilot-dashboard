import * as React from 'react';
import * as strings from 'DashboardToolbarStrings';
import styles from './DashboardToolbar.module.scss';
import { Toggle } from '@fluentui/react';

export interface IDashboardToolbarProps {
  showAllFiles?: boolean;
  onChange: (checked?: boolean) => void;
}

const DashboardToolbar: React.FC<IDashboardToolbarProps> = (props) => {
  const { showAllFiles, onChange } = props;

  return (
    <div className={styles.dashboardToolbar}>
      <Toggle
        label={strings.Label}
        onText={strings.AllFiles}
        offText={strings.MyFiles}
        checked={showAllFiles}
        onChange={(ev, checked) => {
          if (onChange) {
            onChange(checked);
          }
        }}
      />
    </div>
  );
};

export default DashboardToolbar;
