import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/Header'), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <div>
      <DynamicHeader />
      {/* Rest of your page content */}
    </div>
  )
}