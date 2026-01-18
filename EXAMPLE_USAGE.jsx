import { SEOptimize, generateProfessionalServiceSchema, generateBreadcrumbSchema } from './src/index.js';

const ExampleAboutUs = () => {
  const schema = generateProfessionalServiceSchema({
    name: 'Infort International S.R.L',
    description: 'Firma especializada en servicios de auditorías y consultorías informáticas.',
    url: 'https://www.infortinternational.com',
    areaServed: {
      '@type': 'Country',
      name: 'República Dominicana',
    },
  });

  return (
    <>
      <SEOptimize
        title="Sobre Nosotros | Infort International S.R.L"
        description="Conoce nuestra identidad y compromiso."
        keywords="sobre nosotros, Infort International"
        canonical="https://www.infortinternational.com/about-us"
        ogTitle="Sobre Nosotros | Infort International S.R.L"
        ogDescription="Conoce nuestra identidad y compromiso."
        ogUrl="https://www.infortinternational.com/about-us"
        schema={schema}
      />
      {/* Your content */}
    </>
  );
};

const ExampleWithBreadcrumb = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.example.com/' },
    { name: 'Services', url: 'https://www.example.com/services' },
    { name: 'Training', url: 'https://www.example.com/services/training' },
  ]);

  return (
    <>
      <SEOptimize
        title="Training | Example"
        description="Training services"
        canonical="https://www.example.com/services/training"
        schema={breadcrumbSchema}
      />
      {/* Your content */}
    </>
  );
};

export { ExampleAboutUs, ExampleWithBreadcrumb };
