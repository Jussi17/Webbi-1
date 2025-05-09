function teht18(sade) {
    if (typeof sade !== 'number' || sade <= 0) {
        return 0;
    }
    const pintaAla = Math.PI * sade * sade;
    return parseFloat(pintaAla.toFixed(2));
}

const sade = 5; 
const pintaAla = teht18(sade);
console.log("Ympyrän pinta-ala on: " + pintaAla);


function teht19(taulukko) {
    if (!Array.isArray(taulukko) || taulukko.length === 0) {
        return {
            min: 0,
            max: 0,
            avg: 0,
            sum: 0
        };
    }

    let min = Math.min(...taulukko);
    let max = Math.max(...taulukko);
    let sum = taulukko.reduce((acc, val) => acc + val, 0);
    let avg = sum / taulukko.length;

    return {
        min: min,
        max: max,
        avg: parseFloat(avg.toFixed(2)),
        sum: sum
    };
}

let taulukko = [11, 2, 30, 4, 58, 6, 7, 89, 93, 10];

let tulokset = teht19(taulukko);
console.log("Min:", tulokset.min);
console.log("Max:", tulokset.max);
console.log("Avg:", tulokset.avg);
console.log("Sum:", tulokset.sum);


function teht20(maara, results) {
    for (let i = 0; i < maara; i++) {
        let luku = i + 1;
        let potenssi = i;
        let tulos = Math.pow(luku, potenssi);
        results[i] = tulos;
        console.log(`${luku} potenssiin ${potenssi} = ${tulos}`);
    }
}
let results = [];
teht20(6, results);


function teht21(pvm) {
    if (!pvm || pvm.length !== 10) {
        return false;
    }

    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(pvm)) {
        return false;
    }

    const [paiva, kuukausi, vuosi] = pvm.split(".").map(Number);

    if (
        paiva < 1 || paiva > 31 ||
        kuukausi < 1 || kuukausi > 12 ||
        vuosi < 1900 || vuosi > 2020
    ) {
        return false;
    }

    return true;
}


module.exports = {
    teht18 : teht18,
    teht19 : teht19,
    teht20 : teht20,
    teht21 : teht21
}