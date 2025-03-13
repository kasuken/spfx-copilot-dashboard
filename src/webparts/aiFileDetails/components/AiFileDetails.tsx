import * as React from 'react';
import * as strings from 'AiFileDetailsWebPartStrings';
import styles from './AiFileDetails.module.scss';
import type { IAiFileDetailsProps, IAiFileDetailsState } from './IAiFileDetailsProps';
import { SPHttpClient } from '@microsoft/sp-http';
import AIHelperDetails from '../../../components/AIHelperDetails/AIHelperDetails';
import { Card } from "@fluentui/react-components";
import { Subtitle2 } from "@fluentui/react-components";

export default class AiFileDetails extends React.Component<IAiFileDetailsProps,IAiFileDetailsState> {
  constructor(props: IAiFileDetailsProps) {
    super(props);
    this.state = {
      aiFile: null,
      gptDefinition: null,
      error: ""
    };
  }

  componentDidMount() {
    if (this.props.sourceAIFile) {
      const aiFile = this.props.sourceAIFile.tryGetValue();
      console.log("✅ AI File in componentDidMount:", aiFile);
      this.setState({ aiFile: aiFile ? { value: [aiFile] } : { value: [] } });
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

      // ✅ Store gptDefinition in the component's state
      this.setState({ gptDefinition: jsonData.customCopilotConfig?.gptDefinition || null, error: "" });
    } catch (error: any) {
      console.error("❌ Error fetching .agent file:", error);
      this.setState({ error: error.message || JSON.stringify(error) });
    }
  };

  public render(): React.ReactElement<IAiFileDetailsProps> {
    const { title } = this.props;
    const { gptDefinition, aiFile } = this.state;
    return (
      <section className={styles.aiFileDetails}>
        {gptDefinition === null && 
        <>
          {title && title.length > 0 && <h1>{title}</h1>}
          <Card style={{ width: 300, padding: 16 }}>
            <Subtitle2>{strings.SelectFileMessage}</Subtitle2>
          </Card>
        </>
        }
        {gptDefinition !== null && (
            <>
              {title && title.length > 0 && <h1>{title}</h1>}
              <AIHelperDetails
                name={aiFile?.value?.[0].Name || ""}
                description={gptDefinition.description}
                instructions={gptDefinition.instructions}
              />
            </>
          )
        }
      </section>
    );
  }
}

