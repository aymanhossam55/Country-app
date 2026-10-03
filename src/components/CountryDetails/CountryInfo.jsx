import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { apiHeaders, apiURL } from "../Url/api";

const CountryInfo = () => {
    const { countryName } = useParams();

    const navigate = useNavigate();

    const [country, setCountry] = useState(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const controller =
            new AbortController();

        const getCountry = async () => {
            setIsLoading(true);
            setError("");
            setCountry(null);

            try {
                const decodedName =
                    decodeURIComponent(
                        countryName
                    );

                let response = await fetch(
                    `${apiURL}/names.common/${encodeURIComponent(
                        decodedName
                    )}`,
                    {
                        headers: apiHeaders,
                        signal: controller.signal,
                    }
                );

                /*
                    If searching by country name fails,
                    try the URL parameter as an alpha-3 code.
                */

                if (!response.ok) {
                    response = await fetch(
                        `${apiURL}/codes.alpha_3/${encodeURIComponent(
                            decodedName
                        )}`,
                        {
                            headers: apiHeaders,
                            signal: controller.signal,
                        }
                    );
                }

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result?.errors?.[0]
                            ?.message ||
                            "Country not found."
                    );
                }

                const countryData =
                    result?.data?.objects?.[0];

                if (!countryData) {
                    throw new Error(
                        "Country not found."
                    );
                }

                setCountry(countryData);
            } catch (err) {
                if (
                    err.name ===
                    "AbortError"
                ) {
                    return;
                }

                setError(
                    err.message ||
                        "Unable to load country."
                );
            } finally {
                if (
                    !controller.signal.aborted
                ) {
                    setIsLoading(false);
                }
            }
        };

        getCountry();

        return () =>
            controller.abort();
    }, [countryName]);

    const formatPopulation = (value) => {
        if (!value) return "N/A";

        return Number(
            value
        ).toLocaleString();
    };

    const getCurrency = () => {
        const currencies =
            country?.currencies;

        if (!Array.isArray(currencies)) {
            return "N/A";
        }

        return currencies
            .map(
                (currency) =>
                    `${currency.name}${
                        currency.symbol
                            ? ` (${currency.symbol})`
                            : ""
                    }`
            )
            .join(", ");
    };

    const getLanguages = () => {
        const languages =
            country?.languages;

        if (!Array.isArray(languages)) {
            return "N/A";
        }

        return languages
            .map(
                (language) =>
                    language.name
            )
            .join(", ");
    };

    const getCapital = () => {
        return (
            country?.capitals?.[0]
                ?.name || "N/A"
        );
    };

    if (isLoading) {
        return (
            <main className="country__info__wrapper">
                <div className="detail__back">
                    <Link to="/">
                        ← Back to countries
                    </Link>
                </div>

                <div className="detail__skeleton">
                    <div className="skeleton detail__flag" />

                    <div className="detail__skeleton-content">
                        <div className="skeleton skeleton__title" />
                        <div className="skeleton skeleton__line" />
                        <div className="skeleton skeleton__line" />
                        <div className="skeleton skeleton__line" />
                        <div className="skeleton skeleton__line short" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !country) {
        return (
            <main className="country__info__wrapper">
                <div className="detail__back">
                    <Link to="/">
                        ← Back to countries
                    </Link>
                </div>

                <div className="state__message error__state">
                    <div className="state__icon">
                        !
                    </div>

                    <h3>
                        Country unavailable
                    </h3>

                    <p>
                        {error ||
                            "We couldn't find this country."}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Back Home
                    </button>
                </div>
            </main>
        );
    }

    const name =
        country?.names?.common ||
        "Unknown country";

    const officialName =
        country?.names?.official ||
        name;

    const flag =
        country?.flag?.url_png ||
        country?.flag?.url_svg ||
        "";

    const alpha2 =
        country?.codes?.alpha_2 ||
        "N/A";

    const alpha3 =
        country?.codes?.alpha_3 ||
        "N/A";

    const region =
        country?.region || "N/A";

    const subregion =
        country?.subregion || "N/A";

    const timezones =
        country?.timezones?.join(", ") ||
        "N/A";

    const borders =
        country?.borders || [];

    return (
        <main className="country__info__wrapper">
            <div className="detail__back">
                <Link to="/">
                    <span>←</span>
                    Back to countries
                </Link>
            </div>

            <section className="country__info__container">
                <div className="country__info-img">
                    {flag ? (
                        <img
                            src={flag}
                            alt={`${name} flag`}
                        />
                    ) : (
                        <div className="detail__flag-fallback">
                            🌎
                        </div>
                    )}

                    <div className="flag__caption">
                        <span>
                            {alpha2}
                        </span>

                        <span>
                            {alpha3}
                        </span>
                    </div>
                </div>

                <div className="country__info">
                    <span className="detail__eyebrow">
                        COUNTRY PROFILE
                    </span>

                    <h1>{name}</h1>

                    <p className="official__name">
                        {officialName}
                    </p>

                    <div className="country__info-grid">
                        <div className="info__item">
                            <span>
                                Population
                            </span>

                            <strong>
                                {formatPopulation(
                                    country.population
                                )}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Region
                            </span>

                            <strong>
                                {region}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Subregion
                            </span>

                            <strong>
                                {subregion}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Capital
                            </span>

                            <strong>
                                {getCapital()}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Currency
                            </span>

                            <strong>
                                {getCurrency()}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Languages
                            </span>

                            <strong>
                                {getLanguages()}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Timezones
                            </span>

                            <strong>
                                {timezones}
                            </strong>
                        </div>

                        <div className="info__item">
                            <span>
                                Landlocked
                            </span>

                            <strong>
                                {country.landlocked
                                    ? "Yes"
                                    : "No"}
                            </strong>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border__section">
                <div>
                    <span className="section__eyebrow">
                        GEOGRAPHY
                    </span>

                    <h2>
                        Border countries
                    </h2>
                </div>

                {borders.length > 0 ? (
                    <div className="border__list">
                        {borders.map(
                            (border) => (
                                <Link
                                    key={border}
                                    to={`/country/${border}`}
                                    className="border__country"
                                >
                                    {border}
                                    <span>
                                        →
                                    </span>
                                </Link>
                            )
                        )}
                    </div>
                ) : (
                    <p className="no__borders">
                        This country has no
                        land borders.
                    </p>
                )}
            </section>
        </main>
    );
};

export default CountryInfo;