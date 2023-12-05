import { Button, Paper, TextField } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import Loader from '../../Component/Loader/Loader'
import { toast } from "react-toastify";
import useAxios from "../../api/useAxios";
import { AwesomeButton } from "react-awesome-button";
import { AddIcCallOutlined } from "@mui/icons-material";
import { FileAddedIcon } from "@primer/octicons-react";


const AddTags = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxios()


    if(loading){
        return <Loader></Loader>
    }

    const handleAddTags=async(e)=>{
        e.preventDefault()
        const form = e.target;
        const created_by=user?.displayName
        const tag_title= form.tag.value 
        const tagData = {
            created_by,tag_title
        }

        try{
            const {data} = await axiosSecure.post('/tags',tagData)
            console.log(data)
            
            if(data?._id){
                toast.success('Tag added successfully',{
                    position:'top-center',
                    autoClose:2000
                })
                form.reset()
            }
        }
        catch(error){
            toast.error(error.message,{
                position:'top-center',
                autoClose:2000
            })
        }
        

    }
    return (
        <div>
            <Paper elevation={12} sx={{bgcolor:'primary.lighter',p:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <form onSubmit={handleAddTags} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <TextField name="tag" id="outlined-basic" label="Enter A Tag" variant="outlined" />
                <AwesomeButton after={<FileAddedIcon />} type="submit"  style={{marginTop:'8px',width:'100%',color:'white',bgcolor:'#CCF8E7'}}>
                 ADD
                 </AwesomeButton>
                </form>
            </Paper>
        </div>
    );
};

export default AddTags;