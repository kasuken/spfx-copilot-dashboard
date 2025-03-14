import * as React from 'react';
import * as strings from 'AIHelperDetailsStrings';
import styles from './AIHelperDetails.module.scss';

import {
  Subtitle1,
  Body1,
  Body1Strong,
  Card
} from "@fluentui/react-components";

interface IAgentCardProps {
  name: string;
  description: string;
  instructions: string;
  agentType?: string;
}

const AgentCard: React.FC<IAgentCardProps> = (props) => {
  const { name, description, instructions, agentType } = props;

  return (
    <section>
      <div className={styles.title}>
        <Subtitle1>{name}</Subtitle1>
      </div>
      <Card style={{ width: "100%", padding: 16 }}>
        <Body1Strong>{strings.Description}</Body1Strong>
        <Body1>{description}</Body1>
        <Body1Strong>{strings.Instructions}</Body1Strong>
        <Body1>{instructions}</Body1>
        {agentType &&
          <>
            <Body1Strong>{strings.TypeOfAgent}</Body1Strong>
            <Body1>{agentType}</Body1>
          </>
        }
      </Card>
    </section>
  );
};

export default AgentCard;
