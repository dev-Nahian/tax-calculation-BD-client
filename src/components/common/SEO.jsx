import { useEffect } from 'react';

/**
 * Lightweight SEO Component for dynamic page metadata
 */
export const SEO = ({
  title = 'TaxBD — Bangladesh Income Tax Calculator & Educational Guide',
  description = 'Estimate personal income tax for Assessment Year 2024-2025 compliant with Bangladesh Income Tax Act 2023 & NBR regulations.',
  keywords = 'Bangladesh income tax, tax calculator bd, NBR tax slabs, 2024-2025 tax rates, salary tax bangladesh',
}) => {
  useEffect(() => {
    // Update title
    document.title = title.includes('TaxBD') ? title : `${title} — TaxBD`;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update or create OG tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:site_name': 'TaxBD',
    };

    Object.entries(ogTags).forEach(([prop, content]) => {
      let ogMeta = document.querySelector(`meta[property="${prop}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', prop);
        document.head.appendChild(ogMeta);
      }
      ogMeta.content = content;
    });
  }, [title, description, keywords]);

  return null;
};

export default SEO;
