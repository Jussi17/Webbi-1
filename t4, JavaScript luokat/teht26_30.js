//Tehtävä 26,28,29
class Oppilas {
    constructor(_nimi, _syntymavuosi, _osoite, _puhelin) {
        this._nimi = _nimi;
        this.syntymavuosi = _syntymavuosi; 
        this._osoite = _osoite;
        this._puhelin = _puhelin;
        this._arvosanat = [];
    }

    get nimi() {
        return this._nimi;
    }

    set nimi(nimi) {
        this._nimi = nimi;
    }

    get syntymavuosi() {
        return this._syntymavuosi.getFullYear();
    }

    set syntymavuosi(vuosi) {
        this._syntymavuosi = new Date(vuosi, 0, 1); 
    }

    get osoite() {
        return this._osoite;
    }

    set osoite(osoite) {
        this._osoite = osoite;
    }

    get puhelin() {
        return this._puhelin;
    }

    set puhelin(puhelin) {
        this._puhelin = puhelin;
    }

    get HyvaOppilas() {
        return this._arvosanat.some(a => a._arvosana >= 5);
    }

    get KurssitLapi() {
        return this._arvosanat.every(a => a._arvosana >= 1);
    }

    MuutaAsteikko() {
        this._arvosanat = this._arvosanat.map(arvosana => {
            if (arvosana._arvosana == 1 || arvosana._arvosana == 2) {
                arvosana._arvosana = 'I';
            } else if (arvosana._arvosana == 3 || arvosana._arvosana == 4) {
                arvosana._arvosana = 'II';
            } else if (arvosana._arvosana == 5 || arvosana._arvosana == 6) {
                arvosana._arvosana = 'III';
            } else if (arvosana._arvosana == 7 || arvosana._arvosana == 8) {
                arvosana._arvosana = 'IV';
            } else if (arvosana._arvosana == 9 || arvosana._arvosana == 10) {
                arvosana._arvosana = 'V';
            } else {
                throw new Error("Arvosana ei ole kelvollinen");
            }
            return arvosana;
        });
    
        return this._arvosanat.map(a => a._arvosana);
    }

    tulosta() {
        return `${this._nimi},${this._syntymavuosi.getFullYear()},${this._osoite},${this._puhelin}`;
    }

    laskeIka() {
        const thisYear = new Date().getFullYear();
        return thisYear - this._syntymavuosi.getFullYear();
    }

    lisaaArvosana(arvosana) {
        if (arvosana._arvosana >= 0 && arvosana._arvosana <= 10) {
            this._arvosanat.push(arvosana);
        }
    }

    printArvosana() {
        return this._arvosanat.map(a => {
            const pvm = a._suorituspvm;
            const pvmStr = `${String(pvm.getDate()).padStart(2, '0')}.${String(pvm.getMonth() + 1).padStart(2, '0')}.${pvm.getFullYear()}`;
            return `${a._oppiaine},${a._arvosana},${pvmStr}`;
        }).join('.');
    }
}

const oppilas1 = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

console.log(oppilas1.tulosta()); 
console.log("Ikä:", oppilas1.laskeIka()); 


class Arvosana {
    constructor(oppiaine, arvosana, suorituspvm) {
        this._oppiaine = oppiaine;
        this._arvosana = parseInt(arvosana);
        this._suorituspvm = suorituspvm;
    }
}


// Tehtävä 27
function Oppilas_27(nimi, syntymavuosi, osoite, puhelin) {
    const oppilas = {
        _nimi: nimi,
        _syntymavuosi: new Date(syntymavuosi, 0, 1),
        _osoite: osoite,
        _puhelin: puhelin,

        tulosta() {
            return `${this._nimi},${this._syntymavuosi.getFullYear()},${this._osoite},${this._puhelin}`;
        },

        laskeIka() {
            const thisYear = new Date().getFullYear();
            return thisYear - this._syntymavuosi.getFullYear();
        }
    };
    return oppilas;
}


//Tehtävä 30
function varasto() {
    let laskuri = 0;

    function Lisaa(n) {
        laskuri += n;
    }

    function Tyhjenna() {
        laskuri = 0;
    }

    function Saldo() {
        return laskuri;
    }

    return {
        add: Lisaa,
        clear: Tyhjenna,
        saldo: Saldo
    };
}

module.exports = {
    Oppilas,
    Oppilas_27,
    Arvosana,
    varasto
};