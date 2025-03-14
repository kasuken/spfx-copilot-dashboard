import * as React from 'react';
import * as strings from 'DashboardToolbarStrings';
import { Toggle } from '@fluentui/react';

export interface IDashboardToolbarProps {
  showAllFiles?: boolean;
  onChange: (checked?: boolean) => void;
}

const DashboardToolbar: React.FC<IDashboardToolbarProps> = (props) => {
  const { showAllFiles, onChange } = props;

  return (
    <>
      <Toggle
        inlineLabel
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
    </>
  );
};

export default DashboardToolbar;
