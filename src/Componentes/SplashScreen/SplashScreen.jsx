import clicknshop from "../../Assets/clicknshop.png";
import CircularProgress from '@mui/material/CircularProgress';

const SplashScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-6 bg-gray-200">
        <img
        src={clicknshop}
        alt="img"
        className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto"
        />
        <CircularProgress sx={{ color: '#008ecc' }} size={50} />
    </div>
  )
};

export default SplashScreen;