import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/svgs/back.svg';
import { ReactComponent as HomeIcon } from '../../assets/svgs/home.svg';
import { ReactComponent as LogoutIcon } from '../../assets/svgs/logout.svg';
import { useAuthContext } from '../../libs/auth/middleware/auth/AuthContext';
import { ROUTES_EXT } from '../../utils/routes';
import { buttonStyles } from '../Elements/Button';
import styles from './styles.module.scss';

export const Navigation = ({
  className,
  noBack,
}: {
  className?: string;
  noBack?: boolean;
}) => {
  const navigate = useNavigate();
  const { processLogout, isTeacher } = useAuthContext();
  return (
    <nav className={clsx(className, styles.nav)}>
      <div>
        {!noBack && (
          <button
            className={buttonStyles['secondary-icon']}
            onClick={() => navigate(-1)}
          >
            <BackIcon />
            もどる
          </button>
        )}
      </div>
      <div>
        <a
          className={buttonStyles['secondary-icon']}
          href={
            isTeacher?.() ? ROUTES_EXT.home.teacher : ROUTES_EXT.home.student
          }
        >
          <HomeIcon />
          {`トモプラ\nホーム`}
        </a>
        <button
          className={buttonStyles['secondary-icon']}
          onClick={() => {
            processLogout?.().then(() => {
              window.location.href = ROUTES_EXT.logout;
            });
          }}
        >
          <LogoutIcon className={buttonStyles.secondary} />
          ログアウト
        </button>
      </div>
    </nav>
  );
};
