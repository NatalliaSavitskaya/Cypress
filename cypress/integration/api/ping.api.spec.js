describe('RestfulBooker.HealthCheck: Given No preconditions', { testIsolation: false }, () => {
  context('RestfulBooker.HealthCheck.GET: When ping server', () => {
    it('Then response is get', () => {
      cy.healthCheck_GET({ failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.eq('Created');
      });
    });
  });
});
