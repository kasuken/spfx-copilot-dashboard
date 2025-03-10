import * as React from 'react';
import { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import * as strings from 'DashboardWebPartStrings';
import type { IDashboardProps } from './IDashboardProps';
import DashboardTable from '../../../components/DashboardTable/DashboardTable';
import AIFileObject from '../../../models/AIFileObject';
import { AIFilesContextProvider } from '../../../context/AIFilesContext';
import { SPOSearchService } from '../../../services/SPOSearchService';

const Dashboard: React.FC<IDashboardProps> = (props) => {
  const { context } = props;

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
        props.onSearchResults({ value: results });
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
        {isLoading && <DashboardTable items={undefined!} />}

        {!isLoading && items.length > 0 && (
          <DashboardTable
            items={items}
            userLoginName={context.pageContext.user.loginName} />
        )}
      </section>
    </AIFilesContextProvider>
  );
};

export default Dashboard;
