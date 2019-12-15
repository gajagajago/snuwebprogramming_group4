import React from 'react';

const Diary = () => {

  const fs = require('fs');
  const request = require('request');
    
  const clientId = 'c5cgt7y1jj';
  const clientSecret = '4giwRMopxVDhA3Rv3Bnayizkd7vs8JDNnfLpMWQO';
    
  // language => 언어 코드 ( Kor, Jpn, Eng, Chn )
  function stt(language, filePath) {
    const url = `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=${language}`;
    const requestConfig = {
      url: url,
      method: 'POST',
      headers: {
          'Content-Type': 'application/octet-stream',
          'X-NCP-APIGW-API-KEY-ID': clientId,
          'X-NCP-APIGW-API-KEY': clientSecret
      },
      body: fs.createReadStream(filePath)
  };
 
  request(requestConfig, (err, response, body) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(response.statusCode);
    console.log(body);
  });
  }
    
  stt('Kor', './hello.wav');
    
  return (
    <div>
      외않되?              
    </div>
  )
}

export default Diary;