import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, HeadphonesIcon } from "lucide-react";

export default function ContactBanner() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <HeadphonesIcon className="h-8 w-8" />
              <h2 className="text-3xl font-bold">¿Necesitas ayuda?</h2>
            </div>
            <p className="text-lg text-blue-50">
              Habla con nosotros. Estamos aquí para atenderte y resolver tus inquietudes
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/mesa-ayuda">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <MessageCircle className="h-5 w-5 mr-2" />
                Mesa de Ayuda
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white" 
              asChild
            >
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
