// JS-koodi, joka käsittelee jollain tavalla DOM-puuta, voidaan testata esim. cypress:n avulla (https://www.cypress.io/)

// 0) Varmista ensin, että sinulla on node_modules-hakemisto ja package.json-tiedosto olemassa hakemistossa, jossa annat ao. komennon.
//    Jos EI ole, anna komento npm init (vastaa kaikkiin kysymyksiin painamalla Enter:iä)
// 1) Asenna cypress: npm install cypress --save-dev
// 2) Kokeile, että cypress lähtee käyntiin: npx cypress open
// 3) Kirjoita testit hakemistoon cypress\integration (cypress on alihakemisto siinä hakemistossa, jossa annoit npm install komennon)
// 4) npx cypress open avaa selaimen, jossa voit ajaa testit sekä tarkastella miksi joku testi ei mennyt läpi

// Tässä filussa kuvataan KAIKKI cypress:llä ajettavat testit

// Ao. kommennolla voit ajaa testit ilman että cypress avaa selainta
// npx cypress run -r ./CypressReporter.cy.js -s ./teht22-25.cy.js -q

let testFolder = "./";
let testfile = testFolder + "teht21.html";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});


describe("Tehtävä 21", () => {
  it("Tehtävä 21 oikealla pvm:llä", () => {
    cy.visit(testfile);
    cy.get("#pvm").type("29.01.2020");
    cy.get("#tarkista").click();
    cy.get("#tulos").contains("true");
  });

  it("Tehtävä 21 väärällä pvm:llä", () => {
    cy.visit(testfile);

    cy.get("#pvm").type("29.01");
    cy.get("#tarkista").click();
    cy.get("#tulos").contains("false");
  });
});

describe("Tehtävä 22", () => {
  it("Tehtävä 22", () => {
    cy.visit(testfile);

    // Generoidaan testiaineistoa
    // Cypress.$("#lista").append("<li>Maija</li>")
    // Cypress.$("#lista").append("<li>Tiina</li>")
    // Cypress.$("#lista").append("<li>Bertta</li>")
    // Cypress.$("#lista").append("<li>Ville</li>")
    // Cypress.$("#lista").append("<li>Matti</li>")
    // Cypress.$("#lista").append("<li>Sakke</li>")

    cy.document().then(($d) => {
      var ul = $d.getElementById("lista");
      var allItems = ul.children;
      for (var i = allItems.length - 1; i >= 0; i--) {
        allItems[i].remove();
      }

      var li = $d.createElement("li");
      li.appendChild(document.createTextNode("Maija"));
      ul.appendChild(li);
      li = $d.createElement("li");
      li.appendChild(document.createTextNode("Tiina"));
      ul.appendChild(li);
      li = $d.createElement("li");
      li.appendChild(document.createTextNode("Bertta"));
      ul.appendChild(li);
      li = $d.createElement("li");
      li.appendChild(document.createTextNode("Ville"));
      ul.appendChild(li);
      li = $d.createElement("li");
      li.appendChild(document.createTextNode("Matti"));
      ul.appendChild(li);

      cy.get("#tulosta").click();
      cy.get("#results").should("have.value", "Maija,Tiina,Bertta,Ville,Matti");
    });
  });
});

describe("Tehtävä 23", () => {
  it("Tehtävä 23", () => {
    cy.visit(testfile);

    for (let i = 0; i < 5; i++) {
      let nimi = "Maija " + i,
        osoite = "Opistotie " + i;

      cy.get("#etunimi").clear();
      cy.get("#lahiosoite").clear();

      cy.get("#etunimi").type(nimi);
      cy.get("#lahiosoite").type(osoite);
      cy.get("#lisaa").click();

      cy.get("#results_23")
        .get("tr")
        .eq(i)
        .find("td")
        .eq(0)
        .should("contain", nimi);
      cy.get("#results_23")
        .get("tr")
        .eq(i)
        .find("td")
        .eq(1)
        .should("contain", osoite);
    }
  });
});

describe("Tehtävä 24", () => {
  it("Tehtävä 24", () => {
    cy.visit(testfile);

    let nimi = "Maija",
      osoite = "Opistotie 2, 70100 Kuopio";

    cy.get("#etunimi").clear();
    cy.get("#lahiosoite").clear();
    cy.get("#lisaa_24").click();

    // Molempien kenttien taustaväri pitäis olla punainen
    cy.get("#etunimi").should("have.css", "background-color", "rgb(255, 0, 0)");
    cy.get("#lahiosoite").should(
      "have.css",
      "background-color",
      "rgb(255, 0, 0)"
    );

    cy.get("#etunimi").type(nimi);
    cy.get("#lisaa_24").click();
    // Nimen taustaväri pitäisi olla valkoinen ja osoitteen punainen
    cy.get("#etunimi").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#lahiosoite").should(
      "have.css",
      "background-color",
      "rgb(255, 0, 0)"
    );

    cy.get("#lahiosoite").type(osoite);
    cy.get("#lisaa_24").click();
    // Molempien kenttien taustaväri pitäisi olla taas valkoinen
    cy.get("#etunimi").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#lahiosoite").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );

    cy.get("#results_23")
      .get("tr")
      .eq(0)
      .find("td")
      .eq(0)
      .should("contain", nimi);
    cy.get("#results_23")
      .get("tr")
      .eq(0)
      .find("td")
      .eq(1)
      .should("contain", osoite);
  });
});

describe("Tehtävä 25", () => {
  it("Tehtävä 25", () => {
    cy.visit(testfile);

    cy.get("#link1").click();
    cy.get("#article1").should("be.visible");
    cy.get("#article2").should("not.be.visible");
    cy.get("#article3").should("not.be.visible");
    cy.get("#article4").should("not.be.visible");

    cy.get("#link2").click();
    cy.get("#article1").should("not.be.visible");
    cy.get("#article2").should("be.visible");
    cy.get("#article3").should("not.be.visible");
    cy.get("#article4").should("not.be.visible");

    cy.get("#link3").click();
    cy.get("#article1").should("not.be.visible");
    cy.get("#article2").should("not.be.visible");
    cy.get("#article3").should("be.visible");
    cy.get("#article4").should("not.be.visible");

    cy.get("#link4").click();
    cy.get("#article1").should("not.be.visible");
    cy.get("#article2").should("not.be.visible");
    cy.get("#article3").should("not.be.visible");
    cy.get("#article4").should("be.visible");
  });
});
