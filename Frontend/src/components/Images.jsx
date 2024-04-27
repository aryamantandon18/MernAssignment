import React, { Fragment, useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getImages } from '@/actions/userActions';
import '../styles/images.css'

const Images = () => {
  const navigate = useNavigate();
  const {user,isAuthenticated} = useSelector(state => state.user);
  const {images,error} = useSelector(state=>state.getUserImages);
  const dispatch = useDispatch();

  const handleDeleteImage = async (id, link) => {

  };

  const handleShareGmail = (link) => {
    const emailSubject = 'Check out this image';
    const emailBody = `I wanted to share this image with you: ${link}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailLink;
  };

  const handleShareWhatsApp = (link) => {
    const whatsappMessage = `Check out this image: ${link}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.location.href = whatsappLink;
  };

  useEffect(()=>{
    dispatch(getImages());
 if(!isAuthenticated || !user){
    toast.error("Login First");
    navigate('/login');
 }
 console.log(user);
 console.log(user.images)
  },[isAuthenticated,user,images])

    const columns=[
        {field:"id", headerName:"Image ID", minWidth:100,flex:0.1},
        {
            field: "image",
            headerName: "Image",
            minWidth: 350,
            flex: 0.2,
            renderCell: (params) => (
              <img src={params.row.link} alt={`Image ${params.row.id}`} style={{ width: '100%', height: '100%' }} />
            ),
          },
          {
            field: "link",
            headerName: "Link",
            type: "number",
            minWidth: 150,
            flex: 0.3,
          },
          {
            field: "share",
            headerName: "Share",
            type: "number",
            minWidth: 270,
            flex: 0.3,
            renderCell: (params) => {
              return (
                <Fragment>
            <Button onClick={() => handleShareGmail(params.row.link)}>
              <AttachEmailIcon />
            </Button>
            <Button onClick={() => handleShareWhatsApp(params.row.link)}>
              <WhatsAppIcon/>
            </Button>
          </Fragment>
              );
            },
          },
          {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable:false,
            renderCell: (params) => {
                return (
                  <Fragment>
                  <Button onClick={() => handleDeleteImage(params.row.id, params.row.link)}>
                  <DeleteIcon />
                </Button>
                 </Fragment>
                );
              },
          }
    ]
    const rows = [];
    
    if(Array.isArray(user && images)){
       images.map((image,index)=>{
        rows.push({
            id:index + 1,
            image:image.url,
            link:image.url,
            name:image.title,
        })
       }) }


    return (
            <Fragment>
            <div className='imageListContainer pt-[80px]'>
                <h1 id='imageListHeading'>ALL IMAGES</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            disableSelectionOnCLick
            autoHeight
            className='imageListTable'
            rowHeight={150}
            />
            </div>

        </Fragment>
    )
}

export default Images
