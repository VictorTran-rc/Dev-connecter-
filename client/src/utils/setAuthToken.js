// Function that will take in the token and if the token is there add it to the headers if not its gonna delete from the header
import axios from 'axios'

// Send every request rather than picking and choosing which one to send
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken