import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';

import * as strings from 'AiFileDetailsWebPartStrings';
import AiFileDetails from './components/AiFileDetails';
import { IAiFileDetailsProps } from './components/IAiFileDetailsProps';
import { DynamicProperty } from "@microsoft/sp-component-base";
import AIFileObject from '../../models/AIFileObject';
import { PropertyPaneDynamicField, PropertyPaneTextField } from "@microsoft/sp-property-pane";

export interface IAiFileDetailsWebPartProps {
	sourceAIFile: DynamicProperty<AIFileObject>;
	title?: string;
}

export default class AiFileDetailsWebPart extends BaseClientSideWebPart<IAiFileDetailsWebPartProps> {
	public render(): void {
		const { sourceAIFile, title } = this.properties;

		const element: React.ReactElement<IAiFileDetailsProps> =
			React.createElement(AiFileDetails, {
				sourceAIFile: sourceAIFile,
				title: title,
				context: this.context
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
              groupName: strings.ConfigurationsGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  value: this.properties.title
                })
              ]
            },
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
