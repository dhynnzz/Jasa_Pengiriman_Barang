import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type, url, image }) {
  const siteTitle = title ? `${title} | Nabila Trans` : 'Nabila Trans - Jasa Pengiriman Cepat & Aman';
  const siteDescription = description || 'Layanan ekspedisi dan pengiriman logistik terpercaya dengan jangkauan seluruh Jawa dan Bali. Lacak paket Anda secara real-time bersama Nabila Trans.';
  const siteType = type || 'website';
  const siteUrl = url || 'https://nabilatrans.com';
  const siteImage = image || 'https://nabilatrans.com/logo.png'; // Ganti dengan URL gambar aslinya nanti

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={siteDescription} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content={siteType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
}
