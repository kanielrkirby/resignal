import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { getDbLocationPrompt, getDbKeyPrompt } from '@utils/getDbPrompts'
import { $dbLocation, $dbKey } from '@store/db'
import { initDb } from '@utils/db'

export default function GetDbFlow() {
  const dbLocation = useStore($dbLocation)
  const key = useStore($dbKey)

  useEffect(() => {
    if (dbLocation && key) {
      (async () => {
        try {
          await initDb(dbLocation, key)
          location.href = '/conversations'
        }
        catch (err) {
          console.error(err)
        }
      })()
    }
  }, [dbLocation, key])

  return (
    <main>
      {
        (!dbLocation) && (
          <div>
            <p>Database not loaded or not valid.</p>
            <p>Click the button below to select a database.</p>
            <button type="submit" onClick={getDbLocationPrompt}>Select database</button>
            <button type="submit" onClick={getDbKeyPrompt}>Enter key</button>
          </div>
        )
      }
    </main>
  )
}
