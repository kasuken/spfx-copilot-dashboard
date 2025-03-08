import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';

import * as strings from 'AiFileDetailsWebPartStrings';
import AiFileDetails from './components/AiFileDetails';
import { IAiFileDetailsProps } from './components/IAiFileDetailsProps';
import { DynamicProperty } from "@microsoft/sp-component-base";
import AIFileObject from '../../models/AIFileObject';
import { PropertyPaneDynamicField } from "@microsoft/sp-property-pane";

export interface IAiFileDetailsWebPartProps {
  sourceAIFile: DynamicProperty<AIFileObject>;
}

export default class AiFileDetailsWebPart extends BaseClientSideWebPart<IAiFileDetailsWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IAiFileDetailsProps> =
			React.createElement(AiFileDetails, {
				sourceAIFile: this.properties.sourceAIFile,
			});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.DynamicGroupName,
							groupFields: [
								PropertyPaneDynamicField("sourceAIFile", {
									label: strings.SourceAIFileFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
