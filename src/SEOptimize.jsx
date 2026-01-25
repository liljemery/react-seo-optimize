import React, { memo, useEffect, useRef } from 'react';
import { validateCanonicalUrl, mergeSchemas, validateImageDimensions } from './utils/metaTags.js';
import { validateSchemaBeforeRender } from './utils/schemaValidation.js';

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
  schema,
  structuredData,
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
  customMeta = {},
}) => {
  const validatedCanonical = React.useMemo(() => {
    if (!canonical) return null;
    try {
      return validateCanonicalUrl(canonical);
    } catch (error) {
      console.error('Canonical URL validation error:', error.message);
      return null;
    }
  }, [canonical]);

  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || validatedCanonical;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;

  if (finalOgUrl && validatedCanonical && finalOgUrl !== validatedCanonical) {
    console.warn('og:url and canonical should match for optimal SEO');
  }

  if (ogImage) {
    validateImageDimensions(ogImageWidth, ogImageHeight);
  }

  const mergedSchema = React.useMemo(() => {
    const schemas = structuredData || schema;
    if (!schemas) return null;
    
    const merged = mergeSchemas(schemas);
    if (merged) {
      const validation = validateSchemaBeforeRender(merged);
      if (!validation.valid) {
        console.warn('Schema validation warnings:', validation.errors);
      }
    }
    return merged;
  }, [schema, structuredData]);

  const prevPropsRef = useRef({});

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const head = document.head;
    const currentProps = {
      title,
      description,
      keywords,
      canonical: validatedCanonical,
      ogTitle: finalOgTitle,
      ogDescription: finalOgDescription,
      ogUrl: finalOgUrl,
      ogImage,
      ogType,
      ogImageWidth,
      ogImageHeight,
      ogImageAlt,
      ogImageSecureUrl,
      ogSiteName,
      ogLocale,
      twitterCard,
      twitterTitle: finalTwitterTitle,
      twitterDescription: finalTwitterDescription,
      twitterImage: finalTwitterImage,
      twitterImageAlt,
      twitterSite,
      twitterCreator,
      robots,
      author,
      htmlLang,
      themeColor,
      viewport,
      charset,
      articlePublishedTime,
      articleModifiedTime,
      articleAuthor,
      articleSection,
      articleTag,
      customMeta,
      schema: mergedSchema,
    };

    const prevProps = prevPropsRef.current;

    if (htmlLang && htmlLang !== prevProps.htmlLang) {
      document.documentElement.lang = htmlLang;
    }

    if (charset && charset !== prevProps.charset) {
      let charsetMeta = document.querySelector('meta[charset]');
      if (!charsetMeta) {
        charsetMeta = document.createElement('meta');
        charsetMeta.setAttribute('charset', charset);
        head.insertBefore(charsetMeta, head.firstChild);
      } else {
        charsetMeta.setAttribute('charset', charset);
      }
    }

    if (viewport && viewport !== prevProps.viewport) {
      updateOrCreateMeta(head, 'name', 'viewport', viewport, prevProps.viewport);
    }

    if (themeColor && themeColor !== prevProps.themeColor) {
      updateOrCreateMeta(head, 'name', 'theme-color', themeColor, prevProps.themeColor);
    }

    if (title && title !== prevProps.title) {
      document.title = title;
    }

    if (description && description !== prevProps.description) {
      updateOrCreateMeta(head, 'name', 'description', description, prevProps.description);
    }

    if (keywords && keywords !== prevProps.keywords) {
      updateOrCreateMeta(head, 'name', 'keywords', keywords, prevProps.keywords);
    }

    if (validatedCanonical && validatedCanonical !== prevProps.canonical) {
      updateOrCreateLink(head, 'canonical', validatedCanonical, prevProps.canonical);
    }

    if (robots && robots !== prevProps.robots) {
      updateOrCreateMeta(head, 'name', 'robots', robots, prevProps.robots);
    }

    if (author && author !== prevProps.author) {
      updateOrCreateMeta(head, 'name', 'author', author, prevProps.author);
    }

    if (finalOgTitle && finalOgTitle !== prevProps.ogTitle) {
      updateOrCreateMeta(head, 'property', 'og:title', finalOgTitle, prevProps.ogTitle);
    }

    if (finalOgDescription && finalOgDescription !== prevProps.ogDescription) {
      updateOrCreateMeta(head, 'property', 'og:description', finalOgDescription, prevProps.ogDescription);
    }

    if (finalOgUrl && finalOgUrl !== prevProps.ogUrl) {
      updateOrCreateMeta(head, 'property', 'og:url', finalOgUrl, prevProps.ogUrl);
    }

    if (ogType && ogType !== prevProps.ogType) {
      updateOrCreateMeta(head, 'property', 'og:type', ogType, prevProps.ogType);
    }

    if (ogImage && ogImage !== prevProps.ogImage) {
      updateOrCreateMeta(head, 'property', 'og:image', ogImage, prevProps.ogImage);
    }

    if (ogImage && (ogImage.startsWith('https://') || ogImageSecureUrl)) {
      const secureUrl = ogImageSecureUrl || ogImage;
      if (secureUrl !== prevProps.ogImageSecureUrl) {
        updateOrCreateMeta(head, 'property', 'og:image:secure_url', secureUrl, prevProps.ogImageSecureUrl);
      }
    }

    if (ogImageWidth && ogImageWidth !== prevProps.ogImageWidth) {
      updateOrCreateMeta(head, 'property', 'og:image:width', ogImageWidth, prevProps.ogImageWidth);
    }

    if (ogImageHeight && ogImageHeight !== prevProps.ogImageHeight) {
      updateOrCreateMeta(head, 'property', 'og:image:height', ogImageHeight, prevProps.ogImageHeight);
    }

    if (ogImageAlt && ogImageAlt !== prevProps.ogImageAlt) {
      updateOrCreateMeta(head, 'property', 'og:image:alt', ogImageAlt, prevProps.ogImageAlt);
    }

    if (ogSiteName && ogSiteName !== prevProps.ogSiteName) {
      updateOrCreateMeta(head, 'property', 'og:site_name', ogSiteName, prevProps.ogSiteName);
    }

    if (ogLocale && ogLocale !== prevProps.ogLocale) {
      updateOrCreateMeta(head, 'property', 'og:locale', ogLocale, prevProps.ogLocale);
    }

    if (ogType === 'article') {
      if (articlePublishedTime && articlePublishedTime !== prevProps.articlePublishedTime) {
        updateOrCreateMeta(head, 'property', 'article:published_time', articlePublishedTime, prevProps.articlePublishedTime);
      }
      if (articleModifiedTime && articleModifiedTime !== prevProps.articleModifiedTime) {
        updateOrCreateMeta(head, 'property', 'article:modified_time', articleModifiedTime, prevProps.articleModifiedTime);
      }
      if (articleAuthor && articleAuthor !== prevProps.articleAuthor) {
        updateOrCreateMeta(head, 'property', 'article:author', articleAuthor, prevProps.articleAuthor);
      }
      if (articleSection && articleSection !== prevProps.articleSection) {
        updateOrCreateMeta(head, 'property', 'article:section', articleSection, prevProps.articleSection);
      }
      if (articleTag && Array.isArray(articleTag)) {
        const prevTags = prevProps.articleTag || [];
        articleTag.forEach((tag, index) => {
          if (tag !== prevTags[index]) {
            const existing = Array.from(head.querySelectorAll('meta[property="article:tag"]'));
            if (index < existing.length) {
              existing[index].setAttribute('content', tag);
            } else {
              const meta = document.createElement('meta');
              meta.setAttribute('property', 'article:tag');
              meta.setAttribute('content', tag);
              head.appendChild(meta);
            }
          }
        });
        if (articleTag.length < prevTags.length) {
          const existing = Array.from(head.querySelectorAll('meta[property="article:tag"]'));
          existing.slice(articleTag.length).forEach((meta) => meta.remove());
        }
      }
    }

    if (twitterCard && twitterCard !== prevProps.twitterCard) {
      updateOrCreateMeta(head, 'name', 'twitter:card', twitterCard, prevProps.twitterCard);
    }

    if (twitterSite && twitterSite !== prevProps.twitterSite) {
      updateOrCreateMeta(head, 'name', 'twitter:site', twitterSite, prevProps.twitterSite);
    }

    if (twitterCreator && twitterCreator !== prevProps.twitterCreator) {
      updateOrCreateMeta(head, 'name', 'twitter:creator', twitterCreator, prevProps.twitterCreator);
    }

    if (finalTwitterTitle && finalTwitterTitle !== prevProps.twitterTitle) {
      updateOrCreateMeta(head, 'name', 'twitter:title', finalTwitterTitle, prevProps.twitterTitle);
    }

    if (finalTwitterDescription && finalTwitterDescription !== prevProps.twitterDescription) {
      updateOrCreateMeta(head, 'name', 'twitter:description', finalTwitterDescription, prevProps.twitterDescription);
    }

    if (finalOgUrl && finalOgUrl !== prevProps.ogUrl) {
      updateOrCreateMeta(head, 'name', 'twitter:url', finalOgUrl, prevProps.ogUrl);
    }

    if (finalTwitterImage && finalTwitterImage !== prevProps.twitterImage) {
      updateOrCreateMeta(head, 'name', 'twitter:image', finalTwitterImage, prevProps.twitterImage);
    }

    if (twitterImageAlt && twitterImageAlt !== prevProps.twitterImageAlt) {
      updateOrCreateMeta(head, 'name', 'twitter:image:alt', twitterImageAlt, prevProps.twitterImageAlt);
    }

    if (mergedSchema) {
      const schemaJson = JSON.stringify(mergedSchema);
      let schemaScript = head.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        head.appendChild(schemaScript);
      }
      schemaScript.textContent = schemaJson;
    } else if (prevProps.schema && !mergedSchema) {
      const schemaScript = head.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    }

    Object.entries(customMeta).forEach(([key, value]) => {
      if (value !== prevProps.customMeta?.[key]) {
        updateOrCreateMeta(head, 'name', key, value, prevProps.customMeta?.[key]);
      }
    });

    if (prevProps.customMeta) {
      Object.keys(prevProps.customMeta).forEach((key) => {
        if (!(key in customMeta)) {
          const meta = head.querySelector(`meta[name="${key}"]`);
          if (meta) meta.remove();
        }
      });
    }

    prevPropsRef.current = currentProps;
  }, [
    title,
    description,
    keywords,
    validatedCanonical,
    finalOgTitle,
    finalOgDescription,
    finalOgUrl,
    ogImage,
    ogType,
    ogImageWidth,
    ogImageHeight,
    ogImageAlt,
    ogImageSecureUrl,
    ogSiteName,
    ogLocale,
    twitterCard,
    finalTwitterTitle,
    finalTwitterDescription,
    finalTwitterImage,
    twitterImageAlt,
    twitterSite,
    twitterCreator,
    robots,
    author,
    htmlLang,
    themeColor,
    viewport,
    charset,
    articlePublishedTime,
    articleModifiedTime,
    articleAuthor,
    articleSection,
    articleTag,
    customMeta,
    mergedSchema,
  ]);

  return null;
};

const updateOrCreateMeta = (head, attribute, value, content, prevContent) => {
  if (content === prevContent) return;

  const selector = `meta[${attribute}="${value}"]`;
  let meta = head.querySelector(selector);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, value);
    head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

const updateOrCreateLink = (head, rel, href, prevHref) => {
  if (href === prevHref) return;

  let link = head.querySelector(`link[rel="${rel}"]`);
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    head.appendChild(link);
  }
  
  link.setAttribute('href', href);
};

export default memo(SEOptimize);
