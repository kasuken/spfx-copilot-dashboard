import * as React from 'react';
import { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import * as strings from 'DashboardWebPartStrings';
import type { IDashboardProps } from './IDashboardProps';
import DashboardTable from '../../../components/DashboardTable/DashboardTable';
import AIFileObject from '../../../models/AIFileObject';
import SkeletonTable from '../../../components/SkeletonTable/SkeletonTable';
import { SPOSearchService } from '../../../services/SPOSearchService';

const Dashboard: React.FC<IDashboardProps> = (props) => {
  // TODO: Load the actual data from the service
  // Define custom mock items for the table
  const mockItems: AIFileObject[] = [
    {
      Name: 'Item 1',
      FileExtension: 'copilot',
      FileUrl: 'https://www.bing.com',
      DefaultEncodingUrl: 'https://www.bing.com',
      ParentLink: 'https://www.bing.com',
      SPSiteURL: 'https://www.bing.com',
      CopilotAgentUrl: 'https://www.bing.com'
    },
    {
      Name: 'Item 2',
      FileExtension: 'agent',
      FileUrl: 'https://www.bing.com',
      DefaultEncodingUrl: 'https://www.bing.com',
      ParentLink: 'https://www.bing.com',
      SPSiteURL: 'https://www.bing.com',
      CopilotAgentUrl: 'https://www'
    },
    {
      Name: 'Item 3',
      FileExtension: 'copilot',
      FileUrl: 'https://www.bing.com',
      DefaultEncodingUrl: 'https://www.bing.com',
      ParentLink: 'https://www.bing.com',
      SPSiteURL: 'https://www.bing.com',
      CopilotAgentUrl: 'https://www.bing.com'
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
    }, 3000);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const searchService = new SPOSearchService(props.spfI);
        const results = await searchService.search();
        console.log(results);
        setItems(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  

  return (
    <section className={styles.dashboard}>
      <h1>{strings.Title}</h1>
      {/* Show the skeleton table while loading data */}
      {isLoading && 
        <SkeletonTable />}

      {/* Show the table when data is loaded and there are no items available */}
      {!isLoading && 
        items.length === 0 && 
        DashboardTable({
          items: [{
            Name: strings.Messages.NoCopilotFound,
            FileExtension: undefined!,
            FileUrl: undefined!,
            DefaultEncodingUrl: undefined!,
            ParentLink: undefined!,
            SPSiteURL: undefined!,
            CopilotAgentUrl: undefined!
          }]
        })}

      {/* Show the table when data is loaded and there are items available */}
      {!isLoading && 
        items.length > 0 && 
        DashboardTable({
          items: items
        })}
    </section>
  );
};

export default Dashboard;
