import React, {createContext, useState, useEffect} from 'react';
export const APIContext = createContext();

import {
  this_ENV_STG,
  this_ENV_PRD,
  this_ENV_TST,
  this_ENV_PREPROD,
  API_CONST_STG,
  API_CONST_PRD,
  API_CONST_TST,
  API_CONST_PREPROD,
  this_ENV_SIT,
  this_ENV_PT,
  API_CONST_PT,
  API_CONST_SIT
} from '../util/config';

const APIContextProvider = props => {
  const [intoStagingCode, setIntoStagingCode] = useState(false);
  const [intoTestingCode, setIntoTestingCode] = useState(false);
  const [intoPreProdCode, setIntoPreProdCode] = useState(false);
  const [intoSITCode, setIntoSITCode] = useState(false);
  const [intoPTCode, setIntoPTCode] = useState(false);
  

  const [CURRENT_ENV, SET_CURRENT_ENV] = useState();
  const [SESSION_TOKEN, SET_SESSION_TOKEN] = useState(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiN2Q0ZjYzMTA3Y2RjY2EzOWFhOWYwYTY2YmUzYzA4NTU4MGY3MTkxMDU0ZmYyMDM2ODU0M2ZmYzI1YzRmYjFlNDJkZTY3OTA4MjYxMjQ3MzUiLCJpYXQiOjE1ODQ2MDg1NTMsIm5iZiI6MTU4NDYwODU1MywiZXhwIjoxNTg0Njk0OTUzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Lm2wifxAEfkgcFTW6x8Pm0nWl8cWDCZwj8IzObGi6czQDnaUjj3eFQKqxfIduCISMQmpSTxC2A6v_OlwGnLdKDCBQYu3C-TJhuFbvvDk-7Pj8ai2JyXt5nVqn3vi61KCg7d95D_3k3Gko_O1a0b7_S1KBbtvBeRfTF2tjDo-u6GYT8s8VS0K4eX3OBnvNfwykG874FnUFQOwbIPacJqHo4QLoweVpxEjVo9PXtr8cNzgyZIV2XekWj46zcxxM8RDfzBVNYtNd9HfRRcfB0Be0KQKtO6rf6BZfrKyrMznuhx0CGxQY6K5FNbXdsocb7RzsT4x1SbzCsAjzwjQ1DvYrcqu6ySJbFg0uyRKTRcYbJUkleusA8tuX7yH811J2r6wENq69ZFixCH8FrAtMWTIBEALiJGm4BXZD7NpFG1R7lp3k6pWoEpesKYUln4k2z0KbDg9rgBIRZQ1ziwlprdZFVqjPCLrFYmGRa65_5rRzIos5W5ijhBv9CjbKUAPjtfS9OUKu8pZYe22uBzAguUl9CWU5pHNIFFGUgQ-14lgn0a-FqkAsCyp1a99_yhMYImDR7hC9pwLhJWo-wDZODUYXrg_SQYxzk5AlUgi_s22IJWrUixpqBGan9q22mRncVCyeSNFa21-2cIjo3evZTMOid2OidEm3rq2zGC8MjD569Q',
  );
  const [refreshToken, set_refreshToken] = useState();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (this_ENV_PRD && API_CONST_PRD) {
      SET_CURRENT_ENV({
        env: this_ENV_PRD,
        api_const_env: API_CONST_PRD,
        headerColor: '#e3e1e1',
        barStyle: 'dark-content',
      });
    }
  }, []);

  useEffect(() => {
    if (intoStagingCode == true) {
      //start setting all default productionEnv into staging Env
      SET_CURRENT_ENV({
        env: this_ENV_STG,
        api_const_env: API_CONST_STG,
        headerColor: '#59ffdb',
        barStyle: 'light-content',
        // username: 'U2000058',
        // pwd: 'bhv4211@IN',
      });
    } else {
      SET_CURRENT_ENV({
        env: this_ENV_PRD,
        api_const_env: API_CONST_PRD,
        headerColor: '#e3e1e1',
        barStyle: 'dark-content',
      });
    }
  }, [intoStagingCode]);

  useEffect(() => {
    if (intoTestingCode == true) {
      SET_CURRENT_ENV({
        env: this_ENV_TST,
        api_const_env: API_CONST_TST,
        headerColor: '#9c0000',
        barStyle: 'light-content',
      });
    } else {
      SET_CURRENT_ENV({
        env: this_ENV_PRD,
        api_const_env: API_CONST_PRD,
        headerColor: '#e3e1e1',
        barStyle: 'dark-content',
      });
    }
  }, [intoTestingCode]);

  useEffect(() => {
    if (intoPreProdCode == true) {
      SET_CURRENT_ENV({
        env: this_ENV_PREPROD,
        api_const_env: API_CONST_PREPROD,
        headerColor: '#6a1ad9',
        barStyle: 'light-content',
      });
    } else {
      SET_CURRENT_ENV({
        env: this_ENV_PRD,
        api_const_env: API_CONST_PRD,
        headerColor: '#e3e1e1',
        barStyle: 'dark-content',
      });
    }
  }, [intoPreProdCode]);

  useEffect(() => {
    if (intoSITCode == true) {
      SET_CURRENT_ENV({
        env: this_ENV_SIT,
        api_const_env: API_CONST_SIT,
        headerColor: '#fff480',
        barStyle: 'dark-content',
      });
    } else {
      SET_CURRENT_ENV({
        env: this_ENV_PRD,
        api_const_env: API_CONST_PRD,
        headerColor: '#e3e1e1',
        barStyle: 'dark-content',
      });
    }
  }, [intoSITCode]);

  useEffect(() => {
    if (intoPTCode == true) {
      SET_CURRENT_ENV({
        env: this_ENV_PT,
        api_const_env: API_CONST_PT,
        headerColor: '#630120',
        barStyle: 'light-content',
      });
    } else {
      SET_CURRENT_ENV({
        env: this_ENV_PRD,
        api_const_env: API_CONST_PRD,
        headerColor: '#e3e1e1',
        barStyle: 'dark-content',
      });
    }
  }, [intoPTCode]);

  return (
    <APIContext.Provider
      value={[
        CURRENT_ENV,
        SESSION_TOKEN,
        setIntoStagingCode,
        setIntoTestingCode,
        SET_SESSION_TOKEN,
        profile,
        setProfile,
        refreshToken,
        set_refreshToken,
        setIntoPreProdCode,
        intoSITCode, 
        setIntoSITCode,
        intoPTCode,
        setIntoPTCode
      ]}>
      {props.children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
