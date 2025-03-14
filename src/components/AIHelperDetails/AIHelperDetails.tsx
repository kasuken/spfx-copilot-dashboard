import * as React from 'react';
import * as strings from 'AIHelperDetailsStrings';
import styles from './AIHelperDetails.module.scss';
import { useTheme } from '@fluentui/react';
import {
  Subtitle1,
  Body1,
  Body1Strong,
  Card,
  CardFooter
} from "@fluentui/react-components";
import { ActionButton } from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react';


interface IAgentCardProps {
  name: string;
  description: string;
  instructions: string;
  agentType?: string;
}

const AgentCard: React.FC<IAgentCardProps> = (props) => {
  const { name, description, instructions, agentType } = props;
  const theme = useTheme();
  const majicWandIcon: IIconProps = { iconName: 'AutoEnhanceOn', styles: { root: { color: theme.palette.neutralLight } } };

  return (
    <section>
      <div className={styles.title}>
        <Subtitle1>{name}</Subtitle1>
      </div>
      <Card style={{
        width: "100%",
        padding: 20,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", // Reduced shadow intensity
        borderRadius: "8px",
        border: `1px solid ${theme.palette.neutralLight}`,
        backgroundColor: theme.palette.neutralLighterAlt
      }}>
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
        <CardFooter>
          <ActionButton text={strings.MajicWandButtonText} className={styles['btn-grad']} iconProps={majicWandIcon} title={strings.MajicWandButtonText} ariaLabel="Emoji" onClick={() => { }} />
        </CardFooter>
      </Card>
    </section>
  );
};

export default AgentCard;
