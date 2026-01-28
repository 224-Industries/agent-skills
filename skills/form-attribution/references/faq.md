# Form Attribution FAQ

## What forms does this work with?

Form Attribution works with virtually any HTML form - custom forms, HubSpot, Webflow, WordPress, and more. The script automatically injects hidden fields into standard form elements.

## Do I have to add hidden form fields myself?

No manual work required. The system automatically identifies forms on your page and injects hidden fields containing attribution data without any setup.

## Will this slow down my website?

Performance impact is minimal. The script is lightweight and delivered via a global CDN, optimized to avoid blocking page rendering.

## Is it privacy-compliant (GDPR, CCPA)?

The tool respects Global Privacy Control (GPC) and Do Not Track (DNT) preferences by default. Data remains local to the user's browser until form submission. Compliance ultimately depends on your specific jurisdiction and use case, so consulting legal experts and updating privacy policies is recommended.

## How long is attribution data stored?

By default, data persists temporarily and clears when the browser closes (sessionStorage). You can configure localStorage for extended retention or cookies for cross-subdomain tracking.

## Can I customize which parameters are captured?

Yes. Use the `data-extra-params` attribute for custom URL parameters, or enable `data-click-ids="true"` to automatically capture ad platform click identifiers.

## Is this really free?

Yes, 100% free and open source under the Apache 2.0 license. No usage restrictions, premium tiers, or hidden costs.
