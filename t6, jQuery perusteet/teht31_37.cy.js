let testFolder = "./";
let testfile = testFolder + "teht31_37.html";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

//Testien ajossa json-serverin tulee olla sammutettuna

// Tehtävässä 36 haetaan tuotetyypit aina sivun päivittyessä joten,
// näin tapahtuu myös testeissä.  
// "http://localhost:3000/tuotetyyppi", kutsuista ei tarvitse välittää ennen tehtävää 36

beforeEach(() => {
  cy.intercept("GET", "**/tuotetyyppi", {
    fixture: "tuotetyyppi.json",
  }).as("Teht36haku");
});

describe("Tehtävä 31", () => {
  it("Tehtävä 31: oikeilla syötteillä", () => {
    cy.visit(testfile);
    cy.get("#etunimi").type("Maija");
    cy.get("#osoite").type("Microkatu");

    cy.get("#tallenna").click();
    cy.get("#tulos").contains("Maija,Microkatu");
  });

  it("Tehtävä 31: tyhjillä syötteillä", () => {
    cy.visit(testfile);

    cy.get("#tallenna").click();
    cy.get("#virhe").contains(
      "Pakollisia tietoja puuttuu: Etunimi on liian lyhyt. Osoite on liian lyhyt."
    );
  });

  it("Tehtävä 31: nimi liian lyhyt", () => {
    cy.visit(testfile);

    cy.get("#etunimi").type("Ma");
    cy.get("#osoite").type("Microkatu");
    cy.get("#tallenna").click();
    cy.get("#virhe").contains(
      "Pakollisia tietoja puuttuu: Etunimi on liian lyhyt."
    );
  });

  it("Tehtävä 31: osoite liian lyhyt", () => {
    cy.visit(testfile);

    cy.get("#etunimi").type("Maija");
    cy.get("#osoite").type("Mi");
    cy.get("#tallenna").click();
    cy.get("#virhe").contains(
      "Pakollisia tietoja puuttuu: Osoite on liian lyhyt."
    );
  });
});

describe("Tehtävä 31a", () => {
  it("Tehtävä 31a: tyhjillä syötteillä, virhe näkyvissä 3s", () => {
    cy.visit(testfile);

    cy.get("#lisaa").click();
    cy.get("#error").contains(
      "Pakollisia tietoja puuttuu: Etunimi on liian lyhyt. Osoite on liian lyhyt."
    );
    cy.get("#error").should("be.visible");

    // Odotetaan 3s
    cy.wait(4000);
    cy.get("#virhe").should("not.be.visible");
  });

  it("Tehtävä 31a: tyhjillä syötteillä, tietoja ei saa lisätä alasvetovalikkoon", () => {
    cy.visit(testfile);

    cy.get("#lisaa").click();
    cy.get("#results").find("option").should("have.length", 0);
  });

  it("Tehtävä 31a: oikeilla syötteillä, tiedot lisätään alasvetovalikkoon", () => {
    cy.visit(testfile);

    cy.get("#etunimi").type("Maija");
    cy.get("#osoite").type("Microkatu");
    cy.get("#lisaa").click();
    cy.get("#results").find("option").should("have.length", 1);
  });
  //Optionit nollaantuvat it lohkon jälkeen?
  it("Tehtävä 31a: oikeilla syötteillä, toinen syöte, tiedot lisätään alasvetovalikkoon", () => {
    cy.visit(testfile);

    cy.get("#etunimi").type("Maija");
    cy.get("#osoite").type("Microkatu");
    cy.get("#lisaa").click();
    cy.get("#etunimi").type("Liisa");
    cy.get("#osoite").type("Opistotie 2");
    cy.get("#lisaa").click();
    cy.get("#results").find("option").should("have.length", 2);
  });
});

describe("Tehtävä 32", () => {
  it("Tehtävä 32: Tarkistetaan että valittu pvm-kentässä on oikea arvo", () => {
    cy.visit(testfile);
    cy.get("#pvm_result").contains("Pvm:ää ei ole valittu");
    cy.get("#pvm_result").should("have.css", "color", "rgb(255, 0, 0)");
  });

  it("Tehtävä 32: Valitaan pvm sallitulta väliltä", () => {
    cy.visit(testfile);
    let pvm = "13.10.2020";
    cy.get("#pvm").type(pvm);
    cy.get("#pvm").click();
    cy.wait(500);
    //cy.get("[data-month='9']").click();
    cy.get(".ui-datepicker-days-cell-over > .ui-state-default").click();

    cy.get("#pvm_result").contains(pvm);
  });

  it("Tehtävä 32: Valitaan pvm joka on sallitun pvm:n jälkeen", () => {
    cy.visit(testfile);
    let pvm = "13.10.2021";
    cy.get("#pvm").type(pvm);
    cy.get("#pvm").click();
    cy.wait(500);
    //cy.get("[data-month='9']").click();
    cy.get(".ui-datepicker-days-cell-over > .ui-state-default").click();

    cy.get("#pvm_result").contains("31.12.2020");
  });

  it("Tehtävä 32: Testataan suomalainen formaatti", () => {
    cy.visit(testfile);

    // Klikataan komponenttia -> avautuu automatic joulukuulle 2020
    cy.get("#pvm").click();
    cy.wait(500);
    cy.get(".ui-datepicker-title").contains("Joulukuu");
  });
});

describe("Tehtävä 33: Autocomplete komponentti", () => {
  beforeEach(() => {
    cy.intercept("http://codez.savonia.fi/jussi/api/json_data.php?term*").as(
      "haeKaupunki"
    );
  });

  it("Tehtävä 33: Autocomplete komponentti", () => {
    cy.visit(testfile);
    cy.get("#autoc").click();
    cy.get("#autoc").type("Kuo");
    cy.wait("@haeKaupunki");
    cy.get("#autoc").type("{downarrow}");
    cy.contains("Kuopio");
  });
});

describe("Tehtävä 34: jQuery dialog", () => {
  let nimi = "Maija";
  let tunnus = "s1234";
  it("Tehtävä 34: jQuery dialog, p-elementti piilossa, data oikein", () => {
    cy.visit(testfile);

    cy.get("#d_content").should("not.be.visible");
    cy.get("#d_content").contains("Tämä oli alunperin piilossa");
    // Avataan dialogi
    cy.get("#rekisteroidy").click();

    // Onko otsikko oikein?
    cy.get("div").contains("Rekister");
    cy.get("#d_nimi").type(nimi);
    cy.get("#d_tunnus").type(tunnus);

    cy.get(".ui-dialog-buttonset > button").contains("Tallenna").click();
    cy.get("#d_results").contains(nimi + ", " + tunnus);
    cy.get("#d_content").should("be.visible");
  });

  it("Tehtävä 34: jQuery dialog, data väärin", () => {
    cy.visit(testfile);

    // Avataan dialogi
    cy.get("#rekisteroidy").click();

    // Onko otsikko oikein?
    cy.get("#d_nimi").type("X");
    cy.get("#d_tunnus").type(tunnus);

    cy.get(".ui-dialog-buttonset > button").contains("Tallenna").click();
    cy.get("#d_error").contains("Data väärin");
    cy.get("#d_content").should("not.be.visible");
    // Onko dialogi auki?
    cy.get("div").contains("Rekister");

    cy.get("#d_nimi").clear();
    cy.get("#d_nimi").type(nimi);
    cy.get("#d_tunnus").clear();
    cy.get("#d_tunnus").type("X");

    cy.get(".ui-dialog-buttonset > button").contains("Tallenna").click();
    cy.get("#d_error").contains("Data väärin");
    cy.get("#d_content").should("not.be.visible");
    // Onko dialogi auki?
    cy.get("div").contains("Rekister");
  });
});

describe("Tehtävä 35: REST apin kutsuminen", () => {
  beforeEach("Tehtävä 35 mock", () => {
    cy.intercept("GET", "**/tuotetyyppi", {
      fixture: "tuotetyyppi.json",
    }).as("tyyppihaku");
    cy.intercept("GET", "**/tuote", {
      fixture: "tuote.json",
    }).as("tuotehaku");
  });

  it("Tehtävä 35: Haetaan tuotetyypit", () => {
    cy.visit(testfile);

    cy.get("#hae_tyypit").click();
    cy.wait("@tyyppihaku");

    //Tarkastetaan, että alasvetovalikossa oikea kenttä näytillä
    cy.get("#tuotetyypit").within(() => {
      // Value = tuotetyypin id
      cy.get("option")
        .eq(1)
        .should("have.value", "1")
        .and("have.text", "TESTmaitotuotteet");

      cy.get("option")
        .eq(2)
        .should("have.value", "2")
        .and("have.text", "juustot");

      cy.get("option")
        .eq(3)
        .should("have.value", "3")
        .and("have.text", "hedelmät");
    });

    cy.get("#tuotetyypit option").its("length").should("be.gte", 10);
  });

  it("Tehtävä 35: Haetaan tuotteet", () => {
    cy.visit(testfile);

    cy.get("#hae_data").click();
    cy.wait("@tuotehaku");
    //cy.get("#tuotteet").find("tr").its('length').should('be.gt', 10)
    cy.get("#tuotteet tr").its("length").should("be.gte", 10);
  });
});
let tuotteet, tyypit;

describe("Tehtävä 36: Tuotteiden haku hakuehtojen mukaan", () => {
  beforeEach(() => {
    cy.fixture("tuote.json").then((tuotedata) => {
      tuotteet = tuotedata;
    });

    
  });


  it("Tehtävä 36: Haetaan tuotteet nimen mukaan", () => {
    cy.visit(testfile);

    cy.get("#tuotetyypit_he").within(() => {
      // Tarkista, että tyhjä valinta on olemassa
      cy.get("#option")
        .first()
        .should("have.value", "-1")
        .and("have.text", "Ei valintaa");
    });

    cy.intercept("GET", "**/tuote?nimi*", (req) => {
      expect(req.url).to.include("nimi=Tomaatti-linssikeitto");

      req.reply({
        statusCode: 200,
        body: [
          tuotteet.find((tuote) => tuote.nimi === "Tomaatti-linssikeitto"),
        ],
        headers: { "Content-Type": "application/json" },
      });
    }).as("getTuoteNimi");

    cy.get("#nimi_he").type("Tomaatti-linssikeitto");

    cy.get("#hae").click();
    cy.wait("@getTuoteNimi");

    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
    cy.get("#tuotteet tr").its("length").should("be.eq", 2); // Varsinainen data + otsikot
  });

  it("Tehtävä 36: Haetaan tuotteet valmistajan mukaan", () => {
    cy.visit(testfile);

    cy.intercept("GET", "**/tuote?valmistaja*", (req) => {
      expect(req.url).to.include("valmistaja=Rainbow");
      req.reply({
        statusCode: 200,
        body: tuotteet.filter((tuote) => tuote.valmistaja === "Rainbow"),
        headers: { "Content-Type": "application/json" },
      });
    }).as("getTuoteValmistaja");

    cy.get("#valmistaja_he").type("Rainbow");
    cy.get("#hae").click();

    cy.wait("@getTuoteValmistaja");
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
    cy.get("#tuotteet tr").its("length").should("be.eq", 3); // Varsinainen data + otsikot
  });

  it("Tehtävä 36: Haetaan tuotteet tuotetyypin mukaan", () => {
    cy.visit(testfile);

    cy.intercept("GET", "**/tuote?tyyppi_id*", (req) => {
      expect(req.url).to.include("tyyppi_id=9");
      req.reply({
        statusCode: 200,
        body: tuotteet.filter((tuote) => tuote.tyyppi_id === 9),
        headers: { "Content-Type": "application/json" },
      });
    }).as("getTuoteTyyppi");

    // Mausteet
    cy.get("#tuotetyypit_he").select("9");
    cy.get("#hae").click();

    cy.wait("@getTuoteTyyppi");
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 3) // Varsinainen data + otsikot
    cy.get("#tuotteet tr").its("length").should("be.eq", 3); // Varsinainen data + otsikot
  });

  it("Tehtävä 36: Haetaan tuotteet nimen, valmistajan ja tuotetyypin mukaan", () => {
    cy.visit(testfile);

    cy.intercept("GET", "**/tuote?nimi*&valmistaja*&tyyppi_id*", (req) => {
      expect(req.url).to.include(
        "nimi=Tomaattimurska&valmistaja=Mutti&tyyppi_id=6"
      );

      req.reply({
        statusCode: 200,
        body: tuotteet.filter((tuote) => tuote.nimi === "Tomaattimurska"),
        headers: { "Content-Type": "application/json" },
      });
    }).as("getTuoteByNimiValmistjaId");

    cy.get("#nimi_he").type("Tomaattimurska");
    cy.get("#valmistaja_he").type("Mutti");
    cy.get("#tuotetyypit_he").select("6");
    cy.get("#hae").click();

    cy.wait("@getTuoteByNimiValmistjaId");
    //cy.get("#tuotteet").find("tr").its('length').should('be.eq', 2) // Varsinainen data + otsikot
    cy.get("#tuotteet tr").its("length").should("be.eq", 2); // Varsinainen data + otsikot
  });
});

//Tehty ohjelmakoodiin muutoksia, ainakin poistonapin luontiin
//button id='poista_" + json_obj.id
// Tämä taisi kyllä olla määriteltynä tehtävänannossa

describe("Tehtävä 37: Tuotteen poisto", () => {
  let requestCount = 0;
  beforeEach(() => {
    requestCount = 0;
    cy.intercept("GET", "**/tuote", (req) => {
      requestCount++;
      if (requestCount === 1) {
        req.reply({ fixture: "tuote.json" });
      } else {
        req.reply({ fixture: "poistonjalkeen.json" });
      }
    }).as("haeTuotteet");
    cy.intercept("DELETE", "**/tuote/14", {statusCode: 204,}).as("poistaTuote");
  });
  it("Poistaa tuotteen ja varmistaa, että se ei ole enää listalla", () => {
    cy.visit(testfile);
    cy.get("#hae").click();
    cy.wait("@haeTuotteet");
    // Tarkastetaan onko poistettava tuote listalla
    cy.get("#tuotteet").should("contain", "Tomaattimurska");
    cy.get("#tuotteet").find("tr").its("length").should("be.eq", 11);
    cy.get('#poista_14').click();
    cy.wait("@poistaTuote");
    cy.wait("@haeTuotteet");
    
    cy.get("#tuotteet").should("not.contain", "Tomaattimurska");
    cy.get("#tuotteet").find("tr").its("length").should("be.eq", 10);
  });
});

