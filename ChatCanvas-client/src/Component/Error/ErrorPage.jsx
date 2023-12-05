import Lottie from "lottie-react";
import erroranime from '../../assets/erroranime.json'


const ErrorPage = () => {
    return (
        <div style={{maxHeight: 'calc(100vh - 50px)' }}>
            <Lottie style={{width: '90vw', height: '90vh' }} animationData={erroranime}></Lottie>
        </div>
    );
};

export default ErrorPage;