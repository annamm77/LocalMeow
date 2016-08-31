require("sails-test-helper");

describe(TEST_NAME, function() {
  describe("CREATE method", function() {
    it("should be successful", function(done) {
      request.get("/")
        .expect(200)
        .end(done);
    });
  });
});
