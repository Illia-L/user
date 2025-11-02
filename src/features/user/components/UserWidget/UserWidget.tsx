import React from 'react';
import clsx from 'clsx';
import styles from './UserWidget.module.css';
import { useLocation } from 'react-router';
import { AppLink } from '../../../../components/AppLink/AppLink';
import { useAppSelector } from '../../../../redux/hooks';
import { selectIsLoggedIn, selectName } from '../../redux/selectors';

interface UserWidgetProps {
  className?: string;
  isAuthenticated?: boolean;
  userName?: string;
}

export const UserWidget: React.FC<UserWidgetProps> = ({ className }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userName = useAppSelector(selectName);
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={clsx(styles.userWidget, className)}>
      {isLoggedIn ? (
        <AppLink
          to='/account'
          variant='link'
          // className={styles.profileBtn}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M18 20a6 6 0 0 0-12 0' />
            <circle
              cx='12'
              cy='10'
              r='4'
            />
            <circle
              cx='12'
              cy='12'
              r='10'
            />
          </svg>
          {userName || 'User'}
        </AppLink>
      ) : (
        <>
          <AppLink
            to='/account/login'
            state={{ from: pathname }}
          >
            Login
          </AppLink>

          <AppLink
            to='/account/signup'
            state={{ from: pathname }}
          >
            Sign Up
          </AppLink>
        </>
      )}
    </div>
  );
};
