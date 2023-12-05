import useAnnouncements from "../../api/Announcements/useAnnouncements";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { Avatar, Box, Container, Typography } from "@mui/material";
import Loader from "../Loader/Loader";

const Announcements = () => {
    const {result:announcements=[],isLoading} = useAnnouncements()

    if(isLoading){
      return <Loader></Loader>
    }
    return (
<Container maxWidth='md'>
<div style={{marginTop: '54px'}}>
            <Swiper
        slidesPerView={'1'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            announcements.map(announcement => <SwiperSlide key={announcement._id}>
                <Box sx={{minHeight: '250px', py: '35px',px: 3, bgcolor: 'primary.light', textAlign: 'center'}}>
                    <Typography variant="h5" fontWeight={'bold'}>
                    {announcement.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 3, fontSize: '16px'}}>
                    {announcement.description}
                    </Typography>
                    <Box pt={6} sx={{display:'flex', alignItems:"center", justifyContent:'center', gap: 4}}>
                    <Avatar
  alt="Remy Sharp"
  src={announcement.author_imageURL}
  sx={{ width: 56, height: 56 }}
/>
<Typography>
    {announcement.author_name}
</Typography>
                    </Box>
                </Box>
            </SwiperSlide>)
        }

      </Swiper>
        </div>
</Container>
    );
};

export default Announcements;