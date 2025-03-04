declare interface IDashboardTableStrings {
	Title: string;
	FilterLabel: string;
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
