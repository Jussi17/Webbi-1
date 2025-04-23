let testFolder = "./";
let testfile = testFolder + "teht38_44.html";

let asiakkaat;

before(() => {
  cy.fixture("asiakkaat.json").then((asiakasdata) => {
    asiakkaat = asiakasdata;
  });
});

//ASIAKAS TABLEN id="asiakkaat", ei tainnut olla määriteltynä tehtävänannossa.
describe("Tehtävä 38: Asiakastietojen haku", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?",
      {
        fixture: "asiakkaat.json",
      }
    ).as("hakuKaikki");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?*",
      (req) => {
        // hakuehtojen tarkastus
        if (
          req.url.includes(encodeURIComponent("Customer B")) &&
          req.url.includes(encodeURIComponent("Address 2"))
        ) {
          req.reply({
            statusCode: 200,
            body: [asiakkaat.find((asiakas) => asiakas.nimi === "Customer B")],
            headers: {
              "content-type": "application/json",
            },
          });
        }
      }
    ).as("customerBhaku");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?*",
      (req) => {
        if (req.url.includes(encodeURIComponent("Customer E"))) {
          req.reply({
            statusCode: 200,
            body: [asiakkaat.find((asiakas) => asiakas.nimi === "Customer E")],
            headers: {
              "content-type": "application/json",
            },
          });
        }
      }
    ).as("customerEhaku");
  });

  it("Kaikkien asiakkaiden haku", () => {
    cy.visit(testfile);

    cy.get("#haeNappi").click();
    cy.wait("@hakuKaikki");
    cy.get("#asiakkaat tr").its("length").should("be.eq", 7);
  });

  it("Tehtävä 38: haetaan nimellä", () => {
    cy.visit(testfile);
    // Haetaan nimellä
    cy.get("#nimi").type("Customer E");
    cy.get("#haeNappi").click();

    cy.wait("@customerEhaku");

    cy.get("#asiakkaat tbody tr td").eq(0).contains("Customer E"); // Nimi
    cy.get("#asiakkaat tbody tr td").eq(1).contains("Address 5"); // Osoite
  });
  it("Asiakastietojen haku, kun ehtona nimi ja osoite", () => {
    cy.visit(testfile);
    // Syötä hakuehdot
    cy.get("#nimi").type("Customer B");
    cy.get("#osoite").type("Address 2");

    // Paina Hae-nappia
    cy.get("#haeNappi").click();
    cy.wait("@customerBhaku");
    // Tarkista, että taulukko päivittyy oikeilla tiedoilla
    cy.get("#asiakkaat tr").should("have.length", 2);
    cy.get("tbody tr").first().find("td").eq(0).should("contain", "Customer B");
    cy.get("tbody tr").first().find("td").eq(1).should("contain", "Address 2");
    cy.get("tbody tr").first().find("td").eq(2).should("contain", "00200");
    cy.get("tbody tr").first().find("td").eq(3).should("contain", "City B");
    cy.get("tbody tr").first().find("td").eq(4).should("contain", "2024-03-16");
    cy.get("tbody tr").first().find("td").eq(5).should("contain", "1");
  });
});

// Tehtävä 38

describe("Tehtävä 39: Asiakkaan haku hakuehdoilla", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/tyypit.php",
      {
        fixture: "asiakastyypit.json",
      }
    ).as("tyyppihaku");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?*",
      (req) => {
        if (
          req.url.includes(encodeURIComponent("Customer F")) &&
          req.url.includes(encodeURIComponent("Address 6")) &&
          req.url.includes("asty_avain=" + encodeURIComponent("5"))
        ) {
          req.reply({
            statusCode: 200,
            body: [asiakkaat.find((asiakas) => asiakas.nimi === "Customer F")],
            headers: {
              "content-type": "application/json",
            },
          });
        }
      }
    ).as("customerFhaku");
  });
  it("Tehtävä 39: haetaan asiakastyypillä, nimellä ja osoitteella", () => {
    cy.visit(testfile);
    cy.wait("@tyyppihaku");
    // Haetaan nimellä ja osoitteella ja tyypillä
    cy.get("#nimi").type("Customer F");
    cy.get("#osoite").type("Address 6");
    cy.get("#asty_avain").select("5");
    cy.get("#haeNappi").click();
    cy.wait("@customerFhaku");

    cy.get("#asiakkaat tbody tr td").eq(0).contains("Customer F");
    cy.get("#asiakkaat tbody tr td").eq(1).contains("Address 6");
    cy.get("#asiakkaat tbody tr td").eq(2).contains("00600");
    cy.get("#asiakkaat tbody tr td").eq(3).contains("City F");
    cy.get("#asiakkaat tbody tr td").eq(4).contains("2024-03-17");
    cy.get("#asiakkaat tbody tr td").eq(5).contains("5");
  });
});


//Eiköhän tehtävästä 41 voisi luopua? Tässä testissä jo oletuksena että haku tehdään uudestaan
//Tehtävään 40 maininta että poistonapin painalluksen jälkeen
//datan pitää päivittyä eikä poistettu objekti saa olla enää taulukossa.
// Kun testausta tehdään tähän tyyliin niin todellista vaikutusta ei kuitenkaan saada.

describe("Tehtävä 40: Asiakkaan poisto", () => {
  let requestCount = 0;

  beforeEach(() => {
    requestCount = 0;

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?*",
      (req) => {
        requestCount++;
        if (
          req.url.includes(encodeURIComponent("Customer F")) &&
          req.url.includes(encodeURIComponent("Address 6")) &&
          req.url.includes("asty_avain=" + encodeURIComponent("5")) &&
          requestCount === 1
        ) {
          req.reply({
            statusCode: 200,
            body: [asiakkaat.find((asiakas) => asiakas.nimi === "Customer F")],
            headers: {
              "content-type": "application/json",
            },
          });
        } else {
          req.reply({
            statusCode: 200,
            body: [],
            headers: {
              "content-type": "application/json",
            },
          });
        }
      }
    ).as("customerFhaku");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/poista.php?avain=20104",
      {
        statusCode: 204,
      }
    ).as("poistaAsiakas");
  });
  it("Tehtävä 40: Asiakkaan poisto", () => {
    cy.visit(testfile);

    // Haetaan nimellä ja osoitteella ja tyypillä poistettava asiakas -> pitäisi löytyä ainakin yksi
    cy.get("#nimi").type("Customer F");
    cy.get("#osoite").type("Address 6");
    cy.get("#asty_avain").select("5");
    cy.get("#haeNappi").click();
    cy.wait("@customerFhaku");

    cy.get("#asiakkaat tbody tr td").eq(0).contains("Customer F");

    cy.get("#poista_20104").click();
    cy.wait("@poistaAsiakas");
    cy.wait("@customerFhaku");

    cy.get("#asiakkaat").should("not.contain", "Customer F");
  });
});

//Tehtäviin 42 ja 43 voisi olla paikallaan pyytää tietyt id: t selkeämmin
//esim t42 "asty_avain_input" ja t43 "asty_avain_select", testit ja mallikoodi laitettu tällätavalla
// Muutettu dialogin alustus funktioon tämä select kenttä, ohjelmakoodin rivi 221
describe("Tehtävä 42: Asiakkaan lisääminen", () => {
  before(() => {
    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/tyypit.php",
      {
        fixture: "asiakastyypit.json",
      }
    ).as("tyyppihaku");

    cy.intercept(
      "POST",
      "https://codez.savonia.fi/jussi/api/asiakas/lisaa.php?*",
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            status: "success",
            message: "Customer added successfully",
          },
        });
      }
    ).as("LisaaAsiakas");
  });

  it("Tehtävä 42: Asiakkaan lisääminen", () => {
    cy.visit(testfile);
    // Avataan dialogi
    cy.get("#lisaa_asiakas").click();
    // Täytetään dialogin kentät
    cy.get("#nimi_lisays").type("Customer 22");
    cy.get("#osoite_lisays").type("Katutie");
    cy.get("#postinro_lisays").type("37500");
    cy.get("#postitmp_lisays").type("Lempäälä");
    // Syötetään asiakastyyppin id input kenttään (tehtävä 42),
    cy.get("#asty_avain_input").type("5");
    // Painetaan Tallenna-nappia
    cy.get("button").contains("Tallenna").click();

    //Muutetaan url objektiksi ja verrataan sisältöä
    cy.wait("@LisaaAsiakas").then((interception) => {
      const params = new URLSearchParams(interception.request.body);
      const bodyAsObject = {};
      params.forEach((value, key) => {
        bodyAsObject[key] = decodeURIComponent(value.replace(/\+/g, " "));
      });

      expect(bodyAsObject).to.deep.equal({
        avain: "",
        nimi: "Customer 22",
        osoite: "Katutie",
        postinro: "37500",
        postitmp: "Lempäälä",
        asty_avain: "5",
      });
    });
  });

  // Testi toteutettu siten, että dialogiin käytettävän elementin id="dialoki"
  it("Lisäyksen peruutus", () => {
    cy.visit(testfile);
    // Avataan dialogi
    cy.get("#lisaa_asiakas").click();
    cy.get("#dialoki").should("be.visible");
    cy.get("button").contains("Peruuta").click();
    cy.get("#dialoki").should("not.be.visible");
  });
});

// Joku kilke tarvitaan ettei molemmat dialogissa oleveat
// asty_avain kentät mene POST kutsulle asti. 
// Tehtävien puolella jonkinlainen ratkaisu rivillä 73
// En ainakaa usko että palvelulle on tarkoitus lähettää 2x asty_avain

// Kaippa tämä voi olla itsestään selvyys, mutta tehtävän selectin option kenttää ajatellen
// mielestäni tulisi mainita että se vaatii value kentän joka vastaa asiakastyyppien avain kenttää.
describe("Tehtävä 43: Asiakkaan lisääminen alasvetovalikosta", () => {
  before(() => {
    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/tyypit.php",
      {
        fixture: "asiakastyypit.json",
      }
    ).as("tyyppihaku");

    cy.intercept(
      "POST",
      "https://codez.savonia.fi/jussi/api/asiakas/lisaa.php?*",
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            status: "success",
            message: "Customer added successfully",
          },
        });
      }
    ).as("LisaaAsiakas");
  });

  it("Tehtävä 43: Asiakastyyppi alasvetovalikosta", () => {
    cy.visit(testfile);
    // Avataan dialogi
    cy.get("#lisaa_asiakas").click();

    cy.get("#nimi_lisays").type("Customer 22");
    cy.get("#osoite_lisays").type("Katutie");
    cy.get("#postinro_lisays").type("37500");
    cy.get("#postitmp_lisays").type("Lempäälä");


    cy.get("select[id='asty_avain_select']").select("4");
    //cy.get("select[id='asty_avain_select']").select("Joukkue asiakas");
    // Painetaan Tallenna-nappia
    cy.get("button").contains("Tallenna").click();
    // Tarkistetaan että lisäys meni läpi

    //Muutetaan lähetetty url objektiksi ja verrataan sisältöä
    cy.wait("@LisaaAsiakas").then((interception) => {
      const params = new URLSearchParams(interception.request.body);
      const bodyAsObject = {};
      params.forEach((value, key) => {
        bodyAsObject[key] = decodeURIComponent(value.replace(/\+/g, " "));
      });

      expect(bodyAsObject).to.deep.equal({
        avain: "",
        nimi: "Customer 22",
        osoite: "Katutie",
        postinro: "37500",
        postitmp: "Lempäälä",
        asty_avain: "4",
      });
    });
  });
});

// Vähän sama juttu kuin sen tehtävän 41 kanssa
describe("Tehtävä 44: Asiakkaan lisääminen, lisätty asiakas näkyy taulukossa", () => {
  before(() => {
    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/tyypit.php",
      {
        fixture: "asiakastyypit.json",
      }
    ).as("tyyppihaku");

    cy.intercept(
      "POST",
      "https://codez.savonia.fi/jussi/api/asiakas/lisaa.php?*",
      (req) => {
        expect(req.onSuccess);
        req.reply({
          statusCode: 200,
          body: {
            status: "success",
            message: "Customer added successfully",
          },
        });
      }
    ).as("LisaaAsiakas");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?*",
      (req) => {
        req.reply({ body: [] });
      }
    ).as("customerhaku");
  });

  it("Tehtävä 44: Asiakkaan lisääminen, lisätty asiakas näkyy taulukossa", () => {
    cy.visit(testfile);
    // Avataan dialogi
    cy.get("#lisaa_asiakas").click();
    cy.wait("@tyyppihaku");
    //Käytännössä dialogia ei tarvitse täyttää,
    //koska POST pyynnön laatua ei tarkasteta mitenkään.
    //Oikea palvelukin taitaa hyväksyä kaiken tyhjänä paitsi asty_avain kentän.
    //Toisin sanoen tehtävän määritelmä täyttyy kunhan
    //Tallenna napin painalluksella kutsutaan hakua

    // Täytetään dialogin kentät
    /*cy.get("#nimi_lisays").type("Customer 22");
    cy.get("#osoite_lisays").type("Katutie");
    cy.get("#postinro_lisays").type("37500");
    cy.get("#postitmp_lisays").type("Lempäälä");*/
    //Alla olevista vain toinen käyttöön
    //cy.get("select[id='asty_avain_select']").select('4');
    cy.get("#asty_avain_input").type("4");

    cy.get("button").contains("Tallenna").click();
    //Ei tarpeen testata muuta sillä, tässäkohtaa tuskin
    //hyödytään tekaistun datan asettamisesta taulukkoon
    cy.wait("@customerhaku");
  });
});

describe("Tehtävä 45: Asiakkaan tietojen muokkaaminen", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?*",
      (req) => {
        if (req.url.includes(encodeURIComponent("Customer F"))) {
          req.reply({
            statusCode: 200,
            body: [asiakkaat.find((asiakas) => asiakas.nimi === "Customer F")],
            headers: {
              "content-type": "application/json",
            },
          });
        }
      }
    ).as("customerFhaku");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/haku.php?avain=20104",
      (req) => {
        req.reply({
          statusCode: 200,
          body: [asiakkaat.find((asiakas) => asiakas.nimi === "Customer F")],
          headers: {
            "content-type": "application/json",
          },
        });
      }
    ).as("customerFhakuDialogi");

    cy.intercept(
      "GET",
      "https://codez.savonia.fi/jussi/api/asiakas/tyypit.php",
      {
        fixture: "asiakastyypit.json",
      }
    ).as("tyyppihaku");

    cy.intercept(
      "POST",
      "https://codez.savonia.fi/jussi/api/asiakas/muuta.php",
      (req) => {
        expect(req.onSuccess);
        req.reply({
          statusCode: 200,
          body: {
            status: "success",
            message: "Customer updated successfully",
          },
        });
      }
    ).as("muutaAsiakas");
  });

  it("Avaataan dialogi vanhoilla tiedoilla ja tallenetaan uusilla", () => {
    cy.visit(testfile);

    cy.get("#nimi").type("Customer F");
    cy.get("#haeNappi").click();
    cy.wait("@customerFhaku");

    cy.get("#muuta").first().click();

    cy.wait("@customerFhakuDialogi");

    // Varmistaa, että dialogi avautui ja tiedot ovat näkyvissä
    cy.get("#nimi_lisays").should("have.value", "Customer F");
    cy.get("#osoite_lisays").should("have.value", "Address 6");

    // Varmistaa, että asty alasvetovalikko sisältää oikeat vaihtoehdot ja oikea tyyppi on valittuna
    cy.get("#asty_avain_select").should("have.value", "5");
    cy.get('#asty_avain_select option:selected').should('have.text', 'ERIKOISVALINTA');


    cy.get("#osoite_lisays").clear().type("Uusi osoite");
    cy.get("#postinro_lisays").clear().type("14253");
    cy.get("#postitmp_lisays").clear().type("Uusi postiTmp");

    cy.get("button").contains("Tallenna").click();

    cy.wait("@muutaAsiakas").then((interception) => {
      const params = new URLSearchParams(interception.request.body);
      const bodyAsObject = {};
      params.forEach((value, key) => {
        bodyAsObject[key] = decodeURIComponent(value.replace(/\+/g, " "));
      });

      expect(bodyAsObject).to.deep.equal({
        avain: "20104",
        nimi: "Customer F",
        osoite: "Uusi osoite",
        postinro: "14253",
        postitmp: "Uusi postiTmp",
        asty_avain: "5",
      });
    });

    // Data ei ole muuttunut mutta testaa vielä että
    // haku tehdään automatik ja vielä samalla hakusanalla
    cy.wait('@customerFhaku')
    cy.get("#asiakkaat").should("contain", "Customer F");
  });
  
});
