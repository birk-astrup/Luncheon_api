import Auth0 from 'react-native-auth0';
import dotenv from 'dotenv';

dotenv.config();

const cridentials = {
  clientId: process.env.CLIENT_ID,
  domain: process.env.AUTH0_CLIENT_ID,
};

export default new Auth0(cridentials);
