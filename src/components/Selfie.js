import React from 'react';
import {
  Button,
  Input,
} from 'reactstrap';
import './css/Selfie.css';

const Selfie = ({date, host, mine}) => {
  const [adding, setAdding] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState();
  const handleChange = (e) => {
    setUploadedFile(e.target.files[0]);
  }
  const cancelAdding = () => {
    setAdding(false);
    setUploadedFile();
  }
  const confirmAdding = () => {
    console.log(uploadedFile);
  }
  return (
    <div className="h-100 d-flex">
      {
        mine && !adding &&
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <Button color="blueGrey" onClick={() => setAdding(true)}>추가하기</Button>
        </div>
      }
      {
        mine && adding &&
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
              <Button color="blueGrey" onClick={confirmAdding}>확인</Button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Selfie;