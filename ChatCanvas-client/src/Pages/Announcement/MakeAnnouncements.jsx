import { Box, Button, Paper, TextField } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import { postAnnouncement } from "../../api/Announcements/postAnnouncement";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const MakeAnnouncements = () => {
  const { user } = useAuth();

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const announceTitle = form.announceTitle.value;
    const Description = form.announceDescription.value;
    const announce = {
      author_name: name,
      author_imageURL: photoURL,
      title: announceTitle,
      description: Description,
    };

    const data = await postAnnouncement(announce);
    if (data?._id) {
      toast.success("Announcement created", {
        position: "top-center",
        autoClose: 2000,
      });
      form.reset();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Make Announcement</title>
      </Helmet>
      <Box
        component={Paper}
        sx={{ bgcolor: "primary.lighter", pt: 4, pb: 4, px: 3 }}
      >
        <form onSubmit={handleAnnouncement}>
          <Box
            sx={{ display: "flex", mt: 2, justifyContent: "center", gap: 5 }}
          >
            <TextField
              label="Your Name"
              name="name"
              required
              defaultValue={user?.displayName}
              sx={{ width: "45%" }}
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="PhotoURL"
              name="photoURL"
              required
              defaultValue={user?.photoURL}
              sx={{ width: "45%" }}
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box
            sx={{ display: "flex", mt: 2, justifyContent: "center", gap: 5 }}
          >
            <TextField
              label="Title"
              required
              sx={{ width: "45%" }}
              variant="filled"
              name="announceTitle"
            />
            <TextField
              label="Description"
              required
              sx={{ width: "45%" }}
              variant="filled"
              name="announceDescription"
            />
          </Box>

          <Box
            sx={{ display: "flex", mt: 2, justifyContent: "center", gap: 5 }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                my: 3,
                color: "white",
                px: 1,
                width: "170px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Announce
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default MakeAnnouncements;
