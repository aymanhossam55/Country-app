import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiHeaders, apiURL } from "../Url/api";
import SearchInput from "../Search";
import FilterCountry from "../Filter";

const AllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCountries = useCallback(async (url, signal) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(url, {
                headers: apiHeaders,
                signal,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.errors?.[0]?.message ||
                        "Unable to load countries."
                );
            }

            const countryList = result?.data?.objects || [];

            setCountries(countryList);

            if (!countryList.length) {
                setError("No countries found.");
            }
        } catch (err) {
            if (err.name === "AbortError") {
                return;
            }

            setCountries([]);
            setError(err.message || "Something went wrong.");
        } finally {
            if (!signal.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    const getAllCountries = useCallback(() => {
        const controller = new AbortController();

        fetchCountries(
            `${apiURL}?limit=100`,
            controller.signal
        );

        return controller;
    }, [fetchCountries]);

    const getCountryByName = useCallback(
        async (countryName) => {
            const value = countryName.trim();

            if (!value) {
                const controller = getAllCountries();
                return controller;
            }

            const controller = new AbortController();

            const url =
                `${apiURL}/name?q=` +
                encodeURIComponent(value) +
                `&limit=100`;

            fetchCountries(url, controller.signal);

            return controller;
        },
        [fetchCountries, getAllCountries]
    );

    const getCountryByRegion = useCallback(
        async (regionName) => {
            if (!regionName) {
                const controller = getAllCountries();
                return controller;
            }

            const controller = new AbortController();

            const url =
                `${apiURL}/region/` +
                encodeURIComponent(regionName) +
                `?limit=100`;

            fetchCountries(url, controller.signal);

            return controller;
        },
        [fetchCountries, getAllCountries]
    );

    useEffect(() => {
        const controller = new AbortController();

        fetchCountries(
            `${apiURL}?limit=100`,
            controller.signal
        );

        return () => controller.abort();
    }, [fetchCountries]);

    return (
        <main className="all__country__wrapper">
            <section className="country__hero">
                <div className="hero__content">
                    <span className="hero__eyebrow">
                        WORLD EXPLORER
                    </span>

                    <h1>
                        Explore the
                        <span> world.</span>
                    </h1>

                    <p>
                        Discover countries, cultures, regions,
                        populations and more through a beautiful
                        interactive experience.
                    </p>
                </div>

                <div className="hero__globe">
                    <span>🌎</span>
                </div>
            </section>

            <section className="country__toolbar">
                <div className="search">
                    <SearchInput
                        onSearch={getCountryByName}
                    />
                </div>

                <div className="filter">
                    <FilterCountry
                        onSelect={getCountryByRegion}
                    />
                </div>
            </section>

            <section className="country__section-heading">
                <div>
                    <span className="section__eyebrow">
                        DISCOVER
                    </span>

                    <h2>Countries of the world</h2>
                </div>

                {!isLoading && !error && (
                    <span className="country__count">
                        {countries.length} countries
                    </span>
                )}
            </section>

            {isLoading && (
                <div className="country__bottom">
                    {Array.from({ length: 8 }).map(
                        (_, index) => (
                            <div
                                className="country__card skeleton-card"
                                key={index}
                            >
                                <div className="skeleton skeleton__image" />

                                <div className="skeleton__content">
                                    <div className="skeleton skeleton__title" />
                                    <div className="skeleton skeleton__line" />
                                    <div className="skeleton skeleton__line" />
                                    <div className="skeleton skeleton__line short" />
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {!isLoading && error && (
                <div className="state__message error__state">
                    <div className="state__icon">!</div>

                    <h3>Something went wrong</h3>

                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!isLoading &&
                !error &&
                countries.length === 0 && (
                    <div className="state__message">
                        <div className="state__icon">⌕</div>

                        <h3>No countries found</h3>

                        <p>
                            Try another country name or choose
                            another region.
                        </p>
                    </div>
                )}

            {!isLoading &&
                !error &&
                countries.length > 0 && (
                    <div className="country__bottom">
                        {countries.map((country) => {
                            const name =
                                country?.names?.common ||
                                "Unknown country";

                            const officialName =
                                country?.names?.official ||
                                name;

                            const capital =
                                country?.capitals?.[0]?.name ||
                                "No capital";

                            const flag =
                                country?.flag?.url_png ||
                                country?.flag?.url_svg ||
                                "";

                            const alpha3 =
                                country?.codes?.alpha_3;

                            return (
                                <Link
                                    className="country__link"
                                    to={`/country/${encodeURIComponent(
                                        name
                                    )}`}
                                    key={
                                        alpha3 || name
                                    }
                                >
                                    <article className="country__card">
                                        <div className="country__img">
                                            {flag ? (
                                                <img
                                                    src={flag}
                                                    alt={`${name} flag`}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flag__fallback">
                                                    🌐
                                                </div>
                                            )}

                                            <span className="country__code">
                                                {alpha3 || "---"}
                                            </span>
                                        </div>

                                        <div className="country__data">
                                            <span className="country__official">
                                                {officialName}
                                            </span>

                                            <h3>{name}</h3>

                                            <div className="country__details">
                                                <div>
                                                    <span>
                                                        Population
                                                    </span>

                                                    <strong>
                                                        {Number(
                                                            country.population ||
                                                                0
                                                        ).toLocaleString()}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>
                                                        Region
                                                    </span>

                                                    <strong>
                                                        {
                                                            country.region
                                                        }
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>
                                                        Capital
                                                    </span>

                                                    <strong>
                                                        {capital}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="country__view">
                                                View country
                                                <span>→</span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                )}
        </main>
    );
};

export default AllCountries;