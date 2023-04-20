import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Link } from "react-router-dom";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <Link to="/Match"><img src={Add} alt="" /></Link>
          <Link to="/Settings"> <img src={More} alt="" /> </Link>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;