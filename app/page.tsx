import dynamic from 'next/dynamic';
import Header from '@/app/components/sections/Header';
import Hero from '@/app/components/sections/Hero';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import AIChatButton from '@/app/components/AIChatButton';
import StructuredData from '@/app/components/StructuredData';

// Lazy load below-the-fold components
const Services = dynamic(() => import('@/app/components/sections/Services'));
const Deals = dynamic(() => import('@/app/components/sections/Deals'));
const Portfolio = dynamic(() => import('@/app/components/sections/Portfolio'));
const Team = dynamic(() => import('@/app/components/sections/Team'));
const Process = dynamic(() => import('@/app/components/sections/Process'));
const Testimonials = dynamic(() => import('@/app/components/sections/Testimonials'));
const OrderForm = dynamic(() => import('@/app/components/sections/OrderFormWrapper'));
const Contact = dynamic(() => import('@/app/components/sections/Contact'));
const SocialMediaSection = dynamic(() => import('@/app/components/sections/SocialMediaSection'));
const Footer = dynamic(() => import('@/app/components/sections/Footer'));

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
