import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '../../../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/selectors';

export default function NotLoggedInRoute() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const location = useLocation();
  const fromPage: string = location.state?.from;
  const fromPageRef = useRef<string | null>(null);
  const isFirstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;

    isFirstRenderRef.current = false;
    fromPageRef.current = fromPage;
  }, [fromPage]);

  useEffect(() => {
    if (isLoggedIn) navigate(fromPageRef.current || '/');
  }, [isLoggedIn, navigate]);

  return <Outlet />;
}
