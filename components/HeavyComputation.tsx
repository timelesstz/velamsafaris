import { useState, useEffect } from 'react'

export default function HeavyComputation() {
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    const worker = new Worker(new URL('../workers/heavy-computation.js', import.meta.url))
    worker.onmessage = (event: MessageEvent) => {
      setResult(event.data)
    }
    worker.postMessage('start')

    return () => worker.terminate()
  }, [])

  return <div>{result !== null ? `Result: ${result}` : 'Computing...'}</div>
}