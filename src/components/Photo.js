import React from 'react';
import { Button, Input } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import firestoreHandler from '../firestoreHandler';

import './css/Photo.css';
const Photo = ({ date, host, mine }) => {
  const [photoDatas, setPhotoDatas] = React.useState([]);
  const [show, setShow] = React.useState();

  const fetchPhotoDatas = async () => {
    const data = await firestoreHandler.getPhotosByDate(host, date);
    if (data) {
      console.log(data);
      setPhotoDatas(data);
    } else {
      setPhotoDatas([]);
    }
  }
  const deletePhoto = async (name, docId) => {
    await firestoreHandler.deletePhoto(host, name, docId);
    await fetchPhotoDatas();
  }
  const handleChange = async (e) => {
    for (const file of e.target.files) {
      await firestoreHandler.addPhoto(host, date, file);
    }
    await fetchPhotoDatas();
  }

  React.useEffect(() => {
    if (mine) {
      setShow('myPhotoPage');
    } else {
      if (photoDatas.length !== 0) {
        setShow('friendsPhotoPage');
      } else {
        setShow('noDataPage');
      }
    }
  }, [mine, photoDatas]);

  React.useEffect(() => {
    fetchPhotoDatas();
  }, []);
  
  return (
    <div className="h-100 d-flex px-3 py-3">
      {
        show === 'myPhotoPage' &&
        <div id="photo-area" className="h-100 w-100 d-flex flex-wrap align-content-start">
          <Input id="photo-input" type="file" multiple onChange={handleChange} />
          {
            photoDatas.map((photoData) => {
              const imageStyle= {
                height: '150px',
                width: '150px',
                backgroundImage: `url(${photoData.imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }
              return (
                <div style = { imageStyle } key={photoData.id} className="mx-1 my-1">
                  <div className="hover d-flex justify-content-center align-items-center">
                    <Button color="red" onClick={() => deletePhoto(photoData.imageName, photoData.id)}>삭제</Button>
                  </div>
                </div>
              )
            })
          }
          <label htmlFor="photo-input">
            <div id="add-box" className="border d-flex justify-content-center align-items-center display-4 mx-1 my-1">
              <AddIcon color="primary" />
            </div>
          </label>
        </div>
      }
      {
        show === 'friendsPhotoPage' &&
        <div id="photo-area" className="h-100 w-100 d-flex flex-wrap align-content-start">
          {
            photoDatas.map((photoData) => {
              const imageStyle= {
                height: '150px',
                width: '150px',
                backgroundImage: `url(${photoData.imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }
              return (
                <div style = { imageStyle } key={photoData.id} className="mx-1 my-1">
                </div>
              )
            })
          }
        </div>
      }
      {
        show === 'noDataPage' &&
        <div id="photo-area" className="h-100 w-100 d-flex justify-content-center align-items-center h4">
          등록된 Photo가 없습니다.
        </div>
      }

    </div>
  )
}

export default Photo;