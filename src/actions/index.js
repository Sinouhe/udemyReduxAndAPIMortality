import axios from 'axios';

export const GET_COUNTRY = 'GET_COUNTRY';
export const ERROR_GET_COUNTRIES = 'ERROR_GET_COUNTRIES';

export const GET_MORTALITY = 'GET_MORTALITY';

const API_END_POINT = 'http://api.population.io:80/1.0/';
const DEFAULT_PARAM = '25/today/'

export function getCountries() {
    return (dispatch) => {
        axios(API_END_POINT+'countries')
            .then((res) => {
                console.log(res)
                dispatch({
                    type: GET_COUNTRY,
                    payload: res.data.countries
                });
            }).catch((err) => {
                dispatch({
                    type: ERROR_GET_COUNTRIES,
                    error: err.data.detail
                });
            });
    }
}

export function getMortality(country) {
    return (dispatch) => {
        axios(`${API_END_POINT}mortality-distribution/${country}/male/${DEFAULT_PARAM}`)
            .then((resMale) => {
                axios(`${API_END_POINT}mortality-distribution/${country}/female/${DEFAULT_PARAM}`)
                    .then((resFemale) => {
                        // console.log(resMale);
                        // console.log(resFemale);
                        dispatch({
                            type: GET_MORTALITY,
                            payload: {
                                country: country,
                                male: resMale.data.mortality_distribution,
                                female: resFemale.data.mortality_distribution
                                }
                        });
                    }).catch((err) => {
                        console.log('error female mortality distribution ' + err.message);
                    });         
            }).catch((err) => {
                console.log('error male mortality distribution ' + err.message);
            });
        }
}