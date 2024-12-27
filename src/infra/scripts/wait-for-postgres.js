const { exec } = require('node:child_process')

function checkPostgres() {
  exec('docker exec postgres_database pg_isready --host localhost', handleReturn);

  function handleReturn(error, stdout, stderr) {

    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      /* setTimeout(checkPostgres, 1000); */
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões\n");


    /* if (error) {
      console.log("🔴 Postgres não está pronto ainda. Tentando novamente em 1 segundo...");
      setTimeout(checkPostgres, 1000);
      return;
    }

    console.log("🟢 Postgres está pronto") */
  }
}

process.stdout.write("🔴 Aguardando postgres aceitar conexões");
checkPostgres();
