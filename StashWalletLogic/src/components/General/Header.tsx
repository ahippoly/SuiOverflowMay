import { Stack } from '@mui/material';
import Image from 'next/image';

import logoSuiSafe from '@/assets/logoSuiSafe.png';

function Header() {
  return (
    <Stack justifySelf='flex-start' justifyContent='center' alignItems='center'>
      <Image width={50} height={50} src={logoSuiSafe} alt='' />
    </Stack>
  );
}

export default Header;
