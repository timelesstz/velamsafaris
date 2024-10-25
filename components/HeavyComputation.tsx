import { useState, useEffect } from 'react'

export default function HeavyComputation() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const worker = new Worker(new URL('../workers/heavy-computation.js', import.meta.url))
    worker.onmessage = (event) => {
      setResult(event.data)
    }
    worker.postMessage('start computation')

    return () => worker.terminate()
  }, [])

  return <div>{result ? `Computation result: ${result}` : 'Computing...'}</div>
}