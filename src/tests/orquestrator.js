import retry from "async-retry";
import database from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      minTimeout: 100,
      factor: 1.1,
      onRetry: (err, i) => console.log(`Retrying ${i} of 100: ${err.message}`),
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (response.status !== 200) {
          throw new Error(
            `Server is not ready. Response status: ${response.status}`,
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orquestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orquestrator;
