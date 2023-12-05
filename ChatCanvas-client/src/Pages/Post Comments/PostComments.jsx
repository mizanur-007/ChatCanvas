import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Component/Loader/Loader";
import { Box, Button, IconButton, Modal, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Select from 'react-select';
import  { useState } from "react";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import useAxios from "../../api/useAxios";
import * as React from 'react';
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const PostComments = () => {
  const axiosSecure = useAxios()
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (index) => setOpen(index);
  const handleClose = () => setOpen(false);
  const perPage = 10;
  const {id} = useParams()



  const {data:counts,isLoading:countLoading} = useQuery({
    queryKey:['totalpost'],
    queryFn:async()=>{
        const {data} = await axiosSecure(`/totalcommentpost/${id}`)
        return data
    }
})

    
    const options = [
        {
            value:'Misinformation ' ,
            label:'Misinformation '
        },
        {
            value:'Offensive  ' ,
            label:'Offensive  '
        },
        {
            value:'Threat ' ,
            label:'Threat '
        }
    ]




    const {data:comments=[],isLoading}= useQuery({
        queryKey:['comments',id,currentPage],
        queryFn: async()=>{
            const {data} = await axiosSecure(`/comments/${id}?currentpage=${currentPage}&size=${perPage}`)
            return data
        }
    })

    const [selectedOptions, setSelectedOptions] = useState(
        comments.map(() => null) // Initialize selectedOptions array based on the number of comments
    );

    const handleOptionChange = (index, selectedValue) => {
        setSelectedOptions(prevSelectedOptions => {
            const updatedOptions = [...prevSelectedOptions];
            updatedOptions[index] = selectedValue;
            return updatedOptions;
        });
    };

    if(isLoading||countLoading){
        return <Loader></Loader>
    }

    const count =  counts?.comments
    const numberOfPage = Math.ceil(count/perPage)


    const handleReport =async (index,commentor, comment, feedbackdata,postTitle)=>{
      const feedback= feedbackdata.value
      const report = {
        commentor,postTitle,comment,feedback
      }

      const {data} = await axiosSecure.post('/reportedcomments',report)
      if(data._id){
        toast.success("Reported comment",{
          position:'top-center',
          autoClose:2000
        })
      }

      setSelectedOptions(prevSelectedOptions => {
        const updatedOptions = [...prevSelectedOptions];
        updatedOptions[index] = null; 
        return updatedOptions;
      });

    }

    const handlePage = (e, page) => {
      setCurrentPage(page);
    };

   
    return (
        <div>
                        <Box sx={{minHeight:'75vh'}}>
            <TableContainer component={Paper} sx={{bgcolor:'primary.lighter'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  >
          <TableRow>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Commentor</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Comment</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Feedback</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Report</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          
{
    comments?.map((comment,index)=>             <TableRow key={comment?._id}>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
          {comment?.commentor}
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
          {comment?.comment?.length <21 ? comment?.comment : <>{comment?.comment.slice(0,20)}...<Button sx={{ml:-1,color:'blue'}}  onClick={()=>handleOpen(index)}>Read More</Button></>}
        </TableCell>

        <Modal
        open={open=== index}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {comment?.comment}
          </Typography>
        </Box>
      </Modal>

        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
        <Select
      className="select"
        value={selectedOptions[index]}
        onChange={(value) => handleOptionChange(index, value)}
        options={options}
      />
        
        </TableCell>
        <TableCell  sx={{fontSize:'16px'}} component="th" scope="row">
        <IconButton onClick={()=>handleReport(index,comment?.commentor,comment?.comment,selectedOptions[index],comment?.post_title )} disabled={selectedOptions[index] === null} aria-label="downvote">
          <ReportGmailerrorredOutlinedIcon />
        </IconButton>
        </TableCell>
      </TableRow>)
}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>

            <Pagination
        sx={{ display: "flex", justifyContent: "center",mt:5 }}
        onChange={handlePage}
        page={currentPage}
        count={numberOfPage}
        variant="outlined"
        shape="rounded"
      />
            
        </div>
    );
};

export default PostComments;