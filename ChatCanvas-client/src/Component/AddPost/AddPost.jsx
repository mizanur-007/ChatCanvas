import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";
import useTags from "../../api/Tags/useTags";
import { useState } from "react";
import Select from "react-select";
import useUserDetails from "../../api/Users/useUserDetails";
import useUserPostCount from "../../api/Posts/useUserPostCount";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxios from "../../api/useAxios";
import { Helmet } from "react-helmet-async";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button"
import { FileAddedIcon } from "@primer/octicons-react";

const AddPost = () => {
  const { user, loading } = useAuth();
  const { tags, isLoading } = useTags();
  const [selectedOption, setSelectedOption] = useState(null);
  const { userDetailsData, userLoading } = useUserDetails();
  const { count, countLoading } = useUserPostCount();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  if (loading || isLoading || userLoading || countLoading) {
    return <Loader></Loader>;
  }

  const options = [];

  tags.map((item) => {
    options.push({ value: item.tag_title, label: item.tag_title });
  });

  const handleAdd = async (e) => {
    e.preventDefault();

    if (userDetailsData?.permission == "banned") {
      toast.error("You are not allowed for violating rules", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    } else {
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const photoURL = form.photoURL.value;
      const postTitle = form.postTitle.value;
      const postDescription = form.postDescription.value;
      const upVote = parseInt(form.upVote.value);
      const downVote = parseInt(form.downVote.value);
      const tag = selectedOption.value;

      const postData = {
        name,
        email,
        photoURL,
        postTitle,
        postDescription,
        upVote,
        downVote,
        tag,
        access: "public",
      };

      const data = await axiosSecure.post("/posts", postData);
      if (data?.data?._id) {
        toast.success("Added Post Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/dashboard/userposts");
      } else {
        toast.error("Problem Occuerd. Try again Late", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Post</title>
      </Helmet>
      <div style={{ marginTop: "40px" }}>
        <Container maxWidth="md">
          <Paper sx={{ textAlign: "center" }} elevation={8}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              color={"primary.main"}
              pt={4}
            >
              Add A Post
            </Typography>

            <form onSubmit={handleAdd}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:{lg:'row',sm:'row',xs:'column'},
                  mt: 2,
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <TextField
                  label="Your Name"
                  name="name"
                  required
                  defaultValue={user?.displayName}
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Your Email"
                  name="email"
                  required
                  defaultValue={user?.email}
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:{lg:'row',sm:'row',xs:'column'},
                  mt: 2,
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <TextField
                  label="PhotoURL"
                  name="photoURL"
                  required
                  defaultValue={user?.photoURL}
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Title"
                  required
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  name="postTitle"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:{lg:'row',sm:'row',xs:'column'},
                  mt: 2,
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <TextField
                  label="Description"
                  required
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  name="postDescription"
                />
                <div style={{ width: {lg:"45%",sm:"45%",xs:'98%'} }} className="App">
                  <Select
                    className="select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    
                  />
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection:{lg:'row',sm:'row',xs:'column'},
                  mt: 2,
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <TextField
                  label="Up Vote"
                  defaultValue="0"
                  name="upVote"
                  required
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Down Vote"
                  required
                  name="downVote"
                  defaultValue="0"
                  sx={{ width: {lg:"45%",sm:"45%",xs:'98%'} }}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <AwesomeButton
                type="submit"
                cssModule={AwesomeButtonStyles}
                type={"primary"}
                style={{marginTop:'30px',marginBottom:'30px',width:'220px'}}
                after={<FileAddedIcon />}
                
              >
                ADD
              </AwesomeButton>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default AddPost;
