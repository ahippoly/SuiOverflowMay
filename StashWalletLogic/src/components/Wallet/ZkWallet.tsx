import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import { useZkLogin } from '@/hooks/useZkLogin';

import OauthProviderIcon from '../General/OauthProviderIcon';
function ZkWallet({
  zkAccount,
}: {
  zkAccount: ZkLoginFullAccount;
  isSelectable?: boolean;
}) {
  const zkLogin = useZkLogin();
  const isSelected = zkLogin.selectedZkAccount?.address === zkAccount.address;

  return (
    <Card
      sx={{
        outline: isSelected ? '2px solid #000' : 'none',
      }}
    >
      <CardContent>
        <Stack direction='row' spacing={2} alignItems='center'>
          <OauthProviderIcon issuer={zkAccount.issuer} />
          <Stack>
            <Typography>{zkAccount.address}</Typography>
            <Typography>{zkAccount.email}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={() => zkLogin.setSelectedZkAccount(zkAccount)}>
          Select
        </Button>
      </CardActions>
    </Card>
  );
}

export default ZkWallet;
