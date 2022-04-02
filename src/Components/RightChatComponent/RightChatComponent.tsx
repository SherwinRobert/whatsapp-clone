interface IMessage{
  messageContent:string
}

const RightChatComponent = ({ messageContent }:IMessage) => {
    return (
      <div className='rounded-b-lg rounded-tl-lg w-2/3 self-end bg-emerald-800 p-2 text-white'>
          <div className='flex flex-col'>
          <div>{messageContent}</div>
            <div className='self-end text-xs'>12.00 AM</div>
          </div>
    </div>
  )
}

export default RightChatComponent