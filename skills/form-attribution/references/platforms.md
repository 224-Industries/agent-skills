# Platform-Specific Implementation Patterns

## Webflow

Webflow forms work out of the box. Add the script in Project Settings → Custom Code → Footer Code:

```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true" defer></script>
```

**Webflow-specific notes:**
- Native Webflow forms automatically receive hidden fields
- Form submissions to Webflow's built-in form handler will include attribution data
- For Zapier/Make integrations, attribution fields appear alongside other form fields
- Exclude the site search form: `data-exclude-forms=".w-form [data-search]"`

**With Webflow + external CRM (e.g., HubSpot embed):**
```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true"
  data-field-prefix="attr_" defer></script>
```

## HubSpot

HubSpot embedded forms are detected automatically via MutationObserver.

**Standard implementation:**
```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true" defer></script>
```

**HubSpot-specific notes:**
- Works with both embedded HubSpot forms and standalone HubSpot pages
- Hidden fields are injected after HubSpot's form renders
- For HubSpot CRM, create corresponding contact properties to store attribution data
- Use `data-field-prefix` if HubSpot properties have a naming convention

**Mapping to HubSpot properties:**
Create these custom contact properties in HubSpot Settings → Properties:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `landing_page`, `referrer_url`
- `gclid`, `fbclid` (if using click ID tracking)

## WordPress

**Method 1: Theme footer (functions.php):**
```php
add_action('wp_footer', function() {
    echo '<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js" data-click-ids="true" defer></script>';
});
```

**Method 2: Plugin (e.g., Insert Headers and Footers):**
Add to footer scripts section.

**WordPress-specific notes:**
- Works with Contact Form 7, Gravity Forms, WPForms, Ninja Forms, Elementor forms
- For WooCommerce, attribution data is captured on checkout forms
- Exclude WordPress search: `data-exclude-forms=".search-form, [role='search']"`

**Contact Form 7 field mapping:**
CF7 automatically includes all hidden fields. To access in email notifications:
```
[utm_source] [utm_medium] [utm_campaign]
```

**Gravity Forms:**
Hidden fields are injected automatically. Access via `{all_fields}` merge tag or field-specific merge tags.

## Marketo

Marketo forms load asynchronously. The script handles this via MutationObserver.

```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true"
  data-field-prefix="attr_" defer></script>
```

**Marketo-specific notes:**
- Hidden fields are injected after Marketo form renders
- Create corresponding fields in Marketo to receive the data
- Use field prefix if Marketo fields have specific naming conventions

## Pardot

```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true" defer></script>
```

**Pardot-specific notes:**
- Works with Pardot form handlers and embedded forms
- Create corresponding prospect fields in Pardot
- For iframe-embedded forms, the script must be added to the iframe source page

## Squarespace

Add in Settings → Advanced → Code Injection → Footer:

```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true" defer></script>
```

**Squarespace-specific notes:**
- Works with native Squarespace form blocks
- For third-party form embeds (Typeform, JotForm), script detects them automatically

## Shopify

Add in Online Store → Themes → Edit Code → theme.liquid (before `</body>`):

```html
<script src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
  data-click-ids="true" defer></script>
```

Or use Shopify's native script loading:
```liquid
{{ 'https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js' | script_tag }}
```

**Shopify-specific notes:**
- Works with newsletter forms, contact forms, and checkout
- For checkout attribution, data is captured on pre-checkout forms
- Exclude search form: `data-exclude-forms="[action*='/search']"`

## Next.js / React SPAs

For SPAs where forms render dynamically, the MutationObserver handles form detection automatically.

**In _app.js or layout.tsx:**
```jsx
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/form-attribution@latest/dist/script.min.js"
        data-click-ids="true"
        strategy="lazyOnload"
      />
    </>
  )
}
```

**Manual refresh after route changes (if needed):**
```jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.FormAttribution) {
        window.FormAttribution.refresh();
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);
  
  return <Component {...pageProps} />;
}
```

## Troubleshooting

**Fields not appearing:**
1. Enable debug mode: `data-debug="true"`
2. Check console for initialization logs
3. Verify form is not excluded
4. Call `FormAttribution.refresh()` to re-inject

**Data not persisting across pages:**
- Default sessionStorage clears on browser close
- Use `data-storage="localStorage"` for longer persistence
- Use `data-storage="cookie"` for cross-subdomain tracking

**Privacy signals blocking:**
- GPC/DNT enabled will prevent data capture
- Override with `data-privacy="false"` if needed (not recommended)