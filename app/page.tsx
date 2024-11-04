
import PersonalInfo from "./components/biodata";
import Hero from "./components/hero";
import HobbiesGallery from "./components/hobi";
import Rating from "./components/rating";
import RiwayatPekerjaan from "./components/RiwayatPekerjaan";
import RiwayatPendidikan from "./components/RiwayatPendidikan";
import Skills from "./components/skills";

import "./raflyra-style.css"




export default function Gallery() {
  return (
    <section>
      <Hero/>
      <PersonalInfo/>
      <RiwayatPendidikan/>
      <RiwayatPekerjaan/>
      <HobbiesGallery/>
      <Skills/>
      <Rating/>


</section>
);
}