import * as React from 'react';
import { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import * as strings from 'DashboardWebPartStrings';
import type { IDashboardProps } from './IDashboardProps';
import DashboardTable from '../../../components/DashboardTable/DashboardTable';
import AIFileObject from '../../../models/AIFileObject';
import SkeletonTable from '../../../components/SkeletonTable/SkeletonTable';
import { AIFileContextProvider } from '../../../context/AIFileContext';

const Dashboard: React.FC<IDashboardProps> = (props) => {
  // TODO: Load the actual data from the service
  // Define custom mock items for the table
  const mockItems: AIFileObject[] = [
    {
      Name: 'Item 1',
      FileExtension: 'copilot',
      FileUrl: 'https://www.bing.com',
    },
    {
      Name: 'Item 2',
      FileExtension: 'agent',
      FileUrl: 'https://www.bing.com',
    },
    {
      Name: 'Item 3',
      FileExtension: 'copilot',
      FileUrl: 'https://www.bing.com',
    }
  ];

  // Declare state variables
  const [items, setItems] = React.useState<AIFileObject[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    // Load the data from the service
    setItems(mockItems);

    // TODO: Remove the following, it's only for demonstration purposes using mock data
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <section className={styles.dashboard}>
      <AIFileContextProvider searchResultItems={items}>
        <h1>{strings.Title}</h1>
        {isLoading && <SkeletonTable />}
        
        {!isLoading && items.length === 0 && (
          <DashboardTable
            items={[{
              Name: strings.Messages.NoCopilotFound,
              FileExtension: undefined!,
              FileUrl: undefined!
            }]}
          />
        )}

        {!isLoading && items.length > 0 && (
          <DashboardTable items={items} />
        )}
      </AIFileContextProvider>
    </section>
  );
};

export default Dashboard;
