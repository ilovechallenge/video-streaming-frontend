import { useVideoSelector } from '../../../../stores/store';

export const useVideoCard = ({
  videoId,
  gradeId,
}: {
  videoId: string;
  gradeId: number | string | undefined;
}) => {
  const to = `/videos/detail/${videoId}/${gradeId}`;
  const videoState = useVideoSelector(videoId);
  const status = videoState
    ? {
        useStamp: !![
          ...(videoState.normalStamps || []),
          ...(videoState.goodStamps || []),
          ...(videoState.bestStamps || []),
        ].length,
        useQuestion: !!videoState.question,
      }
    : { useStamp: 0, useQuestion: 0 };
  // TODO 非活性の場合？ ref: https://www.figma.com/file/EmTH8Qq5a1eIYJaDzk4Boo/%E3%83%88%E3%83%A2%E3%83%97%E3%83%A9-%E2%91%A3%E6%98%A0%E5%83%8F%E8%B3%87%E6%96%99?node-id=2113%3A6338&mode=dev
  const disabled = false;
  return {
    to,
    ...status,
    disabled,
  };
};
