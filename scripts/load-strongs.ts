import fs from 'fs'
import { Pool } from 'pg'
import { strongsHebrewDictionary } from './data/strongs-hebrew-dictionary'

async function main() {
  try {

    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'temp',
      password: 'asdfasdf',
      port: 5432,
    })

    console.log('importing strongs...')

    const entries = Object.entries(strongsHebrewDictionary)

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]

      // replace langauge_id = 1 with the real id for 'hbo'
      const res = await pool.query(`
        insert into usq_word_index(language_index, language_id, word, meta)
        values ('iso_639_3', 1, $1, $2)
        on conflict do nothing;
      `, [entry[1].lemma, JSON.stringify(entry)])

      
    }

  } catch (e) {
    console.log('exception', e)
  }

  console.log('complete')

}

main()
