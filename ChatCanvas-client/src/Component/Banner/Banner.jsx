import { Autocomplete, Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import useTags from "../../api/Tags/useTags";
import { useState } from "react";
import useSearch from "../../api/Searched/useSearch";
import Loader from '../../Component/Loader/Loader'

// eslint-disable-next-line react/prop-types
const Banner = ({handleSearch}) => {
  const [search, setSearch] = useState(null)

  const {searches,isLoading} = useSearch()
  

const {tags,isLoading:tagLoading} = useTags();

if(isLoading||tagLoading){
  return <Loader></Loader>
}


const handleSearchValue =(event, newValue)=>{
  setSearch(newValue)

}

  return (
    <div style={{marginTop:'24px'}}>
<Container maxWidth='md'>
<Grid container>
        <Grid item lg={6} sm={6} xs={12} sx={{display: 'flex', alignItems: 'center', justifyItems:'center'}}>
          <Box>
          <Typography  sx={{fontWeight:'bold', fontSize:{lg:'42px',md:'42px',xs:'42px'},lineHeight: '48px', marginBottom: '8px', color: 'primary.main'}}> Where Opinions Unite</Typography>
          <Typography variant="body1" sx={{fontWeight:'base', lineHeight:'28px',pr:2}}> Unite Minds, Share Thoughts, Build Ideas. Join a Diverse Community of Thinkers & Doers</Typography>
<Box sx={{display:'flex', alignItems:'center', width:'100%', marginTop: '20px'}}>
<Stack sx={{width: '80%'}}>
          <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={tags.map((option) => option.tag_title)}
        onChange={handleSearchValue}
        renderInput={(params) => (
          <TextField
          onChange={(e)=>setSearch(e.target.value)}
          sx={{width: '65%', bgcolor: 'secondary.light'}}
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
          </Stack>
          <Button onClick={()=>handleSearch(search)} variant="contained" sx={{ml: '-120px', color: 'white', fontWeight: 'bold' , py: '16px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px'}}>Search</Button>
</Box>
<Box sx={{display:'flex',alignItems:'center'}}>
  <Typography sx={{fontSize:'12px',fontWeight:'bold'}}>
    Popular Searches: 
  </Typography>
{
  searches.map(searched =>   <Button onClick={()=>handleSearch(searched._id)} variant="//#region " sx={{fontSize:'12px'}} key={searched._id}>
    {searched._id}
    </Button>)
}
  </Box>
          </Box>
        </Grid>

        <Grid item sx={{mt:{xs:'20px',lg:'0px'}}} lg={6} sm={6} xs={12}>
<Box >
<img  style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px',width:'100%'}} src="https://i.ibb.co/F5y2smg/7437495-3646248.jpg" alt="" />
</Box>
        </Grid>
      </Grid>
</Container>
    </div>
  );
};

export default Banner;
