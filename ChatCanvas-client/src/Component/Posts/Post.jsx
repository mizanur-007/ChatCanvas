import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { format } from "date-fns";
import { Link } from "react-router-dom";



// eslint-disable-next-line react/prop-types
const Post = ({post}) => {




    
    const {author_image, author_name, downvote
, post_description, post_title, posted_time, tag
, upvote, voteDifference, comments,_id}=post
const formattedDate = format(new Date(posted_time), 'dd-MM-yyyy hh:mm a');
    return (
<Link to={`/post/${_id}`} style={{textDecoration: 'none'}}>
<Card component={Paper} elevation={10} sx={{ maxWidth: '100%' , mb: 7}}>
      <CardHeader
        avatar={
            <Avatar
            alt="Remy Sharp"
            src={author_image}
            sx={{ width: 56, height: 56 }}
          />
        }
        subheader={formattedDate}
      />
      <CardContent>
        <Typography variant="h4" color="black" sx={{mt: -2, mb: 3}}>
{post_title}
        </Typography>

        <Typography>
          <Box  sx={{bgcolor: 'primary.light', display:'inline', p:1, borderRadius: 2}}>
          #{tag}
          </Box>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CommentIcon />
          <Typography ml={1}>{comments}</Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ThumbUpIcon />
        </IconButton>
        <Typography>
          {voteDifference}
        </Typography>
      </CardActions>
    </Card>
</Link>
    );
};

export default Post;