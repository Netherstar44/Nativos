import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-serif mb-6">Nativos</h2>
          <p className="text-primary-foreground/70 font-light max-w-sm">
            Atelier de bebidas botánicas prensadas en frío. Creado con frutas nativas de la cordillera de los Andes.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-4 tracking-wider uppercase text-sm">Explorar</h3>
          <ul className="space-y-3 text-primary-foreground/70 font-light">
            <li><a href="#origen" className="hover:text-white transition-colors">Origen</a></li>
            <li><a href="#sabores" className="hover:text-white transition-colors">Sabores</a></li>
            <li><a href="#atelier" className="hover:text-white transition-colors">El Atelier</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4 tracking-wider uppercase text-sm">Contacto</h3>
          <ul className="space-y-3 text-primary-foreground/70 font-light">
            <li>hola@nativosatelier.co</li>
            <li>Medellín, Colombia</li>
            <li>@nativosatelier</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50 font-light">
        <p>© {new Date().getFullYear()} Nativos Atelier. Todos los derechos reservados.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Términos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
