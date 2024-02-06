import "./weather.css";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Table } from "./table";
export const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("mumbai");
  const history = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4bcac5c5b467037f5aa9744850086e92`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  const logout = async () => {
    try {
      await signOut(auth);
      history("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <div>
          <button onClick={logout}> Sign Out </button>
        </div>
        <div>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {!city ? (
          <p>No Data Found</p>
        ) : (
          <div>
            <h2>{search}</h2>
            <h1>{city.temp} °C</h1>
            <h3>
              Min : {city.temp_min} °C|| Max : {city.temp_max} °C
            </h3>
          </div>
        )}
      </div>
      <div>
        <Table />
      </div>
    </>
  );
};
