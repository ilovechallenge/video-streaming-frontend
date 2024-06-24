import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLearningHistory } from '../../../../hooks/learning-history';
import { getEntryDetail } from '../../../../libs/Dictionary';
import {
  setVideoBestStamps,
  setVideoGoodStamps,
  setVideoNormalStamps,
} from '../../../../stores/store';
import {
  useCreateStampMutation,
  useGetWordsQuery,
} from '../../../api/api-slice';

export const useVideoDetail = () => {
  // TODO
  const genre = 'todo';

  const dispatch = useDispatch();
  const { post: postLearningHistory } = useLearningHistory();

  const { videoId, gradeId } = useParams() as {
    videoId: string;
    gradeId: string;
  };
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showWordModal, setShowWordModal] = useState(false);
  const [word, setWord] = useState('');
  const [chpList, setChpList] = useState(false);
  const [stmpList, setStmpList] = useState(false);
  const [stmpClear, setStmpClear] = useState(false);
  const [inputMode, setInputMode] = useState(); // undefined / "keyboard" / "touch"
  const [stmpGraph, setStmpGraph] = useState(false);
  const [stampHeaderStr, setStampHeaderStr] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [wordId, setWordId] = useState('');

  const [answerText, setAnswerText] = useState('');
  const [answerDrawing, setAnswerDrawing] = useState([]); // canvas.PlotEventType[]
  const [answerTextRecognized, setAnswerTextRecognized] = useState('');

  const [normalStamps, setNormalStamps] = useState<number[]>([]);
  const [goodStamps, setGoodStamps] = useState<number[]>([]);
  const [bestStamps, setBestStamps] = useState<number[]>([]);

  // @ts-ignore TODO
  const videoState = useSelector((state: any) => state.videos[videoId]);

  const { data: wordsData, isLoading } = useGetWordsQuery(wordId);

  const [createStamp, { isLoading: stampLoading, isError }] =
    useCreateStampMutation();

  useEffect(() => {
    if (videoState) {
      setNormalStamps(videoState.normalStamps);
      setGoodStamps(videoState.goodStamps);
      setBestStamps(videoState.bestStamps);
    }
    // TODO
    let params = {
      grade_id: gradeId,
      unit_id: videoId,
      category_id: 2,
    };
    const url =
      'http://video-streaming-api.mastercode.jp:8000/videos/get_video';
    // @ts-ignore
    const queryParams = new URLSearchParams(params);
    const endpoint = `${url}?${queryParams}`;
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          console.log('response', response);
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        console.log('Get Video successful:', data);
        setVideoURL(data.video_url);
        setWordId(data.video_id);
      })
      .catch((error) => {
        console.error('Get Video error:', error);
      });
  }, []);

  const videoRef = useRef<ReactPlayer>(null);

  const openQuestionModal = () => {
    postLearningHistory('toibox_question_edit', {
      movie_id: videoId,
      genre: `${genre}`,
      question: videoState?.question,
    });
    setShowQuestionModal(true);
  };

  const closeQuestionModal = () => {
    setShowQuestionModal(false);
  };

  // TODO
  // @ts-ignore
  const openWordModal = async (word) => {
    setShowWordModal(true);
    // getWordId(word);
    // TODO replace mock
    const data = await getEntryDetail(
      33504,
      'AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH',
    );
    setWord(data.arg1);
  };

  const closeWordModal = () => {
    setShowWordModal(false);
    setWord('');
  };

  const handleNormalClick = () => {
    if (normalStamps.length >= 3) return;
    const currentTIme = getCurrentTime();
    if (currentTIme == null) return;
    setNormalStamps([...normalStamps, currentTIme]);
    dispatch(
      setVideoNormalStamps({
        videoId: videoId,
        stamps: [...normalStamps, currentTIme],
      }),
    );
    postLearningHistory('stamp_put', {
      movie_id: videoId,
      genre: `${genre}`,
      stamp_type: 1,
      stamp_at: currentTIme,
    });
  };

  const handleGoodClick = () => {
    if (goodStamps.length >= 3) return;
    const currentTIme = getCurrentTime();
    if (currentTIme == null) return;
    setGoodStamps([...goodStamps, currentTIme]);
    dispatch(
      setVideoGoodStamps({
        videoId: videoId,
        stamps: [...goodStamps, currentTIme],
      }),
    );
    postLearningHistory('stamp_put', {
      movie_id: videoId,
      genre: `${genre}`,
      stamp_type: 2,
      stamp_at: currentTIme,
    });
  };

  const handleBestClick = () => {
    if (bestStamps.length >= 3) return;
    const currentTIme = getCurrentTime();
    if (currentTIme == null) return;
    setBestStamps([...bestStamps, currentTIme]);
    dispatch(
      setVideoBestStamps({
        videoId: videoId,
        stamps: [...bestStamps, currentTIme],
      }),
    );
    postLearningHistory('stamp_put', {
      movie_id: videoId,
      genre: `${genre}`,
      stamp_type: 3,
      stamp_at: currentTIme,
    });
  };

  const getCurrentTime = () => {
    return videoRef.current?.getCurrentTime();
  };

  const getWordId = (text: string) => {
    fetch(
      `https://mastercode.jp/apps/api/dictionary/search/?mode=esjp&search_word=${text}&search_mode=exact`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        if (response.ok) {
          console.log('getWordId', response);
          return response.json();
        }
        console.log('what is getWordId: ', response);

        throw new Error('getWordId response was not ok');
      })
      .then((data) => {
        console.log('getWordId successful:', data);

        let pattern = /showDetailUNI_(\d+)_search/;

        let matches = pattern.exec(data);

        if (matches) {
          let extractedNumber = matches[1];
          console.log(extractedNumber);
          getWordContent(extractedNumber);
        } else {
          console.log('No match found.');
        }
      })
      .catch((error) => {
        console.error('getWordId error:', error);
      });
  };

  const getWordContent = (id: string) => {
    fetch(
      `https://mastercode.jp/apps/api/dictionary/show_detail/?useruuid=AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH&mode=esjp&id=${id}&referrer=1&invoker=spread&discard_zoom=discard`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        if (response.ok) {
          console.log('getWordContent', response);
          return response.json();
        }
        console.log('what is getWordContent: ', response);

        throw new Error('getWordContent response was not ok');
      })
      .then((data) => {
        console.log('getWordContent successful:', data);
        let temp = data.arg1;
        setWord(temp);
      })
      .catch((error) => {
        console.error('getWordContent error:', error);
        setWord(error);
      });
  };

  return {
    videoId,
    genre: gradeId, // TODO 古典
    videoRef,
    videoURL,
    question: videoState?.question,

    normalCount: normalStamps.length,
    handleNormalClick,
    goodCount: goodStamps.length,
    handleGoodClick,
    bestCount: bestStamps.length,
    handleBestClick,

    wordsData,
    openWordModal,
    closeWordModal,
    word,

    inputMode,
    setInputMode,
    answerText,
    setAnswerText,
    answerDrawing,
    setAnswerDrawing,
    answerTextRecognized,
    setAnswerTextRecognized,

    openQuestionModal,
    closeQuestionModal,
    showQuestionModal,
  };
};
