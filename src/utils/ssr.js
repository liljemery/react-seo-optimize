export const renderSEOTags = (props) => {
  const {
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
    ogImageSecureUrl,
    ogSiteName,
    ogLocale,
    twitterCard = 'summary_large_image',
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterImageAlt,
    twitterSite,
    twitterCreator,
    robots,
    author,
    htmlLang,
    themeColor,
    viewport,
    charset = 'UTF-8',
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    articleSection,
    articleTag,
    schema,
    structuredData,
    customMeta = {},
  } = props;

  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || canonical;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;

  const tags = [];

  if (htmlLang) {
    tags.push(`<html lang="${escapeHtml(htmlLang)}">`);
  }

  if (charset) {
    tags.push(`<meta charset="${escapeHtml(charset)}">`);
  }

  if (viewport) {
    tags.push(`<meta name="viewport" content="${escapeHtml(viewport)}">`);
  }

  if (themeColor) {
    tags.push(`<meta name="theme-color" content="${escapeHtml(themeColor)}">`);
  }

  if (title) {
    tags.push(`<title>${escapeHtml(title)}</title>`);
  }

  if (description) {
    tags.push(`<meta name="description" content="${escapeHtml(description)}">`);
  }

  if (keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}">`);
  }

  if (canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}">`);
  }

  if (robots) {
    tags.push(`<meta name="robots" content="${escapeHtml(robots)}">`);
  }

  if (author) {
    tags.push(`<meta name="author" content="${escapeHtml(author)}">`);
  }

  if (finalOgTitle) {
    tags.push(`<meta property="og:title" content="${escapeHtml(finalOgTitle)}">`);
  }

  if (finalOgDescription) {
    tags.push(`<meta property="og:description" content="${escapeHtml(finalOgDescription)}">`);
  }

  if (finalOgUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(finalOgUrl)}">`);
  }

  if (ogType) {
    tags.push(`<meta property="og:type" content="${escapeHtml(ogType)}">`);
  }

  if (ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
  }

  if (ogImage && (ogImage.startsWith('https://') || ogImageSecureUrl)) {
    tags.push(`<meta property="og:image:secure_url" content="${escapeHtml(ogImageSecureUrl || ogImage)}">`);
  }

  if (ogImageWidth) {
    tags.push(`<meta property="og:image:width" content="${escapeHtml(ogImageWidth)}">`);
  }

  if (ogImageHeight) {
    tags.push(`<meta property="og:image:height" content="${escapeHtml(ogImageHeight)}">`);
  }

  if (ogImageAlt) {
    tags.push(`<meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">`);
  }

  if (ogSiteName) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(ogSiteName)}">`);
  }

  if (ogLocale) {
    tags.push(`<meta property="og:locale" content="${escapeHtml(ogLocale)}">`);
  }

  if (ogType === 'article') {
    if (articlePublishedTime) {
      tags.push(`<meta property="article:published_time" content="${escapeHtml(articlePublishedTime)}">`);
    }
    if (articleModifiedTime) {
      tags.push(`<meta property="article:modified_time" content="${escapeHtml(articleModifiedTime)}">`);
    }
    if (articleAuthor) {
      tags.push(`<meta property="article:author" content="${escapeHtml(articleAuthor)}">`);
    }
    if (articleSection) {
      tags.push(`<meta property="article:section" content="${escapeHtml(articleSection)}">`);
    }
    if (articleTag && Array.isArray(articleTag)) {
      articleTag.forEach((tag) => {
        tags.push(`<meta property="article:tag" content="${escapeHtml(tag)}">`);
      });
    }
  }

  if (twitterCard) {
    tags.push(`<meta name="twitter:card" content="${escapeHtml(twitterCard)}">`);
  }

  if (twitterSite) {
    tags.push(`<meta name="twitter:site" content="${escapeHtml(twitterSite)}">`);
  }

  if (twitterCreator) {
    tags.push(`<meta name="twitter:creator" content="${escapeHtml(twitterCreator)}">`);
  }

  if (finalTwitterTitle) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(finalTwitterTitle)}">`);
  }

  if (finalTwitterDescription) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(finalTwitterDescription)}">`);
  }

  if (finalOgUrl) {
    tags.push(`<meta name="twitter:url" content="${escapeHtml(finalOgUrl)}">`);
  }

  if (finalTwitterImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(finalTwitterImage)}">`);
  }

  if (twitterImageAlt) {
    tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(twitterImageAlt)}">`);
  }

  const schemas = structuredData || schema;
  if (schemas) {
    try {
      const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
      const mergedSchema = schemaArray.length === 1 
        ? schemaArray[0]
        : {
            '@context': 'https://schema.org',
            '@graph': schemaArray
          };
      const schemaJson = JSON.stringify(mergedSchema);
      tags.push(`<script type="application/ld+json">${schemaJson}</script>`);
    } catch (error) {
      console.error('Failed to stringify schema:', error);
    }
  }

  Object.entries(customMeta).forEach(([key, value]) => {
    tags.push(`<meta name="${escapeHtml(key)}" content="${escapeHtml(value)}">`);
  });

  return tags.join('\n');
};

const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
