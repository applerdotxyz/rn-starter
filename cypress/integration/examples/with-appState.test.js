describe("with-appState", () => {
    it("Config test", () => {
      // cy.visit("http://localhost:19006/");
      cy.visit("http://localhost:8080/");

      cy.contains("Examples");
      cy.get("select").select("with-appstate");
      cy.contains("Home *** leftNavHeader");
      cy.contains("Home *** leftNavBody");
      cy.contains("`RandomPic *** bodyHeader`");
      cy.contains("Home *** bodyHeader1");
      cy.contains("Home *** bodyContent");
      cy.contains("Home *** bodyContent1");
      cy.contains("Home *** bodyContent2");
      cy.contains("footer");
      // cy.matchImageSnapshot('initialLayout');
      cy.screenshot();
      cy.get(`[data-testid="leftNavHeader-btn-one"]`).contains("ACT1").click();
      // cy.matchImageSnapshot('layoutChanged');
      cy.contains("About *** bodyHeader");
      cy.contains("`RandomPic *** bodyContent`");
      cy.screenshot();



    });
  });
  