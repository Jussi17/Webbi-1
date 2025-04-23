// npx cypress run -r ./CypressReporter.cy.js -s ./teht26_30.cy.js -q
// npx cypress open


//const { Oppilas, Oppilas_27, Arvosana, varasto } = require('./teht26_30');
// Ainakin nykyään CommonJS vieti ja ES6 tuonti taitaa toimia
import { Oppilas, Oppilas_27, Arvosana, varasto } from './teht26_30'


// Tehtävä 26
describe("teht26", () => {
    it('teht26: Oppilas-luokka (class declaration), perustiedot', () => {
        const oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        expect(oppilas.nimi).to.equal("Maija");
        expect(oppilas.osoite).to.equal("Opistotie 2");
    });

    it('teht26: Oppilas-luokka (class declaration), syntymävuosi', () => {
        const oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        // Huom! Testataan, että syntymävuosi on tallennettu Date-muodossa
        expect(oppilas._syntymavuosi).to.deep.equal(new Date(1990, 0, 1));
        expect(oppilas.syntymavuosi).to.equal(1990);
        expect(oppilas.puhelin).to.equal("044-785 5512");

        const thisYear = new Date().getFullYear();
        expect(oppilas.laskeIka()).to.equal(thisYear - 1990);
    });

    it('teht26: Oppilas-luokka (class declaration), muutetaan tietoja', () => {
        const oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        oppilas.nimi ="Kalle";
        oppilas.syntymavuosi = 1993;
        oppilas.osoite = "Microkatu 9";
        oppilas.puhelin = "017-175200";

        expect(oppilas.tulosta()).to.equal("Kalle,1993,Microkatu 9,017-175200");

        const thisYear = new Date().getFullYear();
        expect(oppilas.laskeIka()).to.equal(thisYear - 1993);
    });
});

// Tehtävä 27
describe("teht27", () => {
    it('teht27: Oppilas-luokka (functional class pattern), perustiedot', () => {
        const oppilas = new Oppilas_27("Maija", 1990, "Opistotie 2", "044-785 5512");

        expect(oppilas._nimi).to.equal("Maija");
        expect(oppilas._osoite).to.equal("Opistotie 2");
    });

    it('teht27: Oppilas-luokka (functional class pattern), syntymäaika', () => {
        const oppilas = new Oppilas_27("Maija", 1990, "Opistotie 2", "044-785 5512");

        // Huom! Testataan, että syntymävuosi on tallennettu Date-muodossa
        expect(oppilas._syntymavuosi).to.deep.equal(new Date(1990, 0, 1));
        expect(oppilas._puhelin).to.equal("044-785 5512");

        const thisYear = new Date().getFullYear();
        expect(oppilas.laskeIka()).to.equal(thisYear - 1990);
    });

    it('teht27: Oppilas-luokka (functional class pattern), muutetaan tietoja', () => {
        const oppilas = new Oppilas_27("Maija", 1990, "Opistotie 2", "044-785 5512");

        oppilas._nimi ="Kalle";
        oppilas._syntymavuosi = new Date(1993, 0, 1);
        oppilas._osoite = "Microkatu 9";
        oppilas._puhelin = "017-175200";

        expect(oppilas.tulosta()).to.equal("Kalle,1993,Microkatu 9,017-175200");

        const thisYear = new Date().getFullYear();
        expect(oppilas.laskeIka()).to.equal(thisYear - 1993);
    });
});


// Tehtävä 28
describe("teht28", () => {
    it('teht28: Arvosana-luokka, perustiedot', () => {
        const oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        oppilas.lisaaArvosana(new Arvosana("Fysiikka", "8", new Date(2020, 2, 4)));
        oppilas.lisaaArvosana(new Arvosana("Matematiikka", "2", new Date(2020, 3, 22)));
        oppilas.lisaaArvosana(new Arvosana("Tietotekniikka", "5", new Date(2020, 10, 5)));

        const result = oppilas.printArvosana();
        expect(result).to.equal("Fysiikka,8,04.03.2020.Matematiikka,2,22.04.2020.Tietotekniikka,5,05.11.2020");
    });

    it('teht28: Arvosana-luokka, tarkistetaan taulukko', () => {
        let oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        oppilas.lisaaArvosana(new Arvosana("Fysiikka", "8", new Date(2020, 2, 4)));
        oppilas.lisaaArvosana(new Arvosana("Matematiikka", "2", new Date(2020, 3, 22)));
        oppilas.lisaaArvosana(new Arvosana("Tietotekniikka", "5", new Date(2020, 10, 5)));
        console.log("OPP",oppilas)

        cy.wrap(oppilas._arvosanat).should('have.length', 3);

        cy.wrap(oppilas._arvosanat[0]).should('deep.equal', {
            _oppiaine: "Fysiikka",
            _arvosana: 8,
            _suorituspvm: new Date(2020, 2, 4)
        });

        cy.wrap(oppilas._arvosanat[1]).should('deep.equal', {
            _oppiaine: "Matematiikka",
            _arvosana: 2,
            _suorituspvm: new Date(2020, 3, 22)
        });

        cy.wrap(oppilas._arvosanat[2]).should('deep.equal', {
            _oppiaine: "Tietotekniikka",
            _arvosana: 5,
            _suorituspvm: new Date(2020, 10, 5)
        });
    });
});


// Tehtävä 29
describe("teht29", () => {

    it('teht29: Arvosanat-muunnoksia, HyvaOppilas', () => {
        let oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        oppilas.lisaaArvosana(new Arvosana("Fysiikka", "8", new Date(2020, 2, 4)));
        oppilas.lisaaArvosana(new Arvosana("Matematiikka", "2", new Date(2020, 3, 22)));

        let hyvaOppilas = oppilas.HyvaOppilas;

        expect(hyvaOppilas).to.be.true;
    });

    it('teht29: Arvosanat-muunnoksia, KurssitLapi', () => {
        let oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");

        oppilas.lisaaArvosana(new Arvosana("Fysiikka", "8", new Date(2020, 2, 4)));
        oppilas.lisaaArvosana(new Arvosana("Matematiikka", "2", new Date(2020, 3, 22)));

        let kurssiLapi = oppilas.KurssitLapi;

        expect(kurssiLapi).to.be.true;
    });

    it('teht29: Arvosanat-muunnoksia, MuutaAsteikko', () => {
        let oppilas = new Oppilas("Maija", 1990, "Opistotie 2", "044-785 5512");
        let t = oppilas.tulosta();
        let age = oppilas.laskeIka();

        oppilas.lisaaArvosana(new Arvosana("Fysiikka", "8", new Date(2020, 2, 4)));
        oppilas.lisaaArvosana(new Arvosana("Matematiikka", "2", new Date(2020, 3, 22)));

        let uusiAsteikko = oppilas.MuutaAsteikko();
        let oikeaAsteikko = ["IV", "I"]

        expect(uusiAsteikko).to.deep.equal(oikeaAsteikko);
    });

});
// Tehtävä 30
describe("teht30", () => {

    it('teht30: Closure', () => {
        let v = varasto();
        v.add(10);
        v.add(-3);
        v.add(2);
        let correcValue = 9;
        let result = v.saldo();
        expect(result).to.equal(correcValue);

        v.clear();
        v.add(3);
        v.add(-5);
        v.add(10);
        correcValue = 8;
        result = v.saldo();

        expect(result).to.equal(correcValue);
    });
});
