// selaimessa npx cypress open
// Komentorivillä npx cypress run -r ./CypressReporter.cy.js -s ./t18-21.cy.js -q


let testFolder = "./";

import { teht18, teht19, teht20, teht21 } from "./tehtavat";
//Tehtävä 18
describe("Tehtävä 18", () => {
  it("Laske pinta-ala oikealla säteellä", () => {
    const result = teht18(5);
    expect(result).to.be.closeTo(78.54, 0.01);
  });

  it("Laske pinta-ala väärällä säteellä", () => {
    const result = teht18(-5);
    expect(result).to.equal(0);
  });
});
// Tehtävä 19
describe("teht19", () => {
  let t = [100, 2, -8, -8, 23, 201, 123, 0, 5, 88];
  it("teht19: laske min/max/avg/sum oikeilla arvoilla", () => {
    let result = teht19(t);
    expect(result).to.deep.equal({ sum: 526, min: -8, max: 201, avg: 52.6 });
  });
  let x = [];
  it("teht19: laske min/max/avg/sum tyhjällä taulukolla", () => {
    expect(teht19(x)).to.deep.equal({ min: 0, max: 0, avg: 0, sum: 0 });
  });
});

// Tehtävä 20
describe("teht20", () => {
  it("teht20: laske potenssiin korotus oikeilla arvoilla", () => {
    let expected = [1, 2, 9],
      r = [];
    teht20(3, r);

    expect(r).to.deep.equal(expected);
  });

  it("teht20: laske potenssiin korotus laskurilla 0", () => {
    let expected = [],
      r = [];
    teht20(0, r);

    expect(r).to.deep.equal(expected);
  });
});

// Tehtävä 21
describe("teht21", () => {
  it("teht21: tarkista pvm oikealla syötteellä", () => {
    expect(teht21("22.09.2020")).to.deep.equal(true);
    expect(teht21("02.09.2020")).to.deep.equal(true);
    expect(teht21("01.01.2019")).to.deep.equal(true);
  });

  it("teht21: tarkista pvm väärällä syötteellä", () => {
    expect(teht21("xx")).to.deep.equal(false);
    expect(teht21("2.09.2020")).to.deep.equal(false);
    expect(teht21("1.1.2019")).to.deep.equal(false);
    expect(teht21("41.1.2019")).to.deep.equal(false);
    expect(teht21("1.13.2019")).to.deep.equal(false);
    expect(teht21("11.11.4019")).to.deep.equal(false);
    expect(teht21("xx.xx.2019")).to.deep.equal(false);
    expect(teht21("xx.xx.xxxx")).to.deep.equal(false);
    expect(teht21("")).to.deep.equal(false);
  });
});
