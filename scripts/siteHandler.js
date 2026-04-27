import { titles, Elements } from "./globalVariables.js";
(() => {
    function currentDateFormatted() {
        const date = new Date();
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    fetch("http://ip-api.com/json")
    .then(res => res.json())
    .then(data => {
        Elements.Info.IP.textContent = `IP: ${data.query}`;
        Elements.Info.Country.textContent = `Country: ${data.country}`;
        Elements.Info.Date.textContent = `Date: ${currentDateFormatted()}`
    });

    setInterval(() => {
        Elements.Info.Date.textContent = `Date: ${currentDateFormatted()}`;
    }, 1000);

})();

(() => {
    let index = 0;
    setInterval(() => {
        document.title = titles[index];
        index = (index + 1) % titles.length;
    }, 1000);
})();