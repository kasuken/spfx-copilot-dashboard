import * as React from 'react';
import { Card, CardFooter } from "@fluentui/react-components";
import {
  Text,
  Title3,
  Subtitle2,
  Body1,
} from "@fluentui/react-components";

const AgentCard: React.FC<{ name: string | undefined, description: string, instructions: string, agentType?: string }> = (props) => {
  const { name, description, instructions, agentType } = props;

  return (
    <Card style={{ width: 300, padding: 16 }}>
      <Title3>{name}</Title3>
      <Subtitle2>Description</Subtitle2>
      <Body1>{description}</Body1>
      <Subtitle2>Instructions</Subtitle2>
      <Body1>{instructions}</Body1>
      {agentType && 
        <>
            <Subtitle2>Type of Agent</Subtitle2>
                <Body1>{agentType}</Body1>
            <CardFooter>
              <Text weight="semibold">Agent Details</Text>
            </CardFooter>
        </>
      }

    </Card>
  );
};

export default AgentCard;
 