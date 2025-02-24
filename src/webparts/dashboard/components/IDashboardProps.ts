import { AIFileObjects } from "../../../models/AIFileObject";

export interface IDashboardProps {
	userIsAdmin: boolean;
	onSearchResults: (searchResults: AIFileObjects) => void;
}
