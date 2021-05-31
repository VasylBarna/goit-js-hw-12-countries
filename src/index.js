import "./saas/main.scss";

import API from "./js/fetchCountries";

import debounce from "lodash.debounce";

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error } from "@pnotify/core";
import { defaults } from "@pnotify/core";
defaults.width = "320px";
defaults.minheight = "80px";
defaults.delay = "3000";

import countCardTpl from "./templates/country-card.hbs";
import countListTpl from "./templates/country-list.hbs";
import "./templates/country-flag.hbs";

const refs = {
  inputSearch: document.querySelector(".input-search"),
  cardCount: document.querySelector(".js-card-container"),
};

refs.inputSearch.addEventListener("input", debounce(onSearch, 500));

function onSearch(event) {
  // event.preventDefault();
  const inputValue = refs.inputSearch.value;
  if (inputValue.trim() === "") {
    return;
  }
  API.fetchCountries(inputValue).then(enterLetters).catch(onError);
}

function enterLetters(countries) {
  if (countries.length > 10) {
    clearCount();
    error(
      "Найдено слишком много совпадений. Пожалуйста, введите более конкретный запрос!"
    );
  }
  if (countries.length >= 2 && countries.length <= 10) {
    console.log(countries.length);
    rendercountListTpl(countries);
  }
  if (countries.length === 1) {
    rendercountCard(countries);
  }
}

function rendercountCard(countries) {
  const cardMarkup = countCardTpl(countries[0]);
  clearCount();
  refs.cardCount.insertAdjacentHTML("beforeend", cardMarkup);
}

function rendercountListTpl(countries) {
  const listMarkup = countListTpl(countries);
  console.log(listMarkup);
  clearCount();
  refs.cardCount.insertAdjacentHTML("beforeend", listMarkup);
}

function onError(error) {
  clearCount();
  console.log(error);
}

function clearCount() {
  refs.cardCount.innerHTML = "";
}
