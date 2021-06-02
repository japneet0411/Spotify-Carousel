import React from "react";
import "./about.scss";
import "./about.css";
import Navbar from "./../../components/Navbar/navbarHome";
const About = () => {
  return (
    <div className="about">
      <Navbar />
      <div className="About-Us">
        <h1 className="text">About Us</h1>
        <p className="Proj">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dolor
          augue, aliquam vitae ipsum ac, eleifend dapibus magna. Etiam laoreet
          sollicitudin rutrum. Sed egestas, turpis semper dignissim molestie,
          elit lorem pharetra sapien, eget ornare velit nisl eu est. Phasellus
          vitae viverra tortor, ut sollicitudin lacus. Fusce sollicitudin porta
          urna. Proin auctor metus finibus est feugiat efficitur. Nulla
          convallis elementum pharetra. <br />
          Sed fringilla, orci at blandit imperdiet, enim neque elementum magna,
          in ultrices tellus lectus in tortor. Donec at ipsum est. Phasellus
          auctor turpis felis, vel egestas ipsum dictum id. Aliquam tincidunt
          posuere lacus, vel molestie ante scelerisque et. Aenean tristique
          felis nec lacus pellentesque volutpat. Morbi vitae arcu dolor. Nullam
          eros risus, convallis vel vehicula id, ullamcorper ac quam.
        </p>

        <p className="details">
          IWPT Project Team Members:{" "}
          <br></br>
          <br />
          Swayam Shresth Mohapatra (19BCT0021)<br></br>
          Japneet Kaur (19BCT0045)<br></br>
          Aayushi Varma (19BCT0068)
        </p>
      </div>
    </div>
  );
};

export default About;
