import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/gradient-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: window.innerWidth > 1024 ? 'fixed' : 'scroll'
      }}
    >
      <Navigation />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
