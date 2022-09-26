import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Details.module.css";
import Image from "next/image";
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API

  let id = context.query.id;

  const res = await fetch(`
   
https://api.themoviedb.org/3/movie/${id}?api_key=931fa26364246e318b07fbc8f8a75ead`);

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
export default function Details({ data }) {
  console.log(data);
  const [favourt,setFavourt]=useState("#ffffff")
  const handelFavourtColor=()=>{
if(favourt==="white"){
  setFavourt("red")
}else{
  setFavourt("#ffffff")
}
  }
  const radius = (rate) => {
    let result = rate > 70 ? styles.heighAverage : styles.lowAverage;
    return result;
  };
  const myLoader = ({ src, width, quality }) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const router = useRouter();
  const { id } = router.query;
  const movieRunTime = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + "h" + " " + minutes + "m";
  };

  return (
    <div className="container ">
      <div className="row vh-100 my-5">
        <div className="col-md-3 col-sm-12 pt-5">
          <Image
            loader={myLoader}
            src={data.poster_path}
            alt="Picture of the Movie Poster"
            width={500}
            height={500}
          />
        </div>
        <div className="col-md-9 col-sm-12 p-5">
          <h1>{data.original_title} ( 2022)</h1>
          <p>
            {data.release_date} . {data.genres[0].name} .
            {movieRunTime(data.runtime)}
          </p>
          <div className="d-flex  align-items-center ">
            <div
              className={`${styles.average} ${radius(
                data.vote_average * 10
              )}  me-5 rounded-circle bg-dark  d-flex justify-content-center align-items-center text-light fw-bold`}
            >
              <p className={`${styles.notRotate} px-5`}>
                {data.vote_average * 10}
              </p>
            </div>
            <p>
              User<br></br> Score
            </p>
            <div
              className={`d-flex  align-items-center mx-5 rounded-circle justify-content-center p-4 ${styles.favourt}`}
              style={{ background: "#032541" }}

            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="  bi bi-heart-fill"
                style={{color:{favourt}}}
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </div>
            <div>
              <a href={data.homepage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
                <p>Homepage</p>
              </a>
            </div>
          </div>
          <p className="text-gray">{data.tagline}</p>
          <h4>Overview</h4>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}
