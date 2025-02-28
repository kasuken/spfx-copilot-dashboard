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
        }) => {

            return {
                Name: result.Title,
                FileExtension: result.FileExtension as 'copilot' | 'agent',
                FileUrl: result.Path,
                DefaultEncodingUrl: result.DefaultEncodingURL,
                ParentLink: result.ParentLink,
                SPSiteURL: result.SPSiteURL
            };
        });
    }
    
}