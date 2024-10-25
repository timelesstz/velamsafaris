import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <Header />
      <main>
        <h1>Welcome to Velam Safaris</h1>
        {/* Add more content here */}
      </main>
      <Footer />
    </Layout>
  );
}
