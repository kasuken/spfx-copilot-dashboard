import { SPFI } from "@pnp/sp";

import { AIFileObjects } from "../../../models/AIFileObject";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDashboardProps {
	userIsAdmin: boolean;
	spfI : SPFI;
	context: WebPartContext;
	onSearchResults: (searchResults: AIFileObjects) => void;
}
