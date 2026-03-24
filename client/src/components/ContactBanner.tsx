import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, HeadphonesIcon } from "lucide-react";

export default function ContactBanner() {
  return (
    <section className="bg-[#0D4B56] py-8 text-white sm:py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <div className="text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start md:gap-3">
              <HeadphonesIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              <h2 className="text-2xl font-bold sm:text-3xl">¿Necesitas ayuda?</h2>
            </div>
            <p className="text-base text-blue-50 sm:text-lg">
              Habla con nosotros. Estamos aquí para atenderte y resolver tus inquietudes
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link href="/mesa-ayuda">
              <Button size="lg" variant="secondary" className="w-full px-5 text-base sm:w-auto sm:px-8 sm:text-lg">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Mesa de Ayuda
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full bg-white/10 px-5 text-base text-white border-white hover:bg-white/20 sm:w-auto sm:px-8 sm:text-lg" 
              asChild
            >
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
