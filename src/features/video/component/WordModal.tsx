import { Modal } from '../../../components/Modal';
import { EntryDetailContainer } from '../../../libs/Dictionary';
import styles from './WordModal.module.scss';

type WordModalProps = {
  onClose: () => void;
  wordHtml?: string;
};
export const WordModal = ({ onClose, wordHtml }: WordModalProps) => {
  return (
    <Modal open={!!wordHtml} onClose={onClose}>
      <div className={styles.container}>
        {wordHtml && (
          <EntryDetailContainer className={styles.entry} wordHtml={wordHtml} />
        )}
      </div>
    </Modal>
  );
};
