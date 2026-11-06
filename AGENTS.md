<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Company contact data and WhatsApp links come only from `src/lib/site.ts` (`waLink`); never hardcode the number elsewhere so it changes in one place.
- Service landings are one template (`src/routes/servicios.$slug.tsx`) fed by `src/lib/services.ts`; add a service by adding data, not a new route file.
- Contact form submissions are validated with zod and stored server-side in `contact_submissions` via a server function; never simulate sends.
- The home single-view lead form reuses the contact server function; optional building/company and city are validated and stored with the request text so all lead context is retained in the existing storage.
- Master service navigation uses `MASTER_SERVICES` and the dynamic service template; legacy elevator detail URLs permanently redirect to matching consolidated-page anchors so existing inbound links continue working.
- Shared delegated link tracking emits `click_whatsapp` and `click_llamar` to dataLayer; forms emit `Lead` only after a successful server response.
- Home and Contact share ContactForm; its contact-page variant selects a service and retains submitted context for WhatsApp so both pages use the same validated storage flow. Contact service options and WhatsApp formatting live in a browser-safe helper to avoid duplicating presentation logic.
- The consolidated elevator view uses data-backed alternating blocks and the shared NormativeSection also used by Home, avoiding duplicate approved copy.
- Contact service preselection is validated browser-safe query state mapped to existing dropdown labels; stored submissions keep the shared validated flow.
- Sitemap URLs derive from explicit route inclusion decisions and the current service inventory, excluding redirects and avoiding invented last-modified timestamps.
- Document-supplied service photos use CDN pointers registered in the central image catalog with original dimensions; service data owns their assignments and galleries so distribution stays auditable.
