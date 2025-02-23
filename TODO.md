# TODO

Here are some things that need to be done, feel free to update this file as needed:

[] - @GuidoZam: create the structure of the project and the table control (functional component)

[] - @NishkalankBezawada: create the search service

[] - @tmaestrini/@kasuken: create the README

[] - @tmaestrini: create the "Client" web part

# Current Notes

Web part or ACE (Dashboard) to retrieve all the SharePoint Agents from all the SharePoint sites in the tenant
- The agents can be filtered for the agents that the user can access
- The dashboard is configurable to be used by an Administrative user or from a standard user
- The user can open directly the Agent from the dashboard
- "Client" web part that receive the URL of the agent and open it up
- The dashboard web part can be configured to consume Search web part dataset 

## Features to be implemented

[] - Opening the agents

[] - Enable searching

[] - Filtering by category

[] - Filtering by site

[] - Maybe adding an extension available in every lists and libraries that opens up a popup with the available agents/copilots

## Search Query

Search Query text for the file extension:

Filter for agents:
```SecondaryFileExtension:agent```

Filter for copilots:
```SecondaryFileExtension:copilot```

Filter for both:
```SecondaryFileExtension:(agent OR copilot)```

Search query available properties:
```editorowsuser,authorowsuser,Filename,SPSiteURL,Title,ParentLink,ListItemID,ListID,contentclass,IsDocument,IsContainer,FileExtension,SecondaryFileExtension,OriginalPath,DefaultEncodingURL,ServerRedirectedURL,ServerRedirectedPreviewURL,LastModifiedTime,SharedWithUsersOWSUser,HitHighlightedSummary,ModifierDates,LastModifiedTimeForRetention```

### PnP JS integration 

```typescript
const sp = spfi().using(SPBrowser({ baseUrl: (window as any)._spPageContextInfo.webAbsoluteUrl }))

const query: ISearchQuery = {
  SelectProperties: ['editorowsuser','authorowsuser','Filename','SPSiteURL','Title','ParentLink','ListItemID','ListID','contentclass','IsDocument','IsContainer','FileExtension','SecondaryFileExtension','OriginalPath','DefaultEncodingURL','ServerRedirectedURL','ServerRedirectedPreviewURL','LastModifiedTime','SharedWithUsersOWSUser','HitHighlightedSummary','ModifierDates','LastModifiedTimeForRetention'],
  Querytext: `SecondaryFileExtension:('agent' OR 'copilot')`
};
const {PrimarySearchResults} = await sp.search(query);
console.log(PrimarySearchResults);
```
