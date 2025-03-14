import * as React from 'react';
import * as strings from 'AiFileDetailsWebPartStrings';
import styles from './AiFileDetails.module.scss';
import type { IAiFileDetailsProps, IAiFileDetailsState } from './IAiFileDetailsProps';
import { SPHttpClient } from '@microsoft/sp-http';
import AIHelperDetails from '../../../components/AIHelperDetails/AIHelperDetails';

import { Body1Strong, Card } from "@fluentui/react-components";
//import { Subtitle2 } from "@fluentui/react-components";
import { ConfigurationService } from '../../../services/ConfigurationService';
import CopilotHelper from '../../../components/CopilotHelper/CopilotHelper';
import { IconButton } from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react';
const majicWandIcon: IIconProps = { iconName: 'AutoEnhanceOn' };

export default class AiFileDetails extends React.Component<IAiFileDetailsProps, IAiFileDetailsState> {
  private _configurationService: ConfigurationService;
  private _configuration: any;
  constructor(props: IAiFileDetailsProps) {
    super(props);
    this.state = {
      aiFile: null,
      gptDefinition: null,
      error: "",
      showCopilotHelper: false
    };
  }

  async componentDidMount() {
    const { context, sourceAIFile } = this.props;
    this._configurationService = new ConfigurationService(context);
    this._configuration = await this._configurationService.getConfiguration();
    console.log("✅ Copilot Configuration in componentDidMount:", this._configuration);
    if (sourceAIFile) {
      const aiFile = sourceAIFile.tryGetValue();
      console.log("✅ AI File in componentDidMount:", aiFile);
      this.setState({ aiFile: aiFile ? { value: [aiFile] } : { value: [] } });

      if (aiFile?.DefaultEncodingUrl) {
        await this.fetchAgentFile(aiFile.DefaultEncodingUrl);
      }
    }
  }

  static getDerivedStateFromProps(nextProps: IAiFileDetailsProps, prevState: IAiFileDetailsState) {
    const nextFile = nextProps.sourceAIFile?.tryGetValue();

    if (JSON.stringify(prevState.aiFile) !== JSON.stringify(nextFile)) {
      return { aiFile: nextFile || [] };
    }
    return null;
  }

  componentDidUpdate(prevProps: IAiFileDetailsProps, prevState: IAiFileDetailsState) {
    if (JSON.stringify(prevState.aiFile) !== JSON.stringify(this.state.aiFile)) {
      const file = this.state.aiFile?.value?.[0];
      if (file?.DefaultEncodingUrl) {
        this.fetchAgentFile(file.DefaultEncodingUrl);
      }
    }
  }

  /**
 * Fetches the .agent file content
 */
  fetchAgentFile = async (fileUrl: string) => {
    console.log("🔹 Fetching .agent file:", fileUrl);

    try {
      const response = await this.props.context.spHttpClient.get(fileUrl, SPHttpClient.configurations.v1);

      if (!response.ok) {
        throw new Error(`❌ Failed to fetch file. Status: ${response.status} - ${response.statusText}`);
      }

      const fileText = await response.text();
      const jsonData = JSON.parse(fileText);
      console.log(jsonData.customCopilotConfig?.gptDefinition);
      // ✅ Store gptDefinition in the component's state
      this.setState({ gptDefinition: jsonData.customCopilotConfig?.gptDefinition || null, error: "" });
    } catch (error: any) {
      console.error("❌ Error fetching .agent file:", error);
      this.setState({ error: error.message || JSON.stringify(error) });
    }
  };

  toggleCopilotHelper = () => {
    console.log("🔹 Toggling Copilot Helper");
    this.setState({ showCopilotHelper: !this.state.showCopilotHelper });
  };

  public render(): React.ReactElement<IAiFileDetailsProps> {
    const { title, context, hideWebpartIfEmpty } = this.props;
    const { gptDefinition, aiFile, showCopilotHelper } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return (
      <section className={styles.aiFileDetails}>
        {gptDefinition === null && !hideWebpartIfEmpty &&
          <>
            {title && title.length > 0 && <h1>{title}</h1>}
            <Card style={{ padding: 16 }}>
              <Body1Strong>{strings.SelectFileMessage}</Body1Strong>
            </Card>
          </>
        }
        {gptDefinition !== null && (
          <>
            {title && title.length > 0 && <h1>{title}</h1>}
            <div className={styles.aiContainer}>
              <AIHelperDetails
                name={aiFile?.value?.[0].Name || ""}
                description={gptDefinition.description}
                instructions={gptDefinition.instructions}
              />
              <IconButton iconProps={majicWandIcon} title="Ask the Bishop" ariaLabel="Emoji" onClick={this.toggleCopilotHelper} />
            </div>

            {showCopilotHelper && (
              <CopilotHelper
                key={aiFile?.value?.[0].DefaultEncodingUrl || ''}
                botName={this._configuration.botName}
                botURL={this._configuration.botURL}
                clientID={this._configuration.clientID}
                authority={this._configuration.authority}
                customScope={this._configuration.customScope}
                userEmail={context.pageContext.user.email}
                userFriendlyName={context.pageContext.user.displayName}
                greet={this._configuration.greet}
                userDisplayName={context.pageContext.user.displayName}
                botAvatarImage={this._configuration.botAvatarImage}
                botAvatarInitials={this._configuration.botAvatarInitials}
                welcomeMessage='Asking Copilot to summarize about the selected Agent'
                agentUrl={this.state.aiFile?.value?.[0].DefaultEncodingUrl || ''}
                selectedAgentName={aiFile?.value?.[0].Name || ""}
                isOpen={showCopilotHelper}
                onDismiss={this.toggleCopilotHelper}
              />
            )}

          </>
        )
        }
      </section>
    );
  }
}

