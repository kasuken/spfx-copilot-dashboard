import * as React from 'react';
import styles from './AiFileDetails.module.scss';
import type { IAiFileDetailsProps } from './IAiFileDetailsProps';

export default class AiFileDetails extends React.Component<IAiFileDetailsProps> {
  public render(): React.ReactElement<IAiFileDetailsProps> {
    const { sourceAIFile } = this.props;

    const aiFile = sourceAIFile?.tryGetValue();

    return (
      <section className={styles.aiFileDetails}>
        {/* TODO: Implement the AI File Details component */}
        Selected file: {aiFile ? aiFile.Name : "No file selected"}
      </section>
    );
  }
}
