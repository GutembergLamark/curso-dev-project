import database from "infra/database";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString()

  const databaseName = process.env.POSTGRES_DB
  const databaseOpenedConnections = await database.query({ text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;", values: [databaseName] })
  const databaseOpenedConnectionsValue = databaseOpenedConnections.rows[0].count

  const databaseMaxConnections = await database.query({ text: "SHOW max_connections;" })
  const databaseMaxConnectionsValue = databaseMaxConnections.rows[0].max_connections

  const databaseVersion = await database.query({ text: "SHOW server_version;" })
  const databaseVersionValue = databaseVersion.rows[0].server_version

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        opened_connections: databaseOpenedConnectionsValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        version: databaseVersionValue
      }
    }
  });
}
