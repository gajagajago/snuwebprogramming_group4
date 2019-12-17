import React from 'react';
import {
  Spinner,
  Button,
  Input,
} from 'reactstrap';
import './css/Selfie.css';

import firestoreHandler from '../firestoreHandler';

const Selfie = ({date, host, mine}) => {
  const [selfieData, setSelfieData] = React.useState();
  const [uploading, setUploading] = React.useState(false);
  const [show, setShow] = React.useState();
  const fetchSelfieData = async () => {
    const data = await firestoreHandler.getSelfieByDate(host, date);
    if (data) {
      setSelfieData(data[0]);
    }
  };
  const handleChange = async (e) => {
    setUploading(true);
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    const url = 'https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/vision/face';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
      body: formData,
    });
    const data = await response.json();
    let face;
    if (data.info.faceCount === 1) {
      face = data.faces[0];
    } else {
      face = null;
    }
    await firestoreHandler.addSelfie(host, date, file, face);
    await fetchSelfieData();
    setUploading(false);
  }
  const deleteSelfie = async () => {
    await firestoreHandler.deleteSelfie(host, selfieData.imageName, selfieData.id);
    setSelfieData();
  }
  React.useEffect(() => {
    fetchSelfieData();
  }, []);
  React.useEffect(() => {
    if (mine) {
      if (selfieData) {
        setShow('editableSelfiePage');
      } else {
        setShow('addButtonPage');
      }
    } else {
      if (selfieData) {
        setShow('uneditableSelfiePage');
      } else {
        setShow('noDataPage')
      }
    }
  }, [mine, selfieData]);
  return (
    <div className="h-100 d-flex">
      <Input id="selfie-input" type="file" onChange={handleChange} />
      {
        show === 'editableSelfiePage' &&
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <img id="selfie-image" src={selfieData ? selfieData.imageUrl : ''} alt="selfie" />
          <span className="h4 my-2">{selfieData && selfieData.face ? selfieData.face.emotion.value : '얼굴 인식 불가'}</span>
          <Button color="red" onClick={deleteSelfie}>삭제</Button>
        </div>
      }
      {
        show === 'addButtonPage' &&
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <label htmlFor="selfie-input">
            <div id="selfie-add-button" className="bg-blueGrey text-light rounded px-3 py-1">
              {
                uploading &&
                <Spinner size="sm" color="light" />
              }
              {
                !uploading &&
                '추가하기'
              }
            </div>
          </label>
        </div>
      }
      {
        show === 'uneditableSelfiePage' &&
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <img id="selfie-image" src={selfieData ? selfieData.imageUrl : ''} alt="selfie" />
          <span className="h4 mb-3">{selfieData && selfieData.face ? selfieData.face.emotion.value : '얼굴 인식 불가'}</span>
        </div>
      }
      {
        show === 'noDataPage' &&
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <span className="h4">등록된 Selfie가 없습니다.</span>
        </div>
      }
    </div>
  )
}

export default Selfie;