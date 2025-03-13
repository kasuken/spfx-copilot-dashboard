import * as React from 'react';
import * as strings from 'AIHelperDetailsStrings';
import { Card } from "@fluentui/react-components";
import {
  Title3,
  Subtitle2,
  Body1,
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
    <Card style={{ width: 300, padding: 16 }}>
      <Title3>{name}</Title3>
      <Subtitle2>{strings.Description}</Subtitle2>
      <Body1>{description}</Body1>
      <Subtitle2>{strings.Instructions}</Subtitle2>
      <Body1>{instructions}</Body1>
      {agentType && 
        <>
            <Subtitle2>{strings.TypeOfAgent}</Subtitle2>
            <Body1>{agentType}</Body1>
        </>
      }

    </Card>
  );
};

export default AgentCard;
 