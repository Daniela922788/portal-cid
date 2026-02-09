import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export default function KitHerramientas() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Kit de Herramientas" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Kit de Herramientas para Docentes</h1>
          <p className="text-xl text-muted-foreground">Recursos organizados por temática</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="innovacion" className="border rounded-lg px-6">
            <AccordionTrigger className="text-lg font-semibold">Innovación Educativa</AccordionTrigger>
            <AccordionContent className="space-y-3 pt-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Guía de Metodologías Innovadoras</span>
                </div>
                <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}