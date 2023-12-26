import React, {useState,useEffect} from 'react';
import axios from "axios";
import {Buffer} from "buffer";
import {useNavigate} from 'react-router-dom';
import loader from "../assets/loader.gif";
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const setProfilePicture = async () =>{

    };

    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    },[]);

  return (
  <>
    <Container>
        <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">{
            avatars.map((avatar,index) =>{
                return(
                    <div className={`avatar ${selectedAvatar === index? "selected" : ""}`}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                         onClick={() => setSelectedAvatar(index)} key={avatar}
                        />
                    </div>
                )
            })
        }

        </div>
    </Container>
    <ToastContainer />
  </>)
  
}

const Container = styled.div`

`;
