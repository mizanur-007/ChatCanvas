import { Box, Container, Paper } from "@mui/material";
import useTags from "../../api/Tags/useTags";
import Loader from "../Loader/Loader";


const Tags = () => {
    const {tags,isLoading} = useTags()

    if(isLoading){
        return <Loader></Loader>
    }

    return (
        <div style={{marginTop: '50px'}}>
            <Container maxWidth='md'>
            <Box component={Paper} textAlign='center' elevation={7} sx={{px:{lg:3,sm:1,xs:'2px'}}} py={2}>
            {
                tags.map(tag => <Box key={tag._id} m={1}  sx={{bgcolor: 'primary.light', display:'inline-grid', p:1, borderRadius: 2}}>
                #{tag.tag_title}
                </Box>)
            }
            </Box>
            </Container>
        </div>
    );
};

export default Tags;