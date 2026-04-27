const titles = ["🔥 NILCIRCUIT V2 🔥", "💧 NILCIRCUIT V2 💧"];
let index = 0;

setInterval(() => {
    document.title = titles[index];
    index = (index + 1) % titles.length;
}, 1000);