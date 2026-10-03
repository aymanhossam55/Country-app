import "./App.css";
import AllCountries from "./components/Country/AllCountry";
import CountryInfo from "./components/CountryDetails/CountryInfo";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
    const [theme, setTheme] = useState("light");

    const switchTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
        );
    };

    return (
        <div
            className="Container-parent"
            data-theme={theme}
        >
            <div className="header">
                <div className="container">
                    <div className="container-details">
                        <h5>Where in the world</h5>

                        <div className="theme-toggle">
                            <button
                                type="button"
                                className="btn-toggle"
                                onClick={switchTheme}
                            >
                                <span className="theme-icon">
                                    {theme === "light"
                                        ? "🌙"
                                        : "☀️"}
                                </span>

                                <span>
                                    {theme === "light"
                                        ? "Dark mode"
                                        : "Light mode"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="paths">
                <Routes>
                    <Route
                        path="/"
                        element={<AllCountries />}
                    />

                    <Route
                        path="/country/:countryName"
                        element={<CountryInfo />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;