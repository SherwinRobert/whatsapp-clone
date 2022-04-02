interface IMessage{
  messageContent:string
}

const LeftChatComponent = ({ messageContent }:IMessage) => {
  return (
      <div className='rounded-b-lg rounded-tr-lg w-2/3 self-start bg-emerald-800 p-2 text-white'>
          <div className='flex flex-col'>
          <div>{messageContent}</div>
            <div className='self-end text-xs'>12.00 AM</div>
          </div>
    </div>
  )
}

export default LeftChatComponent