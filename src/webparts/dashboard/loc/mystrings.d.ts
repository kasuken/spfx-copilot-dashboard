declare interface IDashboardWebPartStrings {
	Title: string;
	Messages: {
		NoCopilotFound: string;
	};
}

declare module 'DashboardWebPartStrings' {
  const strings: IDashboardWebPartStrings;
  export = strings;
}
