import AIFileObject from "../../../models/AIFileObject";

export enum ItemType {
	All = "All",
	Copilots = "Copilots",
	Agents = "Agents",
}

export const filterItems = (
	items: AIFileObject[],
	filterBy: ItemType,
	showAllFiles: boolean,
	loginName?: string
): AIFileObject[] => {
	let filterByValue: string;

	if (showAllFiles !== undefined && loginName && loginName.length > 0) {
		items = items.filter((item) => {
			return showAllFiles ? true : item.AuthorOWSUser.indexOf(loginName) >= 0;
		});
	}

	switch (filterBy) {
		case ItemType.Copilots:
			filterByValue = "copilot";
			break;
		case ItemType.Agents:
			filterByValue = "agent";
			break;
		case ItemType.All:
			return items;
	}

	return items.filter((item) => {
		return item.FileExtension === filterByValue;
	});
}

export const getEmptyItem = (): AIFileObject => {
	return {
		Name: "",
		FileExtension: "agent",
		DefaultEncodingUrl: undefined!,
		ParentLink: undefined!,
		SPSiteURL: undefined!,
		CreatedBy: undefined!,
		AuthorOWSUser: undefined!,
	};
}
