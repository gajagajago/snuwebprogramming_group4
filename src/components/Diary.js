import React from 'react';
import { Spinner, Button } from 'reactstrap';
import RecordRTC from 'recordrtc';

const Diary = () => {
  const [recorder, setRecorder] = React.useState();
  const [text, setText] = React.useState();
  const [spinner, setSpinner] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const stt = async (blob) => {
    const clientId = 'c5cgt7y1jj';
    const clientSecret = '4giwRMopxVDhA3Rv3Bnayizkd7vs8JDNnfLpMWQO';
    const url = `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret
      },
      body: blob,
    });
    const data = await response.json();
    setText(data.text);
  }
  const startRecord = () => {
    const success = async (stream) => {
      const tempRecorder = RecordRTC(stream, {
        type: 'video'
      });
      setSpinner(true);
      setStatus('recording your diary');
      tempRecorder.startRecording();
      setRecorder(tempRecorder);
    }
    const error = (error) => {
      console.log(error);
    }
    navigator.getUserMedia({ audio: true }, success, error);
  }
  const stopRecord = () => {
    recorder.stopRecording(async () => {
      let blob = recorder.getBlob();
      setStatus('saving your diary');
      await stt(blob);
      setStatus('');
      setSpinner(false);
    });
  }
  return (
    <div>
      <Button color="dark" onClick={startRecord}>다이어리 작성</Button>
      <Button color="dark" onClick={stopRecord}>작성 완료</Button>
      {
        spinner &&
        <div>
          <div>{status}</div>
          <Spinner />
        </div>
      }
      { !spinner &&
        <div>{text}</div>
      }
    </div>
  )
}

export default Diary;