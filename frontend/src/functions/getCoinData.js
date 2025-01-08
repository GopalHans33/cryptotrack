import axios from 'axios'

export const getCoinData=(id) => {
    const mydata = axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((resp) => {
          return resp.data;
        })
        .catch((error) => {
          console.error('Get Coin Data Error : ', error);
        });
        return mydata;
};