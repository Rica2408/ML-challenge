'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Algo esta mal</h2>
      <button onClick={() => reset()}>Intente de nuevo</button>
    </div>
  )
}