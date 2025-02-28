import { SPFI } from "@pnp/sp";

import { AIFileObjects } from "../../../models/AIFileObject";

export interface IDashboardProps {
	userIsAdmin: boolean;
	spfI : SPFI;
	onSearchResults: (searchResults: AIFileObjects) => void;
}
