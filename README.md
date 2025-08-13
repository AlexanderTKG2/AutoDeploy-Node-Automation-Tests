# AutoDeploy-Node-Automation-Tests

A simple Node.js project for running Jest integration tests against a deployed Nest.js API (AutoDeploy-Node-Nest).  

The tests send HTTP requests to the target API (Employees) and assert responses.

## Setup

Install dependencies:

```bash
npm install
```

## Running Tests

### Local (default)

```bash
npm run test:integration
# or
npm start
```

### Specific Environments

```bash
npm run test:integration:dev
npm run test:integration:qa
npm run test:integration:uat
npm run test:integration:staging
npm run test:integration:prod
```

### Using --stage Parameter

```bash
npm run test:integration -- --stage=dev
npm run test:integration -- --stage=qa
npm run test:integration -- --stage=uat
```

## Notes  

- Requires the API to be deployed and accessible or running in localhost.  
- Set any required environment variables before running.
