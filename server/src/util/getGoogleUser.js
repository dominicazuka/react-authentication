import axios from 'axios'
import {oauthClient} from './oauthClient'

const getAccessAndBearerTokenUrl = ({accessToken}) =>{
    return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
}

export const getGoogleUser = async (code) => {
    const {tokens} = await oauthClient.getToken(code);
    const url = getAccessAndBearerTokenUrl({accessToken:tokens.access_token});
    const response = await axios.get(url, {headers: {Authorization: `Bearer ${tokens.id_token}`}})
    return response.data
} 