import "./App.css";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronUp,
  Play,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  User,
  Briefcase,
  Video,
  MessageSquare,
  Home,
} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Barra de progreso */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-amber-600 z-50"
        style={{ scaleX }}
      />

      {/* Navegación flotante */}
      <nav className="fixed top-2 sm:top-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white py-2 sm:py-3 px-3 sm:px-6 rounded-full z-40 border border-amber-200/20 max-w-[95vw] overflow-x-auto">
        <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center whitespace-nowrap">
          <NavItem
            icon={Home}
            label="Inicio"
            id="inicio"
            active={activeSection}
            onClick={scrollToSection}
          />
          <NavItem
            icon={User}
            label="Sobre Mí"
            id="sobre-mi"
            active={activeSection}
            onClick={scrollToSection}
          />
          <NavItem
            icon={Briefcase}
            label="Servicios"
            id="servicios"
            active={activeSection}
            onClick={scrollToSection}
          />
          <NavItem
            icon={Video}
            label="Videos"
            id="videos"
            active={activeSection}
            onClick={scrollToSection}
          />
          <NavItem
            icon={MessageSquare}
            label="Contacto"
            id="contacto"
            active={activeSection}
            onClick={scrollToSection}
          />
        </div>
      </nav>

      {/* Sección 1: Hero/Inicio */}
      <HeroSection />

      {/* Sección 2: Sobre Mí */}
      <AboutSection />

      {/* Sección 3: Servicios */}
      <ServicesSection />

      {/* Sección 4: Videos */}
      <VideosSection />

      {/* Sección 5: Contacto */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Botón scroll to top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-r from-blue-600 to-amber-600 text-white p-2 sm:p-3 rounded-full shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 z-40"
      >
        <ChevronUp size={20} className="sm:w-6 sm:h-6" />
      </motion.button>
    </>
  );
}

// Componente para items de navegación
interface NavItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
  label: string;
  id: string;
  active: string;
  onClick: (id: string) => void;
}

const NavItem = ({ icon: Icon, label, id, active, onClick }: NavItemProps) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full transition-all duration-300 ${
      active === id
        ? "bg-gradient-to-r from-blue-600 to-amber-600 text-white"
        : "hover:bg-white/10"
    }`}
  >
    <Icon size={16} style={{ width: "1rem", height: "1rem" }} />
    <span className="text-xs sm:text-sm font-medium hidden sm:inline">
      {label}
    </span>
  </button>
);

// Sección Hero
const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section
      id="inicio"
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10 pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
            Jose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-400">
              Pimentel
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            "En cuanto a mí, siempre proclamaré lo que Dios ha hecho; cantaré
            alabanzas al Dios de Jacob."
          </p>
          <p className="text-sm text-amber-400 font-medium mb-6 sm:mb-8">
            Salmo 76:9
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("sobre-mi")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-300"
          >
            Conoce más sobre mí
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full max-w-md lg:max-w-none"
        >
          <div className="relative h-2/6">
            <img
              src="/src/assets/jose.JPG"
              alt="Jose Pimentel"
              className="w-full h-2/6 max-w-lg mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full bg-gradient-to-r from-blue-600 to-amber-600 rounded-2xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Sección Sobre Mí
const AboutSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-amber-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Sobre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600">
              Mí
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-600 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              "El Señor es mi luz y mi salvación; ¿a quién temeré? El Señor es
              la fortaleza de mi vida; ¿de quién tendré miedo?"
            </p>
            <p className="text-sm text-blue-600 font-medium mb-6 sm:mb-8">
              Salmo 27:1
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">
              Mi vida está dedicada a servir a Dios y compartir su amor con
              otros. A través de mi testimonio y trabajo, busco ser una luz en
              este mundo, guiando a otros hacia la esperanza y la fe que solo se
              encuentra en Cristo.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Creo firmemente que cada día es una oportunidad para crecer en la
              fe, servir a la comunidad y ser un instrumento de paz y amor
              divino.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="bg-gradient-to-r from-blue-50 to-amber-50 p-4 sm:p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Misión</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Proclamar el evangelio y ser testimonio vivo del amor de Dios
              </p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-blue-50 p-4 sm:p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Visión</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Construir una comunidad de fe sólida y unida en el amor de
                Cristo
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-amber-50 p-4 sm:p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Valores</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Fe, esperanza, amor, integridad y servicio al prójimo
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sección Servicios
const ServicesSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const services = [
    {
      title: "Ministerio Pastoral",
      description: "Guía espiritual y consejería basada en la palabra de Dios",
      icon: "🙏",
    },
    {
      title: "Predicación",
      description:
        "Mensajes poderosos que transforman vidas y fortalecen la fe",
      icon: "📖",
    },
    {
      title: "Consejería",
      description: "Acompañamiento espiritual en momentos difíciles",
      icon: "💭",
    },
    {
      title: "Eventos Especiales",
      description: "Eventos poderosos y celebraciones de la fe",
      icon: "✨",
    },
    {
      title: "Estudio Bíblico",
      description: "Grupos de estudio profundo de las escrituras",
      icon: "📚",
    },
    {
      title: "Oración",
      description: "Intercesión y oración por las necesidades de la comunidad",
      icon: "🤲",
    },
  ];

  return (
    <section
      id="servicios"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Mis{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600">
              Servicios
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Dedicado a servir a Dios y a la comunidad a través de diversos
            ministerios
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-600 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-3xl lg:text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sección Videos
const VideosSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const videos = [
    {
      title: "ES EL TIEMPO podcast | Lo Perdí Todo, y El Señor Me Rescató",
      thumbnail: "https://img.youtube.com/vi/FRtu8Mxp-aI/maxresdefault.jpg",
      youtubeId: "FRtu8Mxp-aI",
      description:
        "Un mensaje poderoso sobre cómo la fe puede transformar nuestras vidas",
    },
    {
      title: "El Poder De Un Sí A Dios",
      thumbnail: "https://img.youtube.com/vi/BGPIZUsd8TI/maxresdefault.jpg",
      youtubeId: "BGPIZUsd8TI",
      description:
        "Reflexiones sobre mantener la esperanza en tiempos difíciles",
    },
    {
      title: "El Testigo Fiel, Jesús Nuestro Amén",
      thumbnail: "https://img.youtube.com/vi/YYMKIed_Rf8/maxresdefault.jpg",
      youtubeId: "YYMKIed_Rf8",
      description: "Explorando la profundidad del amor incondicional de Dios",
    },
  ];

  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  return (
    <section
      id="videos"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Mis{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-400">
              Videos
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Mensajes inspiradores y enseñanzas que edifican la fe
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              onClick={() => openVideo(video.youtubeId)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-red-600 rounded-full p-3 sm:p-4 shadow-lg"
                  >
                    <Play
                      className="text-white w-6 h-6 sm:w-8 sm:h-8"
                      fill="white"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-amber-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sección Contacto
const ContactSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-amber-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            ¿Necesitas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600">
              Oración?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Estoy aquí para escucharte y orar contigo. No dudes en contactarme
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-600 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            <div className="flex items-center gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-amber-600 p-3 rounded-full flex-shrink-0">
                <Mail className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Email
                </h3>
                <p className="text-gray-600 text-sm sm:text-base break-all">
                  jose.pimentel@ejemplo.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-amber-600 p-3 rounded-full flex-shrink-0">
                <Phone className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Teléfono
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  +(507) 397-9010
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-amber-600 p-3 rounded-full flex-shrink-0">
                <MapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Ubicación
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  C. Aquilino de la Guardia 5, Panamá, Provincia de Panamá
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl"
          >
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm sm:text-base"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm sm:text-base"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm sm:text-base"
                  placeholder="Comparte tu petición de oración o mensaje..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-400">
              Jose Pimentel
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Sirviendo a Dios y compartiendo su amor con la comunidad a través
              de la fe, la esperanza y el servicio.
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#sobre-mi"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Sobre Mí
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#videos"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Videos
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm sm:text-base"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Sígueme
            </h4>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/josepimenteloficial/"
                className="bg-slate-800 p-2 sm:p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-2 sm:p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Jose Pimentel. Todos los derechos reservados.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Made with ❤️ by{" "}
            <a
              className="text-amber-400 hover:underline"
              href="https://www.linkedin.com/in/adansaavedra/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adan Saavedra
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default App;
