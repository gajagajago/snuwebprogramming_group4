import React from 'react';
import { Spinner, Button } from 'reactstrap';
import RecordRTC from 'recordrtc';

import './css/Diary.css';
import firestoreHandler from '../firestoreHandler';

const Diary = ({ host, date, mine}) => {
  const [recorder, setRecorder] = React.useState();
  const [diaryData, setDiaryData] = React.useState();
  const [text, setText] = React.useState();
  const [spinner, setSpinner] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const fetchDiaryData = async () => {
    const data = await firestoreHandler.getDiaryByDate(host, date);
    if (data) {
      setDiaryData(data);
      setText(data[0].content);
    }
  };
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
  // save 
  const addDiary = async () => {
    if (diaryData) {
      await firestoreHandler.deleteDiary(diaryData[0].id);
    }
    await firestoreHandler.addDiary(host, date, text)
    await fetchDiaryData();
    alert('저장되었습니다');
  }

  React.useEffect(() => {
    fetchDiaryData();
  }, [])
  
  return (
    <div className="d-flex w-100 h-100 flex-column px-3 py-3">
      {
        spinner &&
        <div>
          <div>{status}</div>
          <Spinner />
        </div>
      }
      { !spinner &&
        <textarea type="text/javasript" className="w-100" id="diary" onChange={(e) => { setText(e.target.value) }} value={text}></textarea>
      }
      <div className="d-flex justify-content-end mt-2">
        <Button color="blue" onClick={startRecord} className="mr-1">Start Recording</Button>
        <Button color="blue" onClick={stopRecord} className="mr-1">Stop Recording</Button>
        <Button color="brown" onClick={addDiary} >Save</Button>
      </div>
    </div>
  )
}

export default Diary;