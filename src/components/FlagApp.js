import React, { useState, useEffect } from "react";

const FlagApp = () => {
  const [ulkeler, setUlkeler] = useState([]);
  const [hata, setHata] = useState(false);
  const [status, setStatus] = useState(200);

  useEffect(() => {
    fetch("https://restcountries.com/v3/all")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setHata(true);
          setStatus(res.status);
        }
      })
      .then((data) => setUlkeler(data))
      .catch((error) => console.log(error));
  }, [hata]);

  if (!hata) {
    return (
      <div className="container text-center mt-4">
        <h1 className=" p-5 ">COUNTRIES</h1>
        <div className="container cards">
          {ulkeler.map((ulke) => {
            console.log(ulke);

            const { name, capital, flags, maps, continents, population } = ulke;
            return (
              <div
                className="card"
                style={{ width: "22rem" }}
                key={name.common}
              >
                <img
                  src={flags[0]}
                  class="card-img-top"
                  style={{ height: "20rem" }}
                  alt={name.common}
                />
                <div className="card-body">
                  <h2>{name.common}</h2>
                  <h5 className="card-title">Capital:{capital}</h5>

                  <h6>Continents:{continents}</h6>
                  <p>Population:{population}</p>
                  <a href={maps.googleMaps} className="btn btn-primary">
                    Go Maps
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1 className="bg-danger text-center text-light mt-5">
          !!HATA VERİLER ÇEKİLEMEDİ-Code:{status}
        </h1>
        <button
          className="btn btn-outline-warning"
          onClick={() => setHata(false)}
        >
          Güncelle
        </button>
      </>
    );
  }
};

export default FlagApp;
