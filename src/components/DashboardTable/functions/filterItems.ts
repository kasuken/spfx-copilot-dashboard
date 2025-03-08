import AIFileObject from "../../../models/AIFileObject";

export enum ItemType {
	All = "All",
	Copilots = "Copilots",
	Agents = "Agents",
}

export const filterItems = (
	items: AIFileObject[],
	filterBy: ItemType
): AIFileObject[] => {
	let filterByValue: string;
	console.log(items);
	console.log(filterBy);
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
};
