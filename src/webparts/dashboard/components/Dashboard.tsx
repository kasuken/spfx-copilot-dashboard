import * as React from 'react';
import { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import * as strings from 'DashboardWebPartStrings';
import type { IDashboardProps } from './IDashboardProps';
import DashboardTable from '../../../components/DashboardTable/DashboardTable';
import AIFileObject from '../../../models/AIFileObject';
import SkeletonTable from '../../../components/SkeletonTable/SkeletonTable';
import { AIFilesContextProvider } from '../../../context/AIFilesContext';
import { SPOSearchService } from '../../../services/SPOSearchService';

const Dashboard: React.FC<IDashboardProps> = (props) => {
  // Declare state variables
  const [items, setItems] = React.useState<AIFileObject[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        // Create a search service instance
        const searchService = new SPOSearchService(props.spfI);
        // Call the search method
        const results = await searchService.search();
        // Set the items state variable
        setItems(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  

  return (
    <AIFilesContextProvider searchResults={!isLoading && items.length === 0 ? items : []}>
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
              SPSiteURL: undefined!,
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
