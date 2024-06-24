import clsx from 'clsx';
import { useState } from 'react';
import { MOCK_WORD_DATA } from '../../../../__mocks__';
import { CustomPlayer } from '../../../../components/CustomPlayer';
import { PlotEventType } from '../../../../components/DrawingCanvas';
import { Layout } from '../../../../components/Layout';
import { useLearningHistory } from '../../../../hooks/learning-history';
import { postCharacterRecognition } from '../../../../libs/CharacterRecognition';
import { useAuthContext } from '../../../../libs/auth/middleware/auth/AuthContext';
import { STAMPS } from '../../../learing-history';
import { BarChartModal } from '../../component/BarChartModal';
import {
  QuestionBoard,
  QuestionBoardProps,
} from '../../component/QuestionBoard';
import {
  QuestionEditorModal,
  QuestionEditorModalProps,
} from '../../component/QuestionEditorModal';
import {
  MOCK_MY_STAMPS,
  MOCK_STAMP_CHART_DATA,
  Stamp,
} from '../../component/StampBarChart';
import { StampForm } from '../../component/StampForm';
import { WordList } from '../../component/WordList';
import { WordModal } from '../../component/WordModal';
import styles from './styles.module.scss';
import { useVideoDetail } from './useVideoDetail';

export const VideoDetail = () => {
  const auth = useAuthContext();
  const isTeacher = auth.isTeacher?.() || false;
  const user = auth.getCurrentUser?.();

  const { post: postLearningHistory } = useLearningHistory();

  const {
    videoId,
    genre,
    videoRef,
    videoURL,

    openWordModal,
    closeWordModal,
    word,

    normalCount,
    goodCount,
    bestCount,
    handleNormalClick,
    handleGoodClick,
    handleBestClick,

    answerText,
    setAnswerText,
    answerDrawing,
    setAnswerDrawing,
    answerTextRecognized,
    setAnswerTextRecognized,

    showQuestionModal,
    openQuestionModal,
    closeQuestionModal,

    ...values
  } = useVideoDetail();
  const wordsData = (values.wordsData || [MOCK_WORD_DATA]) as {
    id: string;
    word_text: string;
  }[];
  const inputMode = values.inputMode as QuestionBoardProps['inputMode'];
  const setInputMode =
    values.setInputMode as QuestionBoardProps['setInputMode'];

  const [showStampBarChartModal, setShowStampBarChartModal] = useState(false);

  // TODO 回答保存・文字認識周りの処理
  const submitAnswer = async (data: {
    mode: 'keyboard' | 'touch';
    text: string;
    drawing: PlotEventType[];
  }) => {
    if (!data.drawing.length) return;
    const strokes = data.drawing.reduce<[number, number][][]>((acc, cur) => {
      switch (cur.action) {
        case 'begin':
          acc.push([]);
          break;
        default:
          if (cur.x != null && cur.y != null) {
            acc[acc.length - 1].push([Math.floor(cur.x), Math.floor(cur.y)]);
          }
          break;
      }
      return acc;
    }, []);

    const result = await postCharacterRecognition({
      strokes,
    });
    setAnswerTextRecognized(result?.recognition || '');
  };

  // TODO 「問い」更新周りのサーバー連携
  const saveQuestion = async (data: {
    gradeId: number;
    class: string;
    question: string;
  }) => {};
  const questionByClass: QuestionEditorModalProps['questionsByClass'] = [
    {
      gradeId: 2,
      class: '1組',
      question: 'どうがを見て、どんなことを思いましたか。',
    },
    {
      gradeId: 2,
      class: '2組',
      question: 'どうがを見て、どんなことを思いませんでしたか。',
    },
  ];
  const defaultQuestion =
    'どうがを見て、どんなことを思いましたか。\n書いてみましょう。';
  const question = values.question || defaultQuestion;

  // TODO stamp周りのサーバー連携
  const classes = isTeacher
    ? [
        { gradeId: 2, class: '1' },
        { gradeId: 2, class: '2' },
        { gradeId: 2, class: '3' },
      ]
    : [];
  const [classIndex, setClassIndex] = useState(0);
  const stampChartData = MOCK_STAMP_CHART_DATA;
  const myStamps = MOCK_MY_STAMPS;
  const submitDeleteStamps = async (stamps: Stamp[]) => {
    // TODO delete stamps

    stamps.forEach(({ type, at }) => {
      postLearningHistory('stamp_delete', {
        movie_id: videoId!,
        genre: `${genre}`,
        stamp_type: STAMPS[type],
        stamp_at: at,
      });
    });
  };
  return (
    <>
      <Layout className={styles.main}>
        <div className={clsx(styles.body, inputMode && styles.inputting)}>
          <div className={styles.video}>
            <div className={styles['player-container']}>
              <p>どうがを みて、かんじた きもちの ボタンを おしましょう。</p>
              <div className={styles.row}>
                <div className={styles.player}>
                  {user ? (
                    <CustomPlayer
                      ref={videoRef}
                      url={videoURL}
                      id="MainPlay"
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    '動画を視聴する権限がありません。'
                  )}
                </div>
                <StampForm
                  className={styles['stamp-form']}
                  normalCount={normalCount}
                  handleNormalClick={handleNormalClick as () => Promise<void>}
                  goodCount={goodCount}
                  handleGoodClick={handleGoodClick as () => Promise<void>}
                  bestCount={bestCount}
                  handleBestClick={handleBestClick as () => Promise<void>}
                  showStampBarChartModal={() => {
                    postLearningHistory('stamp_view', {
                      movie_id: videoId!,
                      genre: `${genre}`,
                    });
                    setShowStampBarChartModal(true);
                  }}
                />
              </div>
            </div>
            <WordList
              className={styles['word-list']}
              wordData={wordsData}
              openWordModal={openWordModal}
            />
            {user ? (
              <CustomPlayer
                ref={videoRef}
                url={videoURL}
                id="MainPlay"
                width="100%"
                height="100%"
              />
            ) : (
              ''
            )}
          </div>
          <QuestionBoard
            videoId={videoId!}
            genre={genre!}
            question={question}
            inputMode={inputMode}
            setInputMode={setInputMode}
            answerText={answerText}
            setAnswerText={setAnswerText}
            answerDrawing={answerDrawing}
            setAnswerDrawing={
              setAnswerDrawing as QuestionBoardProps['setAnswerDrawing']
            }
            answerTextRecognized={answerTextRecognized}
            submitAnswer={submitAnswer}
            editQuestion={openQuestionModal}
            isTeacher={isTeacher}
          />
        </div>
        <BarChartModal
          isOpen={showStampBarChartModal}
          onClose={() => setShowStampBarChartModal(false)}
          data={stampChartData}
          myStamps={myStamps}
          submitDeleteStamp={submitDeleteStamps}
          classes={classes}
          classIndex={classIndex}
          setClassIndex={setClassIndex}
        />
      </Layout>
      <WordModal wordHtml={word} onClose={closeWordModal} />
      <QuestionEditorModal
        videoId={videoId!}
        genre={genre!}
        isOpen={showQuestionModal}
        onClose={closeQuestionModal}
        submit={saveQuestion}
        questionsByClass={questionByClass}
        defaultQuestion={defaultQuestion}
      />
    </>
  );
};
