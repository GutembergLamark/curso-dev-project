const { exec } = require('node:child_process')

function checkPostgres() {
  exec('docker exec postgres_database pg_isready --host localhost', handleReturn);

  function handleReturn(error, stdout, stderr) {

    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões\n");
  }
}

process.stdout.write("🔴 Aguardando postgres aceitar conexões");
checkPostgres();