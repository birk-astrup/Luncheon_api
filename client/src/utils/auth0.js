import Auth0 from 'react-native-auth0';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from 'react-native-dotenv';

const cridentials = {
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN,
};

export default new Auth0(cridentials);
