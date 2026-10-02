import './App.css'
import AllCountries from "./components/Country/AllCountry";
import CountryInfo from "./components/CountryDetails/CountryInfo";
import { Routes, Route, Await } from "react-router-dom";
import { useState } from 'react';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
// import useLocalStorage from "use-local-storage'


function App() {
  // const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState('theme' ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme ===  'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  // const [countries,setCountries] = useState([]);
  // const fetchdata = async () => {
  //   const response = await fetch("https://restcountries.com/v3.1");
  //   const data = await response.json();
  //   setCountries(data);
  // }

  return (
    // <ThemeContext.Consumer>
    // {({ changeTheme }) => (
    <div className='Container-parent' data-theme={theme}>
  <div className="header">
        <div className="container" >
          <div className='container-details'>
          <h5>Where in the world</h5>
          <div style={{display:"flex"}}>
                <>
                <p
                  color="link"
                  className='btn-toggle'
                  style={{marginTop:"0.5rem" ,background:"none"}}
                  // onClick={() => {
                  //   setDarkMode(!darkMode);
                  //   changeTheme(darkMode ? themes.light : themes.dark);
                  // }}
                  onClick={switchTheme}
                >
                  {/* <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i> */}
                  <span className="d-lg-none d-md-block" ><ThemeSwitcher/></span>
                </p>
                <p>Dark mode</p>
                </>
              </div>
          </div>
        </div>
      </div>
      <div className="paths">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CountryInfo 
          // countries={countries} refetch={fetchdata}
           />} />
        </Routes>
      </div>
    </div>
      //   )}
      // </ThemeContext.Consumer>

  )
}

export default App
