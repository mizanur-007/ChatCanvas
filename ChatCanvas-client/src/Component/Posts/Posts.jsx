
import { Button, Container } from '@mui/material';
import Post from './Post';
import Loader from '../Loader/Loader';
import { AwesomeButton } from 'react-awesome-button';
import { SearchIcon } from '@primer/octicons-react';


// eslint-disable-next-line react/prop-types
const Posts = ({posts,isLoading, setSort}) => {


    

    if(isLoading){
        return <Loader></Loader>
    }

    
    

    return (
        <div style={{marginTop:'50px'}}>

<Container maxWidth='md' sx={{mb: 8}}>
    <AwesomeButton after={<SearchIcon />} onPress={()=>setSort(true)} variant='contained' style={{marginBottom: '12px', color:'white', fontSize: '18px', fontWeight:'bold'}}>Sort by popularity</AwesomeButton>
{
    // eslint-disable-next-line react/prop-types
    posts?.map(post => <Post key={post?._id} post={post}></Post>)
}
</Container>
            
        </div>
    );
};

export default Posts;