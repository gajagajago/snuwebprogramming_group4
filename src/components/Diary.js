import React from 'react';
import { Button } from 'reactstrap';
import RecordRTC from 'recordrtc';

import './css/Diary.css';
import firestoreHandler from '../firestoreHandler';

const Diary = ({ host, date, mine}) => {
  const [recorder, setRecorder] = React.useState();
  const [diaryData, setDiaryData] = React.useState();
  const [text, setText] = React.useState();
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState();

  const fetchDiaryData = async () => {
    const data = await firestoreHandler.getDiaryByDate(host, date);
    if (data) {
      setDiaryData(data);
      setText(data[0].content);
    } else {
      setDiaryData();
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
      setStatus('녹음중...');
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
      setStatus('음성 해석중...');
      await stt(blob);
      setStatus('');
    });
  }
  
  const addDiary = async () => {
    await firestoreHandler.addDiary(host, date, text)
    await fetchDiaryData();
  }

  const deleteDiary = async () => {
    await firestoreHandler.deleteDiary(diaryData[0].id);
    await fetchDiaryData();
  }

  React.useEffect(() => {
    fetchDiaryData();
  }, [])

  React.useEffect(() => {
    if (mine) {
      if (diaryData) {
        setShow('editableDiaryPage');
      } else {
        setShow('addDiaryPage');
      }
    } else {
      if (diaryData) {
        setShow('uneditableDiaryPage');
      } else {
        setShow('noDataPage')
      }
    }
  }, [mine, diaryData]);
  
  return (
    <div className="d-flex w-100 h-100 flex-column px-3 py-3">
      {
        show === 'editableDiaryPage' && diaryData &&
        <div className="w-100 h-100 d-flex flex-column">
          <div id="diary" className="border px-2 py-2 mb-2">
            {diaryData[0].content}
          </div>
          <div className="d-flex justify-content-center">
            <Button color="red" onClick={deleteDiary}>다시 작성하기</Button>
          </div>
        </div>
      }
      {
        show === 'addDiaryPage' &&
        <div className="d-flex w-100 h-100 flex-column">
          {
            status === '' &&
            <textarea type="text" className="w-100" id="diary" onChange={(e) => { setText(e.target.value) }} value={text}></textarea>
          }
          {
            status !== '' &&
            <div className="w-100 d-flex justify-content-center align-items-center h4" id="status">{status}</div>
          }
          <div className="d-flex justify-content-end mt-2">
            <Button color="blue" onClick={startRecord} className="mr-1">Start Recording</Button>
            <Button color="blue" onClick={stopRecord} className="mr-1">Stop Recording</Button>
            <Button color="brown" onClick={addDiary} >Save</Button>
          </div>
        </div>
      }
      {
        show === 'uneditableDiaryPage' && diaryData &&
        <div className="w-100 h-100 d-flex flex-column">
          <div className="2-100 h-100 border px-2 py-2 mb-2">
            {diaryData[0].content}
          </div>
        </div>
      }
      {
        show === 'noDataPage' &&
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <span className="h4">등록된 Diary가 없습니다.</span>
        </div>
      }
      {/* {
        spinner &&
        <div>
          <div>{status}</div>
          <Spinner />
        </div>
      }
      { !spinner &&
        <textarea type="text" className="w-100" id="diary" onChange={(e) => { setText(e.target.value) }} value={text}></textarea>
      }
      <div className="d-flex justify-content-end mt-2">
        <Button color="blue" onClick={startRecord} className="mr-1">Start Recording</Button>
        <Button color="blue" onClick={stopRecord} className="mr-1">Stop Recording</Button>
        <Button color="brown" onClick={addDiary} >Save</Button>
      </div> */}
    </div>
  )
}

export default Diary;