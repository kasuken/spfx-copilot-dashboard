import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-users";
import Dashboard from './components/Dashboard';
import { IDashboardProps } from './components/IDashboardProps';

export interface IDashboardWebPartProps {
}

export default class DashboardWebPart extends BaseClientSideWebPart<IDashboardWebPartProps> {

  private _userIsAdmin: boolean = false;
  private _spFi : SPFI;
  public render(): void {
    const element: React.ReactElement<IDashboardProps> = React.createElement(
      Dashboard,
      {
        userIsAdmin: this._userIsAdmin,
        spfI : this._spFi
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
		
    // Initialize PnPjs with the current context
    this._spFi = spfi().using(SPFx(this.context));
    
    // Check if the current user is an admin
    this._userIsAdmin = await this._checkUserIsAdmin(this._spFi);
  }

  private async _checkUserIsAdmin(sp: SPFI): Promise<boolean> {
    const user = await sp.web.currentUser();
    return user.IsSiteAdmin;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--bodyBackground', semanticColors.bodyBackground || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // TODO: Remove if not needed
  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
}
