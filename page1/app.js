const countryList = document.querySelector('#country-list');
const countries = countryList.getElementsByTagName('li');
const searchBox = document.getElementById('#search-input');

const getCountries = async () => {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    const countries = res.data;
    let countryArray = [];
    for (let country of countries) {
        countryArray.push(country.name.common);
    }
    return countryArray.sort();
}

const makeLI = async () => {
    const countryNames = await getCountries();
    for (country of countryNames) {
        const newLI = document.createElement("li");
        newLI.textContent = country;
        countryList.append(newLI);
    }
}

const addClickListener = async () => {
    await makeLI();
    const lis = countryList.getElementsByTagName('li');

    for (li of lis) {
        li.addEventListener('click', (e) => {
            window.location = '/Users/sarveshpatil/Desktop/Sarvesh/Projects/WebProjects/Maps/page2/page2.html'
            localStorage.setItem('country', e.target.innerText);
        });
    };
}

addClickListener();

// let arr = Array.from(countries);

// function updateResult(query) {
//     let resultList = document.querySelector("#country-list");
//     resultList.innerHTML = "";

//     arr.map(function (algo) {
//         query.split(" ").map(function (word) {
//             if (algo.toLowerCase().indexOf(word.toLowerCase()) != -1) {
//                 resultList.innerHTML += `<li class="list-group-item">${algo}</li>`;
//             }
//         })
//     })
// }