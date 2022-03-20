
import ImageSlider from "../components/Layouts/Slider";
import "../assets/css/App.css"
import Navbar from "../components/Layouts/Navbar";

function Home() {
  return (

    <>
      <div className="container mt-5 carousel">
        <h1 className="slider_title"></h1>
        <ImageSlider />

      </div>
    </>


  );
}

export default Home;

//npm install react-slick --save
//npm install slick-carousel (this is for slick-carousel for css and font)