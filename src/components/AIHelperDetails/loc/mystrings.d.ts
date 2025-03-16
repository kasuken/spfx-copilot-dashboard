declare interface IAIHelperDetailsStrings {
	Description: string;
	Instructions: string;
	TypeOfAgent: string;
	MajicWandButtonText: string;
}

declare module "AIHelperDetailsStrings" {
	const strings: IAIHelperDetailsStrings;
	export = strings;
}
