const COUNT_URL = "https://restcountries.eu/rest/v2/name";

function fetchCountries(searchQuery) {
  return fetch(`${COUNT_URL}/${searchQuery}`).then((response) =>
    response.json()
  );
}

export default { fetchCountries };
