import { Button } from "@mui/material";

import { useZkLogin } from "@/hooks/useZkLogin";

import { OauthTypes } from "@/enums/OauthTypes.enum";


function ExecuteTransaction() {
  const zkLogin = useZkLogin();
  return ( 
      <Button
        onClick={async () => {
          await zkLogin.signTransaction(OauthTypes.google);
        }}
      variant="contained" color="primary">
        Execute Transaction
      </Button>

   );
}

export default ExecuteTransaction;