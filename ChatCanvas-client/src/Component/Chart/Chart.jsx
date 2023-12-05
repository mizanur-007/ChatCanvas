import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import usePostCount from '../../api/Posts/usePostCount';
import useUserCount from '../../api/Users/useUserCount';
import Loader from '../../Component/Loader/Loader'
import useCountComments from '../../api/Comments/useCountComments';


const Chart = () => {

  const {count,countLoading}=usePostCount()
  const {userCount,userCountLoading}=useUserCount()
  const {commentsCount,commentCountLoading}= useCountComments()


  if(countLoading||userCountLoading||commentCountLoading){
    return <Loader></Loader>
  }
  

  const data = [
    { value: userCount, label: 'Number Of Users' },
    { value: count, label: 'Number Of Posts' },
    { value: commentsCount, label: 'Number Of Comments' }
  ];
  
  const size = {
    width: 800,
    height: 300,
  };
  return (
    <div style={{marginBottom:'50px'}}>
     <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 25,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
    </div>
  );
};

export default Chart;