import { clearErrors, uploadImage } from '@/actions/userActions';
import { IMAGE_RESET } from '@/constants/userConstants';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [image,setImage] = useState('');
  const { isAuthenticated } = useSelector(state => state.user);
  const {isUploaded,user,error:ImageError,loading:imageLoading } = useSelector(state => state.ImageReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
   if(ImageError){
    toast.error(ImageError);
    dispatch(clearErrors());
   } 
   if(isUploaded){
    toast.success("Image Uploaded Successfully");
    dispatch({type:IMAGE_RESET});
   }
  }, [isAuthenticated, navigate,isUploaded,ImageError]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     const myForm = new FormData();
     myForm.set("title",title);
     myForm.set("image",image);
     console.log(title,image);
    dispatch(uploadImage(myForm));
  };

  const handleImageChange =(e)=>{
    // const file = e.target.files[0];
    // setImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload=()=>{
        if(reader.readyState=== 2){
            setImage(reader.result);
        }
    };
    reader.readAsDataURL(e.target.files[0]);
  } 
  
  return (
    <div className="relative min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover items-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            File Upload!
          </h2>
          <p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <label htmlFor="title" className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
            <input
              id="title"
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col justify-center items-center">
                  <img
                    className="h-36 object-center"
                    src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                    alt="Upload image"
                  />
                  <p className="pointer-none text-gray-500">
                    <span className="text-sm">Drag and drop</span> files here
                    <br /> or <a href="/" className="text-blue-600 hover:underline">select a file</a> from your computer
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleImageChange}/>
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: doc, pdf, types of images</span>
          </p>
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
