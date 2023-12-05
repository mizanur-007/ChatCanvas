import { useQuery } from "@tanstack/react-query";
import Loader from "../../Component/Loader/Loader";
import { Box, Button, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxios from "../../api/useAxios";
import { Helmet } from "react-helmet-async";


const ManageUsers = () => {
    const [searchText, setSearchText] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxios()


    const perPage = 10;


    const {data:userData={},isLoading,refetch}=useQuery({
        queryKey:['users',searchText],
        queryFn:async()=>{
            const {data}=await axiosSecure(`/users?username=${searchText}&currentpage=${currentPage}&size=${perPage}`)
            return data
        }
    })

    if(isLoading){
        return <Loader></Loader>
    }

    const handlePage = (e, page) => {
        setCurrentPage(page);
      };
    const {result,count} = userData
   
    const users = result || []
    const numberOfPage = Math.ceil(count/perPage)

    const handleMakeAdmin=async(id)=>{
        const update = {
            role:'admin'
        }

        Swal.fire({
          title: "Are you sure?",
          text: `Make user a admin `,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Continue"
        }).then(async(result) => {
          if (result.isConfirmed) {
            const {data} = await axiosSecure.patch(`/updateuser/${id}`,update)
            refetch()
            if(data?.acknowledged){
              toast.success(`User role updated`)
            }
          }
        });

        
      
    }

    const handleSearch=(e)=>{
        e.preventDefault()
        const username = e.target.name.value
        setSearchText(username)

    }

    return (
        <div>
                <Helmet>
      <title>Manage Users</title>
    </Helmet>
            <Box>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>
                    Find a user by user name
                </Typography>
<form onSubmit={handleSearch} style={{display:'flex',marginTop:'8px',marginBottom:'26px'}}>
<TextField id="outlined-basic" label="User Name" name="name" variant="outlined" />
<Button type="submit" variant="contained">Search</Button>
</form>
            </Box>
                        <Box sx={{minHeight:'50vh'}}>
            <TableContainer component={Paper} sx={{bgcolor:'primary.lighter'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  >
          <TableRow>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>User Name</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>User Email</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Membership</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Make Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
{
    users?.map(user=>             <TableRow key={user?._id}>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
          {user?.userName}
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
            {user?.email}
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
            {user?.status}
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
        <Tooltip title="Make Admin">
  <IconButton disabled={user?.role =='admin'} onClick={()=>handleMakeAdmin(user?._id)}>
    <AdminPanelSettingsIcon  sx={{color:user?.role =='admin' ?'grey':'blue'}}/>
  </IconButton>
</Tooltip>
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

export default ManageUsers;