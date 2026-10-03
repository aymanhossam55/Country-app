const Filter = ({ onSelect }) => {
    const selectHandler = (event) => {
        const regionName = event.target.value;

        onSelect(regionName);
    };

    return (
        <div className="filter__wrapper">
            <span className="filter__icon">
                ◉
            </span>

            <select
                onChange={selectHandler}
                defaultValue=""
                aria-label="Filter countries by region"
            >
                <option value="" disabled>
                    Filter by region
                </option>

                <option value="Africa">
                    Africa
                </option>

                <option value="Americas">
                    Americas
                </option>

                <option value="Asia">
                    Asia
                </option>

                <option value="Europe">
                    Europe
                </option>

                <option value="Oceania">
                    Oceania
                </option>
            </select>
        </div>
    );
};

export default Filter;