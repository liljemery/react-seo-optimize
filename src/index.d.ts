import { ComponentType } from 'react';

export interface SEOptimizeProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  ogImageSecureUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  twitterSite?: string;
  twitterCreator?: string;
  schema?: StructuredData | StructuredData[];
  structuredData?: StructuredData | StructuredData[];
  robots?: string;
  author?: string;
  htmlLang?: string;
  themeColor?: string;
  viewport?: string;
  charset?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTag?: string[];
  customMeta?: Record<string, string>;
}

export type StructuredData = 
  | OrganizationSchema
  | ProfessionalServiceSchema
  | BreadcrumbSchema
  | WebPageSchema
  | ArticleSchema
  | ProductSchema
  | FAQPageSchema
  | HowToSchema
  | LocalBusinessSchema
  | Record<string, unknown>;

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  alternateName?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: PostalAddress | object;
  contactPoint?: ContactPoint | object;
  sameAs?: string[];
  areaServed?: object;
  hasOfferCatalog?: object;
}

export interface ProfessionalServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'ProfessionalService';
  name?: string;
  description?: string;
  url?: string;
  areaServed?: object;
  serviceType?: string;
  provider?: object;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
}

export interface BreadcrumbListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name?: string;
  description?: string;
  url?: string;
  inLanguage?: string;
  isPartOf?: object;
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: Person | Organization | object;
  publisher?: Organization | object;
  articleSection?: string;
  articleTag?: string[];
  url?: string;
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description?: string;
  image?: string | string[];
  brand?: Brand | object;
  sku?: string;
  offers?: Offer | object;
  aggregateRating?: AggregateRating | object;
  review?: Review[];
  url?: string;
}

export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description?: string;
  image?: string | string[];
  totalTime?: string;
  estimatedCost?: MonetaryAmount | object;
  supply?: HowToSupply[];
  tool?: HowToTool[];
  step: HowToStep[];
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description?: string;
  image?: string;
  address: PostalAddress | object;
  telephone?: string;
  priceRange?: string;
  openingHoursSpecification?: OpeningHoursSpecification[];
  servesCuisine?: string;
  acceptsReservations?: boolean;
  url?: string;
  sameAs?: string[];
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  addressCountry?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  streetAddress?: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType?: string;
  email?: string;
}

export interface Person {
  '@type': 'Person';
  name: string;
  url?: string;
}

export interface Brand {
  '@type': 'Brand';
  name: string;
}

export interface Offer {
  '@type': 'Offer';
  price?: string;
  priceCurrency?: string;
  availability?: string;
  url?: string;
}

export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string | number;
  reviewCount?: string | number;
}

export interface Review {
  '@type': 'Review';
  author: Person | object;
  reviewRating: Rating | object;
  reviewBody?: string;
}

export interface Rating {
  '@type': 'Rating';
  ratingValue: string | number;
}

export interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  '@type': 'Answer';
  text: string;
}

export interface HowToSupply {
  '@type': 'HowToSupply';
  name: string;
}

export interface HowToTool {
  '@type': 'HowToTool';
  name: string;
}

export interface HowToStep {
  '@type': 'HowToStep';
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek?: string | string[];
  opens?: string;
  closes?: string;
}

export interface MonetaryAmount {
  '@type': 'MonetaryAmount';
  currency?: string;
  value?: string | number;
}

export declare const SEOptimize: ComponentType<SEOptimizeProps>;

export declare function renderSEOTags(props: SEOptimizeProps): string;

export interface OrganizationSchemaConfig {
  name: string;
  alternateName?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: PostalAddress | object;
  contactPoint?: ContactPoint | object;
  sameAs?: string[];
  areaServed?: object;
  hasOfferCatalog?: object;
}

export interface ProfessionalServiceSchemaConfig {
  name?: string;
  description?: string;
  url?: string;
  areaServed?: object;
  serviceType?: string;
  provider?: object;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface WebPageSchemaConfig {
  name?: string;
  description?: string;
  url?: string;
  inLanguage?: string;
  isPartOf?: object;
}

export interface ArticleSchemaConfig {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: Person | Organization | object;
  publisher?: Organization | object;
  articleSection?: string;
  articleTag?: string[];
  url?: string;
}

export interface ProductSchemaConfig {
  name: string;
  description?: string;
  image?: string | string[];
  brand?: Brand | object;
  sku?: string;
  offers?: Offer | object;
  aggregateRating?: AggregateRating | object;
  review?: Review[];
  url?: string;
}

export interface FAQPageSchemaConfig {
  mainEntity: Question[];
}

export interface HowToSchemaConfig {
  name: string;
  description?: string;
  image?: string | string[];
  totalTime?: string;
  estimatedCost?: MonetaryAmount | object;
  supply?: HowToSupply[];
  tool?: HowToTool[];
  step: HowToStep[];
}

export interface LocalBusinessSchemaConfig {
  name: string;
  description?: string;
  image?: string;
  address: PostalAddress | object;
  telephone?: string;
  priceRange?: string;
  openingHoursSpecification?: OpeningHoursSpecification[];
  servesCuisine?: string;
  acceptsReservations?: boolean;
  url?: string;
  sameAs?: string[];
}

export declare function generateOrganizationSchema(
  config: OrganizationSchemaConfig
): OrganizationSchema;

export declare function generateProfessionalServiceSchema(
  config: ProfessionalServiceSchemaConfig
): ProfessionalServiceSchema;

export declare function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): BreadcrumbSchema;

export declare function generateWebPageSchema(
  config: WebPageSchemaConfig
): WebPageSchema;

export declare function generateArticleSchema(
  config: ArticleSchemaConfig
): ArticleSchema;

export declare function generateProductSchema(
  config: ProductSchemaConfig
): ProductSchema;

export declare function generateFAQPageSchema(
  config: FAQPageSchemaConfig
): FAQPageSchema;

export declare function generateHowToSchema(
  config: HowToSchemaConfig
): HowToSchema;

export declare function generateLocalBusinessSchema(
  config: LocalBusinessSchemaConfig
): LocalBusinessSchema;
