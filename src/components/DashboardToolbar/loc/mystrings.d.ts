declare interface IDashboardToolbarStrings {
	Label: string;
	AllFiles: string;
	MyFiles: string;
}

declare module "DashboardToolbarStrings" {
	const strings: IDashboardToolbarStrings;
	export = strings;
}
