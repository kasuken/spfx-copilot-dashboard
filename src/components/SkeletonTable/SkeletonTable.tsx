import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';
import styles from './SkeletonTable.module.scss';

interface ISkeletonTableProps {
  rows?: number;
}

const SkeletonTable: React.FC<ISkeletonTableProps> = (props) => {
  const { rows } = props;
  const numberOfRows = rows || 3;
  const skeletonRows = [];

  for (let i = 0; i < numberOfRows; i++) {
    skeletonRows.push(
      <div key={i} className={styles.row}>
        <SkeletonItem size={40} />
      </div>
    );
  }

  return (
    <div className={styles.skeletonTable}>
      <Skeleton>
        <div className={styles.header}>
          <SkeletonItem size={32} />
        </div>
        {skeletonRows}
      </Skeleton>
    </div>
  );
};

export default SkeletonTable;