import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {

  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setimageFile] = useState(null);
  const [imagefileurl, setimagefileurl] = useState(null);
  const filePickerRef = useRef();
  const [imagefileuploadingprogress, setimagefileuploadingprogress] = useState(null);
  const [imagefileuploaderror, setimagefileuploaderror] = useState(null);


  const handleimageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setimageFile(file);
      setimagefileurl(URL.createObjectURL(file))
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {

    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimagefileuploadingprogress(progress.toFixed(0));
      },
      (error) => {
        setimagefileuploaderror('size exceeded... less then 5 mb');
        setimagefileuploadingprogress(null);
        setimageFile(null);
        setimagefileurl(null);
      },
      
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if(!imagefileuploaderror){
            setimagefileurl(downloadURL);
          }
        }

        )
      }
    )
  }

  console.log(imagefileuploadingprogress);

  return (
    <div className='max-w-lg mx-auto p-3 w-full' >
      <h1 className='my-7 text-center font-semibold text-3xl' > Profile </h1>

      <form className='flex flex-col gap-4 ' >
        <input type='file' accept='image/*' onChange={handleimageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' >

          {
            imagefileuploadingprogress > 0 && imagefileuploadingprogress < 100 && (
              <CircularProgressbar value={imagefileuploadingprogress || 0} text={`${imagefileuploadingprogress}%`} strokeWidth={5} styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imagefileuploadingprogress / 100})`,
                }
              }} />
            )
          }


          <img
            src={imagefileurl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full self-center w-full h-full border-8 border-[lightgrey] ${imagefileuploadingprogress && imagefileuploadingprogress < 100 && 'opacity-60'} `}
            onClick={() => filePickerRef.current.click()}
          />
        </div>


        {imagefileuploaderror && <Alert color='failure' > {imagefileuploaderror} </Alert>}

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />

        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />

        <TextInput
          type='password'
          id='password'
          placeholder='password'
        />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline >
          Update
        </Button>

      </form>
      <div className='text-red-500 flex justify-between mt-5 ' >
        <span className='cursor-pointer' >Delete Account</span>
        <span className='cursor-pointer' >Sign out</span>
      </div>
    </div>
  )
}

export default DashProfile;