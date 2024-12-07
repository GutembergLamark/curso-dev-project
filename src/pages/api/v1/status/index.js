import database from "../../../../infra/database";

export default async function status(request, response) {
  console.log(database);

  const result = await database.query("SELECT 1 + 1 as sum;");

  console.log(result.rows);

  response.status(200).json({ chave: "são acima da média" });
}
