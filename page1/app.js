const countryList = document.querySelector('#country-list');
const countries = countryList.getElementsByTagName('li');
const searchBox = document.getElementById('search-input');
let countryArray = [];
let ul = document.querySelector('#country-list');

searchBox.addEventListener('keyup', async (e) => {

    const searchTerm = e.target.value;
    const array = await getCountries();
    const lower = array.map(element => {
        return element.toLowerCase();
    });
    const filteredCountries = lower.filter((country) => {
        return country.includes(searchTerm.toLowerCase());
    });
    const distinct = [...new Set(filteredCountries)];

    ul.innerHTML = '';
    for (country of distinct) {
        const newLI = document.createElement("li");
        newLI.textContent = country.toUpperCase();
        countryList.append(newLI);
    }
});

const getCountries = async () => {
    try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        const countriesNames = res.data;
        for (let country of countriesNames) {
            countryArray.push(country.name.common);
        }
        const arr = Object.values(countryArray);
        const lower = arr.map(element => {
            return element.toLowerCase();
        });
        return lower.sort();
    }
    catch (e) {
        return e;
    }
}

const makeLI = async () => {
    const countryNames = await getCountries();
    window.demoName = countryNames;
    for (country of countryNames) {
        const newLI = document.createElement("li");
        newLI.textContent = country.toUpperCase();
        countryList.append(newLI);
    }
}

const addClickListener = async () => {
    await makeLI();
    const lis = countryList.getElementsByTagName('li');

    for (li of lis) {
        li.addEventListener('click', (e) => {
            console.log(e.target.innerText);
            window.location = 'page2.html'
            localStorage.setItem('country', e.target.innerText);
        });
    };
}

addClickListener();