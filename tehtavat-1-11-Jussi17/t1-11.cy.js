// Aja testi komentorivillä ao. komennolla (siinä hakemistossa missä on t1-11.test.js tiedosto)
// npx cypress run -r ./CypressReporter.js -s ./t1-11.test.js -q

// korjattu
// npx cypress run -r ./CypressReporter.cy.js -s ./t1-11.cy.js -q  

let testFolder = "./";

describe('Tehtävä 1', () => {

    let testfile = testFolder + "teht1.html"; 

    it('Tehtävä 1: tarkistetaan 1. rivi', () => {
        cy.visit(testfile);
        cy.get("table").get("tr").eq(0).find("th").eq(0).should('contain', "Henkilöstö");
        cy.get("table").get("tr").eq(0).find("th").eq(1).should('contain', "Koulutus");
    })
    it('Tehtävä 1: tarkistetaan 2. rivi', () => {
        cy.visit(testfile);
        cy.get("table").get("tr").eq(1).find("th").eq(0).should('contain', "Muu");
        cy.get("table").get("tr").eq(1).find("th").eq(1).should('contain', "Ammatti"); // Huomaa että tarkistetaan vain merkkijonon alku ...
        cy.get("table").get("tr").eq(1).find("th").eq(2).should('contain', "Korkeakoulu");
      })

      it('Tehtävä 1: tarkistetaan 3. rivi', () => {
        cy.visit(testfile);
        cy.get("table").get("tr").eq(2).find("th").eq(0).should('contain', "Ikä");
        cy.get("table").get("tr").eq(2).find("th").eq(1).should('contain', "30");
        cy.get("table").get("tr").eq(2).find("td").eq(0).find("a").should('have.attr', "href");
        cy.get("table").get("tr").eq(2).find("td").eq(1).find("a").should('have.attr', "href");
        cy.get("table").get("tr").eq(2).find("td").eq(2).find("a").should('have.attr', "href");
      })

      it('Tehtävä 1: tarkistetaan 4. rivi', () => {
        cy.visit(testfile);
        cy.get("table").find("tr").eq(3).find("th").eq(0).should('contain', "50");
        cy.get("table").find("tr").eq(3).find("td").eq(0).find("ol>li").should('contain', "Yksi");
        cy.get("table").find("tr").eq(3).find("td").eq(1).find("ol>li").should('contain', "Omena");
        cy.get("table").find("tr").eq(3).find("td").eq(2).find("ol>li").should('contain', "BMW");
      })

      it('Tehtävä 1: tarkistetaan 5. rivi', () => {
        cy.visit(testfile);
        cy.get("table").find("tr").eq(4).find("th").eq(0).should('contain', "50");
        cy.get("table").find("tr").eq(4).find("td").eq(0).should('contain', "Javascript").should("have.css", "font-size", "30px", "font-style", "italic");
        cy.get("table").find("tr").eq(4).find("td").eq(1).should('contain', "rokkaa").should("have.css", "font-size", "30px", "font-style", "italic");
        cy.get("table").find("tr").eq(4).find("td").eq(2).should('contain', "selaimessa").should("have.css", "font-size", "30px", "font-style", "italic");
      })
});  

describe("Tehtävä 2", () => {
  let testfile = testFolder + "teht2.html"; 
  it("Tehtävä 2: testataan h1-elementti", () => {
   cy.visit(testfile);
   cy.get("h1").should("contain", "Tervetuloa urheilun maailmaan"); 
  })

  it("Tehtävä 2: testataan 1. sarake", () => {
    cy.visit(testfile);
    cy.get("table").get("tr").eq(0).find("td").eq(0).find("img").should('have.attr', "src", "kalpa.png");
   })

   it("Tehtävä 2: testataan 2. sarake, linkit", () => {
    cy.visit(testfile);
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").find("a").eq(0).should('have.attr', "href", "https://www.yle.fi");
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").find("a").eq(1).should('have.attr', "href", "https://www.nhl.com");
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").find("a").eq(2).should('have.attr', "href", "https://www.savonia.fi");
   })

   it("Tehtävä 2: testataan 2. sarake, linkit ilman numeroa", () => {
    cy.visit(testfile);
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("ol").find("li").should('have.css', "list-style-type", "none");
   })

   it("Tehtävä 2: testataan 2. sarake, linkin tekstit", () => {
    cy.visit(testfile);
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").find("a").eq(0).should('contain', "Yle");
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").find("a").eq(1).should('contain', "NHL");
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").find("a").eq(2).should('contain', "Savonia");
   })

   it("Tehtävä 2: testataan 2. sarake, avautuuko uuteen välilehteen", () => {
    cy.visit(testfile);
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").eq(0).find("a").should('have.attr', "target", "_blank");
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").eq(1).find("a").should('have.attr', "target", "_blank");
    cy.get("table").get("tr").eq(0).find("td").eq(1).find("li").eq(2).find("a").should('have.attr', "target", "_blank");
   })

});

describe("Tehtävä 3", () => {
    let testfile = testFolder + "/teht3.html"; 

    it("Tehtävä 3: Testataan header:t", () => {
        cy.visit(testfile);
        cy.get("header").find("h4").should("contain", "Mielenkiintoisia linkkejä");
        cy.get("header").find("p").should("contain", "Alla kuvattu tärkeimmät linkit joita tarvitset päivittäin");
    })

    it("Tehtävä 3: Testataan nav:t", () => {
      cy.visit(testfile);
      cy.get("nav").find("a").should("contain", "[TV]");
      cy.get("nav").find("a").should("contain", "[Lehdet]");
      cy.get("nav").find("a").should("contain", "[Verkkokaupat]");
      cy.get("nav").find("a").should("contain", "[Kuopion korkeakoulut]");
    })

    it("Tehtävä 3: Testataan section:t", () => {
        cy.visit(testfile);
        cy.get("section").find("h1").should("contain", "TV");
        cy.get("section").find("dl").find("dt").should("contain", "YLE");
        cy.get("section").find("dl").find("dd").should("contain", "Yleisradion kotisivu");
        cy.get("section").find("dl").find("dt").should("contain", "MTV 3");
        cy.get("section").find("dl").find("dd").should("contain", "MTV3 etusivu");

        cy.get("section").find("h1").should("contain", "Lehdet");
        cy.get("section").find("dl").find("dt").should("contain", "Iltalehti");
        cy.get("section").find("dl").find("dd").should("contain", "Iltalehden etusivu");
        cy.get("section").find("dl").find("dt").should("contain", "Helsingin Sanomat");
        cy.get("section").find("dl").find("dd").should("contain", "Helsingin Sanomien etusivu");

    })

    it("Tehtävä 3: Testataan article:t", () => {
        cy.visit(testfile);
        cy.get("article").find("h1").should("contain", "Verkkokaupat");
        cy.get("article").find("dl").find("dt").should("contain", "Verkkokauppa");
        cy.get("article").find("dl").find("dd").should("contain", "Verkkokauppa.com");
        cy.get("article").find("dl").find("dt").should("contain", "Jimm's PC-store");
        cy.get("article").find("dl").find("dd").should("contain", "Sinä hyödyt siitä mitä Jimm's tietää");

        cy.get("article").find("h1").should("contain", "Kuopion korkeakoulut");
        cy.get("article").find("dl").find("dt").should("contain", "UEF");
        cy.get("article").find("dl").find("dd").should("contain", "Itä-Suomen yliopiston sivusto");
        cy.get("article").find("dl").find("dt").should("contain", "Savonia");
        cy.get("article").find("dl").find("dd").should("contain", "Savonia-ammattikorkeakoulun sivusto");

    })
});

describe("Tehtävä 4", () => {
  let testfile = testFolder + "teht4.html"; 
  it("Tehtävä 4: testataan ulkoinen css-tiedosto", () => {
   cy.visit(testfile);
   cy.get("head").find("link").should("have.attr", "rel", "stylesheet", "type", "text/css", "href", "teht4.css"); 
  })

  it("Tehtävä 4: testataan esipuhe", () => {
    cy.visit(testfile);
    cy.get("#esipuhe").should("have.css", "text-align", "right", "text-decoration", "underline", "letter-spacing", "10px"); 
    cy.get("#esipuhe").should("have.css", "text-indent", "100px"); 
    //cy.get("#esipuhe").should("have.css", "line-height", "4.0"); 
   })

   it("Tehtävä 4: testataan uppercase", () => {
    cy.visit(testfile);
    cy.get(".uppercase").should("have.css", "font-family", "Courier", "text-transform", "uppercase"); 
   })

   it("Tehtävä 4: testataan CSS-sana", () => {
    cy.visit(testfile);
    cy.get(".uppercase").find("span").should("have.css", "color", "rgb(0, 0, 255)", "font-size", "20"); 
   })

});


describe("Tehtävä 5", () => {
  let testfile = testFolder + "teht5.html"; 

  it("Tehtävä 5: testataan otsikko", () => {
    cy.visit(testfile);
    cy.get("#otsikko").should("have.css", "white-space", "nowrap"); 
  })

  it("Tehtävä 5: testataan lista sinisellä fontilla ja oma kursori", () => {
    cy.visit(testfile);
    cy.get("#blue").should("have.css", "color", "rgb(173, 216, 230)");
    //cy.get("#blue").should("have.css", "width", "50%"); 
    cy.get("#blue").should("have.css", "cursor");
    cy.get("#blue").should("have.attr", "start", "4");
    cy.get("#blue").find("li").should("contain", "Karhu");
    cy.get("#blue").find("li").should("contain", "Koira");
    cy.get("#blue").find("li").should("contain", "Kissa");;

  })

  it("Tehtävä 5: testataan lista omalla lista item:n kuvalla", () => {
    cy.visit(testfile);
    cy.get("#lista").should("have.css", "list-style-image");
    cy.get("#lista").find("li").should("contain", "Savonia");
    cy.get("#lista").find("li").should("contain", "UEF");
    cy.get("#lista").find("li").should("contain", "Sakky");
  })
});


describe("Tehtävä 6", () => {
  let testfile = testFolder + "teht6.html";
  
  beforeEach(() => {
    //cy.task('resetCRI').visit(testfile)
    cy.visit(testfile);
  }) 
  
  it("Tehtävä 6: Testataan linkki", () => {
    //cy.visit(testfile);
    cy.get("a").should("have.css", "text-decoration-line", "none");
    cy.get("a").should("have.css", "text-transform", "uppercase");
    // Ei toimi cypress:ssä
    //cy.get("a").trigger('mouseover')
    //cy.get("a").should("have.css", "font-size", "48px");

    //cy.get("h1").should("have.css", "color", "grey")
  })


  it("Tehtävä 6: Testataan hx-elementit", () => {
    // EI voi testata Cypress:llä!    
    // cy.get("h1::first-letter").should("have.css", "font-size", "200%");
    // cy.get("h1").should("have.css", "color", "grey");

    cy.get("h1").should("contain", "Tämä on h1-elementti, jonka 1. kirjain on aina isolla ja harmaana");
    cy.get("h2").should("contain", "Tässä vielä toinen h2-elementti vastaavilla spekseillä.");
    cy.get("h3").should("contain", "Ja h3");
    cy.get("h4").should("contain", "Ja hoo nelonen");
  })

})


describe("Tehtävä 7", () => {
  let testfile = testFolder + "teht7.html";
  
  beforeEach(() => {
    cy.visit(testfile);
  }) 
  
  it("Tehtävä 7: Testataan p-elementit", () => {
    cy.get("p").should("contain", "Kappaleet ja rivien vaihdot");
    cy.get("p").should("contain", "Tämä on kappale");
  })

  it("Tehtävä 7: Testataan hr-elementti", () => {
    cy.get("hr");
  })

  it("Tehtävä 7: Testataan pre-elementti", () => {
    cy.get("pre");
    //cy.get("p").should("contain", "&nbsp;");
  })

})

describe("Tehtävä 8", () => {
  let testfile = testFolder + "teht11.html";
  
  beforeEach(() => {
    cy.visit(testfile);
  }) 
  
  it("Tehtävä 8: Testataan input-elementit (nimi ja vuosikurssi)", () => {
    cy.get("input[name='nimi']").should("have.attr", "type", "text");
    //cy.get("input[name='vuosikurssi']").should("have.attr", "type", "password");
    cy.get("input[type='password']");
    cy.contains("label", "Nimi");
    cy.contains("label", "Vuosikurssi");
  })

  it("Tehtävä 8: Testataan select-elementit", () => {
    cy.get("[name='tyyppi']");
    cy.contains("label", "Kurssin tyyppi");
    cy.get("select").find("option").contains("Lahiopetus");
    cy.get("select").find("option").contains("Lahiopetus").should("have.attr", "value", "Lahiopetus");
  })

  it("Tehtävä 8: Testataan radio-elementit", () => {
    cy.get("input[type='radio']");
    cy.get("input[type='radio']").should("have.attr", "value");
  })

  it("Tehtävä 8: Testataan checkbox-elementit", () => {
    cy.get("input[type='checkbox']");
    cy.get("input[type='checkbox']").should("have.attr", "name", "hobbies[]");
  })

  it("Tehtävä 8: Testataan painikkeet", () => {
    cy.get("input[type='submit']");
    cy.get("input[type='reset']");
  })
})

describe("Tehtävä 9", () => {
  let testfile = testFolder + "teht11.html";
  
  beforeEach(() => {
    cy.visit(testfile);
  }) 
  
  it("Tehtävä 9: Testataan table-elementit", () => {
    //cy.get("table").find("tr").find("td").contains("Oppilaitos")
    cy.get("table").find("tr").find("td").contains("Nimi")
    cy.get("table").find("tr").find("td").contains("Vuosikurssi")
    cy.get("table").find("tr").find("td").contains("Kurssin nimi")
    cy.get("table").find("tr").find("td").contains("Sukupuoli")
    cy.get("table").find("tr").find("td").contains("Harrastukset")
    cy.get("table").find("tr").find("td").contains("Oppilaitos")

  })
});

describe("Tehtävä 10", () => {
  let testfile = testFolder + "teht11.html";
  
  beforeEach(() => {
    cy.visit(testfile);
  }) 
  
  it("Tehtävä 10: Testataan kurssi-elementit", () => {
    cy.get("select[name='course[]']");
    cy.get("select[name='course[]']").should("have.attr", "multiple");
    cy.get("select[name='course[]']").get("optgroup");
  })

  it("Tehtävä 10: Testataan Oppilaitos-elementit", () => {
    cy.get("input[value='Savonia AMK']");
    cy.get("input[value='Savonia AMK']").should("have.attr", "readonly");
  })

});

describe("Tehtävä 11", () => {
  let testfile = testFolder + "teht11.html";
  
  beforeEach(() => {
    cy.visit(testfile);
  }) 
  
  it("Tehtävä 11: Testataan nappien kuvat", () => {
    cy.get("input[type='image']");
  })

});
