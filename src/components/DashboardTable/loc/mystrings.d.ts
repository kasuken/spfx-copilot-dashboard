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
    Name: string;
  };
}

declare module "DashboardTableStrings" {
	const strings: IDashboardTableStrings;
	export = strings;
}
