declare interface IDashboardTableStrings {
	Title: string;
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
