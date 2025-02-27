import * as React from 'react';
import { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import * as strings from 'DashboardWebPartStrings';
import type { IDashboardProps } from './IDashboardProps';
import DashboardTable from '../../../components/DashboardTable/DashboardTable';
import AIFileObject from '../../../models/AIFileObject';
import SkeletonTable from '../../../components/SkeletonTable/SkeletonTable';
import { AIFilesContextProvider } from '../../../context/AIFilesContext';

const Dashboard: React.FC<IDashboardProps> = (props) => {
  // TODO: Load the actual data from the service
  // Define custom mock items for the table
  const mockItems: AIFileObject[] = [
    {
      Name: 'Documents agent.copilot',
      FileExtension: 'copilot',
      DefaultEncodingUrl: 'https://tmaestrinimvp.sharepoint.com/Shared%20Documents/Documents%20agent.copilot',
      ParentLink: 'https://tmaestrinimvp.sharepoint.com/Shared Documents/Forms/AllItems.aspx',
      SPSiteURL: 'https://tmaestrinimvp.sharepoint.com'
    },
    {
      Name: 'My holy agent.agent',
      FileExtension: 'agent',
      DefaultEncodingUrl: 'https://tmaestrinimvp.sharepoint.com/sites/allcompany/Shared%20Documents/My%20holy%20agent.agent',
      ParentLink: 'https://tmaestrinimvp.sharepoint.com/sites/allcompany/Shared Documents/Forms/AllItems.aspx',
      SPSiteURL: 'https://tmaestrinimvp.sharepoint.com/sites/allcompany'
    },
    {
      Name: 'The Bishops Arms.agent',
      FileExtension: 'agent',
      DefaultEncodingUrl: 'https://tmaestrinimvp.sharepoint.com/sites/DemoTeam1/Shared%20Documents/The%20Bishops%20Arms.agent',
      ParentLink: 'https://tmaestrinimvp.sharepoint.com/sites/DemoTeam1/Shared Documents/Forms/AllItems.aspx',
      SPSiteURL: 'https://tmaestrinimvp.sharepoint.com/sites/DemoTeam1'
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
    <AIFilesContextProvider searchResults={mockItems}>
      <section className={styles.dashboard}>
        <h1>{strings.Title}</h1>
        {isLoading && <SkeletonTable />}

        {!isLoading && items.length === 0 && (
          <DashboardTable
            items={[{
              Name: strings.Messages.NoCopilotFound,
              FileExtension: undefined!,
              DefaultEncodingUrl: undefined!,
              ParentLink: undefined!,
              SPSiteURL: undefined!
            }]}
          />
        )}

        {!isLoading && items.length > 0 && (
          <DashboardTable items={items} />
        )}
      </section>
    </AIFilesContextProvider>
  );
};

export default Dashboard;
