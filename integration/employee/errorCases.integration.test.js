const createEmployeeMissingParamsData = require("../mockData/createEmployeeBadRequest.missingParams.mock.json");
const createEmployeeInvalidEmail = require("../mockData/createEmployeeBadRequest.emailFormat.mock.json");
const updateEmployeeInvalidPhoneEmail = require("../mockData/updateEmployeeBadRequest.emailAndPayFormat.mock.json");
const updateEmployeeData = require("../mockData/updateEmployeePartialRequestBody.mock.json");

const employeeErrorCasesIntegrationTestSuite = (httpService) => {
  const EMPLOYEE_ID_NOT_FOUND = 9999999;
  const EMPLOYEE_ID_INVALID_FORMAT = "INVALID_ID";
  describe("Employee API failing requests", () => {
    it("should fail when attempting to create an employee without sending a request body", async () => {
      try {
        await httpService.sendPostRequest("/employee", null);
        expect(true).toEqual(false); // fail test if API call does not throw error
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("should fail when attempting to create an employee while missing required fields", async () => {
      try {
        await httpService.sendPostRequest(
          "/employee",
          createEmployeeMissingParamsData,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("should fail when attempting to create an employee with an invalid email", async () => {
      try {
        await httpService.sendPostRequest(
          "/employee",
          createEmployeeInvalidEmail,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("should fail when attempting to update an employee with an invalid id", async () => {
      try {
        await httpService.sendPatchRequest(
          `/employee/${EMPLOYEE_ID_INVALID_FORMAT}`,
          {},
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("should fail when attempting to update an employee with an invalid email and phone number", async () => {
      try {
        await httpService.sendPatchRequest(
          `/employee/1`,
          updateEmployeeInvalidPhoneEmail,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("Should get a 404 error when attempting to update employee", async () => {
      try {
        await httpService.sendPatchRequest(
          `/employee/${EMPLOYEE_ID_NOT_FOUND}`,
          updateEmployeeData,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(404);
        expect(error.response.data.error).toEqual("Not Found");
      }
    });
    it("should fail when attempting to get an employee with an invalid id", async () => {
      try {
        await httpService.sendGetRequest(
          `/employee/${EMPLOYEE_ID_INVALID_FORMAT}`,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("should get a 404 error when fetching employee with nonexistent id", async () => {
      try {
        await httpService.sendGetRequest(`/employee/${EMPLOYEE_ID_NOT_FOUND}`);
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(404);
        expect(error.response.data.error).toEqual("Not Found");
      }
    });
    it("should fail when attempting to delete an employee with an invalid id", async () => {
      try {
        await httpService.sendDeleteRequest(
          `/employee/${EMPLOYEE_ID_INVALID_FORMAT}`,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(400);
        expect(error.response.data.error).toEqual("Bad Request");
      }
    });
    it("should get a 404 error when attempting to delete an employee with a nonexistent id", async () => {
      try {
        await httpService.sendDeleteRequest(
          `/employee/${EMPLOYEE_ID_NOT_FOUND}`,
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.response).toBeDefined();
        expect(error.response).toBeTruthy();
        expect(error.response.status).toEqual(404);
        expect(error.response.data.error).toEqual("Not Found");
      }
    });
  });
};

module.exports = {
  employeeErrorCasesIntegrationTestSuite,
};
