import { ImageResponse } from '@vercel/og';
import { OG_META } from '../shared/og-metadata.js';

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

// SN Bindrune logo as inline SVG data URI
const SN_LOGO_SVG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="77" viewBox="0 0 100 120" fill="none"><rect width="100" height="120" fill="${BG}"/><line x1="22" y1="12" x2="22" y2="108" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/><line x1="78" y1="12" x2="78" y2="108" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/><line x1="78" y1="12" x2="22" y2="60" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/><line x1="78" y1="60" x2="22" y2="108" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/></svg>`
)}`;

function isInsight(meta: any): meta is { lens: string; projectTitle: string; projectId: string; date: string; description: string } {
  return 'lens' in meta;
}

function isProject(meta: any): meta is { id: string; status: string; description: string } {
  return 'id' in meta && 'status' in meta;
}

function AccentBar() {
  return <div style={{ width: '4px', backgroundColor: GREEN, flexShrink: 0 }} />;
}

function BrandHeader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={SN_LOGO_SVG} width={52} height={63} style={{ display: 'block' }} />
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
      <div style={{ borderTop: `1px solid ${DIVIDER}`, width: '100%', marginTop: '20px' }} />
    </div>
  );
}

function FooterBar({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderTop: `1px solid ${DIVIDER}`, width: '100%', marginBottom: '20px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: MUTED, fontSize: '14px', fontFamily: FONT }}>{left}</span>
        <span style={{ color: MUTED, fontSize: '14px', fontFamily: FONT }}>{right}</span>
      </div>
    </div>
  );
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 3) + '...';
}

function renderInsight(meta: any) {
  const title = meta.title as string;
  const desc = truncate(meta.description as string, 140);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: BG, fontFamily: FONT }}>
      <AccentBar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 48px 32px 40px' }}>
        <BrandHeader />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: CYAN, fontSize: '14px', fontFamily: FONT, letterSpacing: '2px', textTransform: 'uppercase' as any }}>
            {meta.lens}
          </span>
          <span style={{
            color: GREEN, fontSize: '28px', fontWeight: 700, lineHeight: 1.3, fontFamily: FONT, marginTop: '8px',
          }}>
            {title}
          </span>
          <span style={{
            color: MUTED, fontSize: '16px', lineHeight: 1.5, fontFamily: FONT, marginTop: '12px', maxWidth: '950px',
          }}>
            {desc}
          </span>
        </div>
        <FooterBar
          left={`${meta.projectTitle} [${meta.projectId}]`}
          right={meta.date}
        />
      </div>
    </div>
  );
}

function renderProject(meta: any) {
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
            color: MUTED, fontSize: '16px', lineHeight: 1.5, fontFamily: FONT, marginTop: '12px', maxWidth: '950px',
          }}>
            {desc}
          </span>
        </div>
        <FooterBar left="shapeneural.com" right="" />
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

  if (type && slug) {
    const path = `/${type}/${slug}`;
    const meta = OG_META[path];

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
