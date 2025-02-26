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
            SelectProperties: ['editorowsuser','authorowsuser','Filename','SPSiteURL','Title','ParentLink','ListItemID','ListID','contentclass','IsDocument','IsContainer','FileExtension','SecondaryFileExtension','OriginalPath','DefaultEncodingURL','ServerRedirectedURL','ServerRedirectedPreviewURL','LastModifiedTime','SharedWithUsersOWSUser','HitHighlightedSummary','ModifierDates','LastModifiedTimeForRetention'],
            Querytext: `SecondaryFileExtension:('agent' OR 'copilot')`
          };
        const searchResults = await this._spFi.search(query);
        console.log(searchResults.PrimarySearchResults);
        return searchResults.PrimarySearchResults.map((result: { Title: any; FileExtension: any; Path: any; }) => ({
            Name: result.Title,
            FileExtension: result.FileExtension,
            FileUrl: result.Path
        }));
    }
}