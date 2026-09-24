/* eslint-disable react-refresh/only-export-components -- server-side image template, not a client refresh boundary */
import { ImageResponse } from '@vercel/og';
import { OG_META, type OGMeta } from '../shared/og-metadata.js';

export const config = { runtime: 'edge' };

const BG = '#0a0a0a';
const GREEN = '#00ff41';
const CYAN = '#00ccff';
const MUTED = '#888888';
const MUTED_DIM = '#666666';
const DIVIDER = '#222222';
const TEXT_LIGHT = '#e0e0e0';
const FONT = 'Courier New, Courier, monospace';

const STATUS_COLORS: Record<string, string> = {
  LIVE: '#00ff41',
  BETA: '#ffaa00',
  ARCHIVED: '#ff0055',
};

type InsightMeta = OGMeta & { lens: string; projectTitle: string; projectId: string; date: string };
type ProjectMeta = OGMeta & { id: string; status: string };

const PAGE_PATHS: Record<string, string> = {
  home: '/',
  leistungen: '/studio/leistungen',
  projekte: '/studio/projekte',
  lab: '/studio/lab',
  kontakt: '/kontakt',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  agb: '/agb',
};

const PAGE_ACCENTS: Record<string, string> = {
  home: GREEN,
  leistungen: '#ff685d',
  projekte: '#6478ff',
  lab: '#b9ff3f',
  kontakt: '#ff685d',
  impressum: '#aeb3ad',
  datenschutz: '#aeb3ad',
  agb: '#aeb3ad',
};

function isInsight(meta: OGMeta | undefined): meta is InsightMeta {
  return Boolean(meta?.lens);
}

function isProject(meta: OGMeta | undefined): meta is ProjectMeta {
  return Boolean(meta?.id && meta?.status);
}

function AccentBar() {
  return <div style={{ width: '4px', backgroundColor: GREEN, flexShrink: 0 }} />;
}

function BrandHeader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="52" height="63" viewBox="0 0 100 120" fill="none">
            <rect width="100" height="120" fill={BG} />
            <line x1="22" y1="12" x2="22" y2="108" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
            <line x1="78" y1="12" x2="78" y2="108" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
            <line x1="78" y1="12" x2="22" y2="60" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
            <line x1="78" y1="60" x2="22" y2="108" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: TEXT_LIGHT, fontSize: '24px', fontWeight: 700, fontFamily: FONT, letterSpacing: '2px' }}>
              SHAPENEURAL
            </span>
            <span style={{ color: CYAN, fontSize: '14px', fontFamily: FONT }}>
              Designed Intelligence.
            </span>
          </div>
        </div>
        <span style={{ color: MUTED_DIM, fontSize: '14px', fontFamily: FONT, marginTop: '8px' }}>
          shapeneural.com
        </span>
      </div>
      <div style={{ borderTop: `1px solid ${DIVIDER}`, width: '100%', marginTop: '16px' }} />
    </div>
  );
}

function FooterBar({ left, right, accentLeft }: { left: string; right: string; accentLeft?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderTop: `1px solid ${DIVIDER}`, width: '100%', marginBottom: '16px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: accentLeft ? '#ff0055' : MUTED, fontSize: '16px', fontFamily: FONT }}>{left}</span>
        <span style={{ color: MUTED, fontSize: '16px', fontFamily: FONT }}>{right}</span>
      </div>
    </div>
  );
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 3) + '...';
}

function renderInsight(meta: InsightMeta) {
  const title = meta.title as string;
  const desc = truncate(meta.description as string, 140);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: BG, fontFamily: FONT }}>
      <AccentBar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 48px 32px 40px' }}>
        <BrandHeader />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', borderLeft: `3px solid ${CYAN}`, paddingLeft: '8px' }}>
            <span style={{ color: CYAN, fontSize: '18px', fontFamily: FONT, letterSpacing: '2px', textTransform: 'uppercase' }}>
              {meta.lens}
            </span>
          </div>
          <span style={{
            color: GREEN, fontSize: '36px', fontWeight: 700, lineHeight: 1.3, fontFamily: FONT, marginTop: '8px',
          }}>
            {title}
          </span>
          <span style={{
            color: TEXT_LIGHT, fontSize: '20px', lineHeight: 1.5, fontFamily: FONT, marginTop: '12px', maxWidth: '950px',
          }}>
            {desc}
          </span>
        </div>
        <FooterBar
          left={`${meta.projectTitle} [${meta.projectId}]`}
          right={meta.date}
          accentLeft
        />
      </div>
    </div>
  );
}

function renderProject(meta: ProjectMeta) {
  const statusColor = STATUS_COLORS[meta.status] || MUTED;
  const firstSentence = (meta.description as string).split('.')[0] + '.';
  const desc = truncate(firstSentence, 140);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: BG, fontFamily: FONT }}>
      <AccentBar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 48px 32px 40px' }}>
        <BrandHeader />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: statusColor }} />
            <span style={{ color: MUTED, fontSize: '14px', fontFamily: FONT }}>
              {meta.id} // {meta.status}
            </span>
          </div>
          <span style={{
            color: GREEN, fontSize: '36px', fontWeight: 700, lineHeight: 1.2, fontFamily: FONT, marginTop: '10px',
          }}>
            {meta.title}
          </span>
          <span style={{
            color: TEXT_LIGHT, fontSize: '20px', lineHeight: 1.5, fontFamily: FONT, marginTop: '12px', maxWidth: '950px',
          }}>
            {desc}
          </span>
        </div>
        <FooterBar left="shapeneural.com" right="" />
      </div>
    </div>
  );
}

function renderPage(meta: OGMeta, slug: string) {
  const accent = PAGE_ACCENTS[slug] ?? GREEN;
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: BG, fontFamily: FONT }}>
      <div style={{ width: '10px', backgroundColor: accent, flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '42px 56px 38px 48px' }}>
        <BrandHeader />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', maxWidth: '1040px' }}>
          <span style={{ color: accent, fontSize: '16px', fontFamily: FONT, letterSpacing: '2px', textTransform: 'uppercase' }}>
            {slug === 'home' ? 'INDEPENDENT AI PRODUCT STUDIO' : slug.replace(/-/g, ' ')}
          </span>
          <span style={{ color: TEXT_LIGHT, fontSize: '54px', fontWeight: 700, lineHeight: 1.05, fontFamily: FONT, marginTop: '18px' }}>
            {meta.title}
          </span>
          <span style={{ color: MUTED, fontSize: '22px', lineHeight: 1.45, fontFamily: FONT, marginTop: '24px', maxWidth: '980px' }}>
            {truncate(meta.description, 190)}
          </span>
        </div>
        <FooterBar left="SHAPENEURAL / FRANKFURT / REMOTE" right="shapeneural.com" />
      </div>
    </div>
  );
}

function renderDefault() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: BG, fontFamily: FONT }}>
      <AccentBar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 48px 32px 40px' }}>
        <BrandHeader />
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: GREEN, fontSize: '56px', fontWeight: 700, letterSpacing: '4px', fontFamily: FONT }}>
            SHAPENEURAL
          </span>
        </div>
        <FooterBar left="shapeneural.com" right="Designed Intelligence" />
      </div>
    </div>
  );
}

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');

  let content;

  if (type === 'page' && slug) {
    const meta = OG_META[PAGE_PATHS[slug]];
    content = meta ? renderPage(meta, slug) : renderDefault();
  } else if (type && slug) {
    const path = type === 'project' ? `/studio/projekte/${slug}` : `/${type}/${slug}`;
    const meta = OG_META[path] ?? OG_META[`/${type}/${slug}`];

    if (meta && isInsight(meta)) {
      content = renderInsight(meta);
    } else if (meta && isProject(meta)) {
      content = renderProject(meta);
    } else {
      content = renderDefault();
    }
  } else {
    content = renderDefault();
  }

  return new ImageResponse(content, {
    width: 1200,
    height: 630,
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
}
