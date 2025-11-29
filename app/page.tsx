import Header from '@/app/components/sections/Header';
import Hero from '@/app/components/sections/Hero';
import Services from '@/app/components/sections/Services';
import Deals from '@/app/components/sections/Deals';
import Portfolio from '@/app/components/sections/Portfolio';
import Team from '@/app/components/sections/Team';
import Process from '@/app/components/sections/Process';
import Testimonials from '@/app/components/sections/Testimonials';
import OrderForm from '@/app/components/sections/OrderFormWrapper';
import Contact from '@/app/components/sections/Contact';
import SocialMediaSection from '@/app/components/sections/SocialMediaSection';
import Footer from '@/app/components/sections/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import AIChatButton from '@/app/components/AIChatButton';
import StructuredData from '@/app/components/StructuredData';

export default function Home() {
    return (
        <>
            <StructuredData />
            <Header />
            <main className="min-h-screen">
                <Hero />
                <Services />
                <Deals />
                <Portfolio />
                <Team />
                <Process />
                <Testimonials />
                <OrderForm />
                <Contact />
                <SocialMediaSection />
            </main>
            <Footer />
            <WhatsAppButton />
            <AIChatButton />
        </>
    );
}
