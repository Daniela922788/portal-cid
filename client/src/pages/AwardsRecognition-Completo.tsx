import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Share2, Heart, MessageCircle, Eye } from 'lucide-react';

export default function AwardsRecognition() {
  const [designVersion, setDesignVersion] = useState<'news' | 'card'>('news');
  const [selectedAward, setSelectedAward] = useState<1 | 2>(1);

  const awards = [
    {
      id: 1,
      title: 'Centro de Ciencia Envigado Reconocido como Referente en Educación STEM+ en Latinoamérica',
      subtitle: 'El Centro de Ciencia Envigado fue destacado en la Semana STEM+ 2025 por su innovación educativa y compromiso con la transformación territorial',
      date: '26 de Septiembre de 2025',
      category: 'Reconocimiento',
      image: 'https://via.placeholder.com/800x400?text=Centro+de+Ciencia+Envigado',
      content: 'En el marco de la Semana STEM+ Envigado 2025, el Centro de Ciencia fue reconocido como una institución referente en educación STEM+ en Latinoamérica. Este reconocimiento destaca el trabajo innovador, la dedicación del equipo y el impacto transformador que ha generado en la comunidad educativa del territorio.',
      details: [
        'Más de 1,472 personas impactadas en 2024',
        '1,014 personas impactadas en 2025',
        'Alianzas estratégicas con empresas líderes (Lenovo, Microsoft, Talentum)',
        'Programas de formación docente en STEM+',
        'Iniciativas de apropiación social del conocimiento',
      ],
      author: 'Centro de Ciencia Envigado',
      views: 2540,
      likes: 342,
      comments: 87,
      shares: 45,
    },
    {
      id: 2,
      title: 'Envigado Recibió Reconocimiento por sus Buenas Prácticas en Foro Latinoamericano de Ciudades del Aprendizaje',
      subtitle: 'El Municipio de Envigado fue destacado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia "Construyendo futuro: territorio STEM + SMART Regenerativo"',
      date: '6 de Noviembre de 2025',
      category: 'Reconocimiento UNESCO',
      image: 'https://via.placeholder.com/800x400?text=Foro+Latinoamericano+Ciudades+del+Aprendizaje',
      content: 'El Municipio de Envigado recibió el reconocimiento otorgado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia "Construyendo futuro: territorio STEM + SMART Regenerativo", teniendo en cuenta las buenas prácticas que se implementan en el territorio y que apuntan a la implementación de programas de aprendizaje para el cierre de la brecha digital y el desarrollo de competencias en docentes y estudiantes. La entrega del reconocimiento se llevó a cabo en ceremonia oficial desde la ciudad de La Paz (México), dentro del Tercer Foro de Ciudades del Aprendizaje de Latinoamérica "Aprendizaje basado en el lugar".',
      details: [
        'Designación UNESCO como Ciudad del Aprendizaje desde 2022',
        'Parte de la Red Global de Ciudades del Aprendizaje',
        'Promoción de estrategias de aprendizaje a lo largo de la vida',
        'Énfasis en sostenibilidad, pensamiento crítico y conciencia ambiental',
        'Transferencia de buenas prácticas educativas de alto impacto global',
      ],
      author: 'Municipio de Envigado',
      views: 3120,
      likes: 456,
      comments: 124,
      shares: 78,
    },
  ];

  const award = awards[selectedAward - 1];

  // Selector de Reconocimientos
  const AwardSelector = () => (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      {awards.map((a) => (
        <motion.button
          key={a.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedAward(a.id as 1 | 2)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all text-sm ${
            selectedAward === a.id
              ? 'bg-amber-500 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Reconocimiento {a.id}
        </motion.button>
      ))}
    </div>
  );

  // Selector de Diseño
  const DesignSelector = () => (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setDesignVersion('news')}
        className={`px-6 py-2 rounded-lg font-semibold transition-all text-sm ${
          designVersion === 'news'
            ? 'bg-blue-500 text-white shadow-lg'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        Opción 1: Noticia Clásica
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setDesignVersion('card')}
        className={`px-6 py-2 rounded-lg font-semibold transition-all text-sm ${
          designVersion === 'card'
            ? 'bg-purple-500 text-white shadow-lg'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        Opción 2: Tarjeta Moderna
      </motion.button>
    </div>
  );

  // OPCIÓN 1: DISEÑO TIPO NOTICIA CLÁSICA
  const NewsDesign = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <DesignSelector />
        <AwardSelector />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">{award.category}</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {award.title}
          </h1>
          <p className="text-xl text-slate-600 mb-6 leading-relaxed">
            {award.subtitle}
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500 border-t border-b border-slate-300 py-4">
            <span className="font-semibold text-slate-700">{award.author}</span>
            <span>{award.date}</span>
            <div className="flex items-center gap-1 ml-auto">
              <Eye className="w-4 h-4" />
              <span>{award.views.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 rounded-lg overflow-hidden shadow-xl"
        >
          <img
            src={award.image}
            alt={award.title}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {award.content}
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">Puntos Destacados</h3>
          <ul className="space-y-3 mb-8">
            {award.details.map((detail, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-700">{detail}</span>
              </motion.li>
            ))}
          </ul>

          {/* Engagement Stats */}
          <div className="border-t border-slate-200 pt-6 flex gap-6">
            <button className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">{award.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{award.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-600 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">{award.shares}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // OPCIÓN 2: DISEÑO TIPO TARJETA MODERNA
  const CardDesign = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <DesignSelector />
        <AwardSelector />

        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold"
              >
                {award.category}
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-slate-900 mb-3 leading-tight"
              >
                {award.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-600 mb-4 leading-relaxed"
              >
                {award.subtitle}
              </motion.p>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-6 pb-6 border-b border-slate-200">
                <div>
                  <p className="font-semibold text-slate-700">Por {award.author}</p>
                  <p>Publicado {award.date}</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">
                {award.content}
              </p>

              <h4 className="text-lg font-bold text-slate-900 mb-4">Logros Principales</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {award.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex items-start gap-2 bg-amber-50 p-3 rounded-lg"
                  >
                    <span className="text-amber-500 font-bold mt-1">✓</span>
                    <span className="text-sm text-slate-700">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Engagement Stats */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors flex-1 justify-center py-2 rounded-lg hover:bg-red-50"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-semibold">{award.likes}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors flex-1 justify-center py-2 rounded-lg hover:bg-blue-50"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">{award.comments}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-600 hover:text-green-500 transition-colors flex-1 justify-center py-2 rounded-lg hover:bg-green-50"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">{award.shares}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {designVersion === 'news' ? <NewsDesign /> : <CardDesign />}
    </div>
  );
}
