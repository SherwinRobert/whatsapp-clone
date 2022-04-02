import frontImage from '../../Images/frontImage.jpg'

const FrontPanel = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
          <img className='rounded-full' src={frontImage} alt="" />
          <div className='flex flex-col items-center'>
              <h1 className='text-3xl text-center my-2 text-white'>Keep Your Phone Connected</h1>
              <div className='text-center w-[650px] text-gray-300'>What's App connects to your phone to sync your messages. To reduce data usage, connect your phone to Wi-Fi</div>
          </div>
    </div>
  )
}

export default FrontPanel