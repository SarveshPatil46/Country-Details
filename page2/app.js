const countryName = localStorage.getItem('country')
const container = document.querySelector('#country-details')
const spans = container.getElementsByTagName('span')

const getData = async () => {
    try {
        const res = await axios.get('https://restcountries.com/v3.1/name/' + countryName);
        const details = res.data[0];
        const commonName = details.name.common;
        const officialName = details.name.official;
        const capital = details.capital;
        const area = details.area;
        const continent = details.continents;
        const currency = details.currencies;
        const currencyName = currency[Object.keys(currency)[0]].name;
        const currencySymbol = currency[Object.keys(currency)[0]].symbol;
        const flag = details.flag;
        const flagImg = details.flags.png;
        const languagesObj = details.languages;
        const languages = Object.values(languagesObj);
        const map = details.maps.googleMaps;
        const population = details.population;

        const data = {
            commonName: commonName,
            officialName: officialName,
            capital: capital,
            area: area,
            continent: continent,
            currencyName: currencyName,
            currencySymbol: currencySymbol,
            flag: flag,
            languages: languages,
            population: population,
            // flagImg: flagImg,
            // map: map,
        }
        const img = document.createElement('img');
        img.src = flagImg;
        const header = document.createElement('h1')
        header.textContent = countryName.toUpperCase();
        container.insertAdjacentElement('beforebegin', img)
        img.insertAdjacentElement('beforebegin', header)
        return data;
    }
    catch (e) {
        return e;
    }
}

const addData = async () => {
    let data = await getData();
    let i = 1;
    for (let item in data) {
        let p = document.querySelector(`p:nth-of-type(${i})`);
        p.textContent += data[item];
        i++;
    }
}

addData();