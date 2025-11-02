import Button from '../../../../components/Button/Button';
import { logout } from '../../redux/operations';
import { useAppDispatch } from '../../../../redux/hooks';
import { useState } from 'react';

export default function Logout() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant='link'
      onClick={onLogout}
      isLoading={isLoading}
    >
      Logout
    </Button>
  );
}
