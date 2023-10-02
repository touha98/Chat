import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useUserStore } from '@/store/userStore';
import { Link, Navigate } from 'react-router-dom';
import { Icons } from './icons';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const UserButton = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: logOut, isLoading } = useMutation(
    ['logout'],
    async () => await axios.post('/api/v1/users/logout'),
    {
      onSuccess: () => setUser(null),
    },
  );

  if (!user) return <Navigate to={'/auth/login'}></Navigate>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative">
          {user.username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/account">
              <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/">
              <Icons.terminal className="mr-2 h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={() => logOut()}>
          <p>
            <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
            {isLoading ? 'Sigining out...' : 'Sign out'}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};