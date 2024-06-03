import { Avatar, AvatarGroup } from '@mui/material';

function CircledIcon({ children }: { children: React.ReactNode }) {
  return (
    <AvatarGroup>
      <Avatar
        sx={{
          width: '1.2em',
          height: '1.2em',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Avatar>
    </AvatarGroup>
  );
}

export default CircledIcon;
