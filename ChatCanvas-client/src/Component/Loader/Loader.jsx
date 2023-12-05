import Lottie from 'lottie-react';
import loadinganime from '../../assets/loadinganime.json'

const Loader = () => {
    return (
        <div style={{maxHeight: 'calc(100vh - 50px)' }}>
            <Lottie style={{width: '90vw', height: '90vh' }} animationData={loadinganime}></Lottie>
        </div>
    );
};

export default Loader;