import fs from 'fs'
import pg from 'pg'

async function main() {

  const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'usq',
    password: 'asdfasdf',
    port: 5432,
  })

  // const f = fs.readFileSync('../../datasets/scripture/literal-standard-version/MAT.usfm')
  const f = fs.readFileSync('../../datasets/scripture/eng-t4t_usfm/70-MATeng-t4t.usfm')

  const lines = f.toString().split('\n')
  console.log(`file has ${lines.length} lines`)

  for (const [index, value] of lines.entries()) {
    if (index + 1 == 13) {
      console.log(`line ${index + 1}: ${value.length}`)

      // const res = await client.query(`

      // `, [])
    }
  }

}

main()