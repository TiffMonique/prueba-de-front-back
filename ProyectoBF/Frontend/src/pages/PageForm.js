import "../App.css";
import styled from "styled-components";
import { AccountBox } from "../components/accountBox";
import bgvideo from "../assets/video/videoBackground.mp4"

export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //position: absolute;
  //padding-bottom: 500px;
`;

function Forms() {
    return (
        <div>
            <AppContainer>
                <AccountBox />
            </AppContainer>

            <div className='banner' >
                <video
                    id="videoBG" poster="./img/poster.png"
                    autoPlay
                    loop
                    muted
                >
                    <source src={bgvideo} type="video/mp4"></source>
                </video>
                <div>

                </div>
            </div>
        </div >

    );
}


export default Forms;