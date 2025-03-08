declare interface IDashboardTableStrings {
	Title: string;
	FilterLabel: string;
	AllTabTitle: string;
	CopilotsTabTitle: string;
	AgentsTabTitle: string;
	Operations: {
		View: string;
	};
	AIFileObject: {
		FileExtension: string;
		Name: string;
		CreatedBy: string;
		ParentLink: string;
	};
	Messages: {
		NoFileFound: string;
	};
}

declare module "DashboardTableStrings" {
	const strings: IDashboardTableStrings;
	export = strings;
}
