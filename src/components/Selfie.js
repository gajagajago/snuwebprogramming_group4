import React from 'react';
import {
  Spinner,
  Button,
  Input,
} from 'reactstrap';
import './css/Selfie.css';

import firestoreHandler from '../firestoreHandler';

const Selfie = ({date, host, mine}) => {
  const [adding, setAdding] = React.useState(false);
  const [selfieData, setSelfieData] = React.useState();
  const [uploadedFile, setUploadedFile] = React.useState();
  const [uploading, setUploading] = React.useState(false);
  const [show, setShow] = React.useState();
  const fetchSelfieData = async () => {
    const data = await firestoreHandler.getSelfieByDate(host, date);
    if (data) {
      setSelfieData(data[0]);
    }
  };
  const handleChange = (e) => {
    setUploadedFile(e.target.files[0]);
  }
  const cancelAdding = () => {
    setAdding(false);
    setUploadedFile();
  }
  const confirmAdding = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', uploadedFile);
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
    await firestoreHandler.addSelfie(host, date, uploadedFile, face);
    setAdding(false);
    await fetchSelfieData();
    setUploading(false);
    setUploadedFile();
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
      if (adding) {
        setShow('addingPage');
      } else {
        if (selfieData) {
          setShow('showSelfiePage');
        } else {
          setShow('addButtonPage');
        }
      }
    }
  }, [mine, adding, selfieData]);
  return (
    <div className="h-100 d-flex">
      {
        show === 'showSelfiePage' &&
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <img src={selfieData ? selfieData.imageUrl : ''} alt="selfie" />
          <span className="h4 mb-3">{selfieData && selfieData.face ? selfieData.face.emotion.value : '얼굴 인식 불가'}</span>
          <Button color="red" onClick={deleteSelfie}>삭제</Button>
        </div>
      }
      {
        show === 'addButtonPage' &&
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <Button color="blueGrey" onClick={() => setAdding(true)}>추가하기</Button>
        </div>
      }
      {
        show === 'addingPage' &&
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <Input type="file" onChange={(e) => handleChange(e)}></Input>
          {
            uploadedFile &&
            <img id="preview-image" src={URL.createObjectURL(uploadedFile)} alt="preview" />
          }
          {
            uploadedFile &&
            <div className="d-flex mt-1">
              <Button className="mr-1" color="dark" onClick={cancelAdding}>취소</Button>
              <Button color="blueGrey" onClick={confirmAdding}>
                {
                  uploading &&
                  <Spinner size="sm" color="light" />
                }
                {
                  !uploading &&
                  '확인'
                }
              </Button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Selfie;