import AIFileObject from "../models/AIFileObject";
import {  SPFI } from "@pnp/sp";
import "@pnp/sp/search";
import { ISearchQuery } from "@pnp/sp/search";


export class SPOSearchService {
    private _spFi: SPFI;
    
    constructor(spFi: SPFI) {
        this._spFi = spFi;
    }

    public async search(): Promise<AIFileObject[]> {
        const query: ISearchQuery = {
            SelectProperties: [
                'editorowsuser', 'authorowsuser', 'Filename', 'SPSiteURL', 'Title', 'ParentLink', 'ListItemID', 
                'ListID', 'contentclass', 'IsDocument', 'IsContainer', 'FileExtension', 'SecondaryFileExtension', 
                'OriginalPath', 'DefaultEncodingURL', 'ServerRedirectedURL', 'ServerRedirectedPreviewURL', 
                'LastModifiedTime', 'SharedWithUsersOWSUser', 'HitHighlightedSummary', 'ModifierDates', 
                'LastModifiedTimeForRetention'
            ],
            Querytext: `SecondaryFileExtension:('agent' OR 'copilot')`
        };
    
        const searchResults = await this._spFi.search(query);
    
        return searchResults.PrimarySearchResults.map((result: { 
            Title: string; 
            FileExtension: string; 
            Path: string;
            DefaultEncodingURL: string;
            ParentLink: string;
            SPSiteURL: string;
            CopilotAgentUrl: string;
        }) => {

            //Format the URL to open the copilot agent
            //https://tmaestrinimvp.sharepoint.com/sites/allcompany/Shared Documents/Forms/AllItems.aspx?id=/sites/allcompany/Shared Documents/My holy agent.agent&parent=/sites/allcompany/Shared Documents
            const parts = result.DefaultEncodingURL.split("/sites");
            const defaultEncodingUrl = parts.length > 1 ? "/sites" + parts[1] : result.DefaultEncodingURL;

            const parentPathparts = result.ParentLink.split("/sites");
            const parentPath = parentPathparts.length > 1 ? "/sites" + parentPathparts[1].split("/Forms")[0] : result.ParentLink;


    
            // Construct the final URL
            const formattedUrl = `${result.ParentLink}?id=${defaultEncodingUrl}&parent=${parentPath}`;
    
            return {
                Name: result.Title,
                FileExtension: result.FileExtension as 'copilot' | 'agent',
                FileUrl: result.Path,
                DefaultEncodingUrl: result.DefaultEncodingURL,
                ParentLink: result.ParentLink,
                SPSiteURL: result.SPSiteURL,
                CopilotAgentUrl: formattedUrl 
            };
        });
    }
    
}