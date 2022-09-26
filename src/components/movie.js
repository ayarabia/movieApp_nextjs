import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
function Movies({ data }) {
   // console.log(data.results);
    const myLoader = ({ src, width, quality }) => {
      return `https://www.themoviedb.org/t/p/w220_and_h330_face/${src}?w=${width}&q=${quality || 75}`
    }
  return (
    <div className="container">
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <div className="d-flex justify-content-between row">
    
      </div>
    </div>
  );
}

export default Movies;
// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=931fa26364246e318b07fbc8f8a75ead`);
  
    const data = await res.json();
  
    // Pass data to the page via props
    return { props: { data } };
  }