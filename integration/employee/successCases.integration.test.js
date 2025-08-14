const createEmployeeData = require("../mockData/createEmployeeRequestBody.mock.json");
const updateEmployeeData = require("../mockData/updateEmployeePartialRequestBody.mock.json");
const { log } = require("../../lib/logger");

const employeeSuccessCasesIntegrationTestSuite = (httpService) => {
  let EMPLOYEE_ID = 0;
  describe("Employee API successful requests", () => {
    it("Should successfully create a new employee", async () => {
      const response = await httpService.sendPostRequest(
        "/employee",
        createEmployeeData,
      );
      expect(response).toBeDefined();
      expect(response).toBeTruthy();

      expect(response.status).toEqual(201);
      expect(response.data).toBeDefined();
      expect(response.data).toBeTruthy();

      expect(response.data).toHaveProperty("firstName");
      expect(response.data).toHaveProperty("lastName");
      expect(response.data).toHaveProperty("salary");
      expect(response.data).toHaveProperty("isActive");
      expect(response.data).toHaveProperty("createdAt");
      expect(response.data).toHaveProperty("updatedAt");
      expect(response.data.createdAt).toEqual(response.data.updatedAt);

      EMPLOYEE_ID = response.data.id;
      log.info("Created Employee with id: " + EMPLOYEE_ID);
    });

    it("Should successfully get a list of employees from the api", async () => {
      const response = await httpService.sendGetRequest("/employee");
      expect(response).toBeDefined();
      expect(response).toBeTruthy();

      expect(response.status).toEqual(200);
      expect(response.data).toBeDefined();
      expect(response.data).toBeTruthy();
      expect(typeof response.data.length).toEqual("number");
      expect(response.data.length).toBeGreaterThan(0);
    });

    it("Should get a single employee by Id", async () => {
      expect(EMPLOYEE_ID).toBeTruthy();
      expect(EMPLOYEE_ID).toBeGreaterThan(0);

      log.info("Getting info for employee with id: " + EMPLOYEE_ID);
      const response = await httpService.sendGetRequest(
        `/employee/${EMPLOYEE_ID}`,
      );
      expect(response).toBeDefined();
      expect(response).toBeTruthy();

      expect(response.status).toEqual(200);
      expect(response.data).toBeDefined();
      expect(response.data).toBeTruthy();
    });

    it("Should successfully update the employee data by id", async () => {
      expect(EMPLOYEE_ID).toBeTruthy();
      expect(EMPLOYEE_ID).toBeGreaterThan(0);

      log.info("Updating employee with id: " + EMPLOYEE_ID);
      const response = await httpService.sendPatchRequest(
        `/employee/${EMPLOYEE_ID}`,
        updateEmployeeData,
      );

      expect(response).toBeDefined();
      expect(response).toBeTruthy();

      expect(response.status).toEqual(200);
      expect(response.data).toBeDefined();
      expect(response.data).toBeTruthy();
      expect(response.data.id).toEqual(EMPLOYEE_ID);

      expect(response.data).toHaveProperty("firstName");
      expect(response.data).toHaveProperty("lastName");
      expect(response.data).toHaveProperty("salary");
      expect(response.data).toHaveProperty("isActive");
      expect(response.data).toHaveProperty("createdAt");
      expect(response.data).toHaveProperty("updatedAt");

      expect(response.data.firstName).toEqual("UPDATED_FIRST_NAME");
      expect(response.data.lastName).toEqual("UPDATED_LAST_NAME");
      expect(response.data.position).toEqual("UPDATED_POSITION");

      expect(response.data.createdAt).not.toEqual(response.data.updatedAt);
    });

    it("Should successfully delete an employee by id", async () => {
      expect(EMPLOYEE_ID).toBeTruthy();
      expect(EMPLOYEE_ID).toBeGreaterThan(0);

      log.info("Deleting employee with id: " + EMPLOYEE_ID);
      const response = await httpService.sendDeleteRequest(
        `/employee/${EMPLOYEE_ID}`,
      );
      expect(response).toBeDefined();
      expect(response).toBeTruthy();
      expect(response.status).toEqual(204);
      expect(response.data).toBeFalsy();
    });
  });
};

module.exports = {
  employeeSuccessCasesIntegrationTestSuite,
};
