import { Helmet } from 'react-helmet';

const SEOptimize = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType = 'website',
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  ogSiteName,
  ogLocale,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterImageAlt,
  schema,
  robots = 'index, follow',
  author,
  ...extraMeta
}) => {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || canonical;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {robots && <meta name="robots" content={robots} />}
      {author && <meta name="author" content={author} />}

      {finalOgTitle && <meta property="og:title" content={finalOgTitle} />}
      {finalOgDescription && <meta property="og:description" content={finalOgDescription} />}
      {finalOgUrl && <meta property="og:url" content={finalOgUrl} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageWidth && <meta property="og:image:width" content={ogImageWidth} />}
      {ogImageHeight && <meta property="og:image:height" content={ogImageHeight} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
      {ogLocale && <meta property="og:locale" content={ogLocale} />}

      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {finalTwitterTitle && <meta name="twitter:title" content={finalTwitterTitle} />}
      {finalTwitterDescription && <meta name="twitter:description" content={finalTwitterDescription} />}
      {finalOgUrl && <meta name="twitter:url" content={finalOgUrl} />}
      {finalTwitterImage && <meta name="twitter:image" content={finalTwitterImage} />}
      {twitterImageAlt && <meta name="twitter:image:alt" content={twitterImageAlt} />}

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}

      {Object.entries(extraMeta).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Helmet>
  );
};

export default SEOptimize;
