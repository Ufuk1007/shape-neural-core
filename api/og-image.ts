import { ImageResponse } from '@vercel/og';
import { OG_META } from '../shared/og-metadata.js';

export const config = {
  runtime: 'edge',
};

const BG = '#050505';
const GREEN = '#00ff41';
const CYAN = '#00ccff';
const MUTED = '#888888';
const BRAND_MUTED = '#666666';
const BORDER = '#222222';

const STATUS_COLORS: Record<string, string> = {
  LIVE: '#00ff41',
  BETA: '#ffaa00',
  ARCHIVED: '#ff0055',
};

function isInsight(meta: any): meta is { lens: string; projectTitle: string; projectId: string; date: string } {
  return 'lens' in meta;
}

function isProject(meta: any): meta is { id: string; status: string } {
  return 'id' in meta && 'status' in meta;
}

function scanlineRows(count: number) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push({
      type: 'div',
      props: {
        key: i,
        style: {
          width: '100%',
          height: '1px',
          backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
        },
      },
    });
  }
  return rows;
}

function Scanlines() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '40px',
      overflow: 'hidden',
    }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
          }}
        />
      ))}
    </div>
  );
}

function renderInsight(meta: any) {
  const headlineParts = (meta.title as string).split(' // ');
  const mainTitle = headlineParts[0] || '';
  const subtitle = headlineParts[1] || '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        padding: '0',
        fontFamily: '"Courier New", monospace',
        borderLeft: `3px solid ${GREEN}`,
        border: `1px solid ${BORDER}`,
      }}
    >
      {/* Top padding + scanlines */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '30px 40px 0 40px' }}>
        <Scanlines />
      </div>

      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px 0 40px',
      }}>
        <span style={{ color: GREEN, opacity: 0.6, fontSize: '24px', fontWeight: 700 }}>SN_</span>
        <span style={{ color: BRAND_MUTED, fontSize: '18px', letterSpacing: '3px' }}>shapeneural</span>
      </div>

      {/* Content block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 40px',
        flex: 1,
        justifyContent: 'center',
      }}>
        {/* Lens tag line */}
        <div style={{
          display: 'flex',
          fontSize: '14px',
          color: CYAN,
          letterSpacing: '2px',
          marginBottom: '12px',
          textTransform: 'uppercase' as any,
        }}>
          ┌─ {meta.lens} ─────────────────────────────
        </div>

        {/* Headline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0 0 20px',
        }}>
          <span style={{
            color: GREEN,
            fontSize: '42px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '1px',
            textShadow: '0 0 20px rgba(0,255,65,0.3)',
          }}>
            {mainTitle} //
          </span>
          {subtitle && (
            <span style={{
              color: GREEN,
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '1px',
              textShadow: '0 0 20px rgba(0,255,65,0.3)',
              marginTop: '4px',
            }}>
              {subtitle}
            </span>
          )}
        </div>

        {/* Close bracket */}
        <div style={{
          display: 'flex',
          fontSize: '14px',
          color: CYAN,
          letterSpacing: '2px',
          marginTop: '12px',
        }}>
          └──────────────────────────────────────
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 40px 10px 40px',
      }}>
        <span style={{ color: MUTED, fontSize: '16px' }}>
          FROM: {meta.projectTitle} [{meta.projectId}]
        </span>
        <span style={{ color: MUTED, fontSize: '16px' }}>
          {meta.date}
        </span>
      </div>

      {/* Bottom scanlines */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 40px 30px 40px' }}>
        <Scanlines />
      </div>
    </div>
  );
}

function renderProject(meta: any) {
  const statusColor = STATUS_COLORS[meta.status] || MUTED;
  // Split title for large display
  const titleParts = (meta.title as string).replace(/\./g, '.').split('_');
  const firstSentence = (meta.description as string).split('.')[0] + '.';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        padding: '0',
        fontFamily: '"Courier New", monospace',
        borderLeft: `3px solid ${GREEN}`,
        border: `1px solid ${BORDER}`,
      }}
    >
      {/* Top scanlines */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '30px 40px 0 40px' }}>
        <Scanlines />
      </div>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px 0 40px',
      }}>
        <span style={{ color: GREEN, opacity: 0.6, fontSize: '24px', fontWeight: 700 }}>SN_</span>
        <span style={{ color: BRAND_MUTED, fontSize: '18px', letterSpacing: '3px' }}>shapeneural</span>
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 40px',
        flex: 1,
        justifyContent: 'center',
      }}>
        {/* Module + Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ color: statusColor, fontSize: '16px' }}>●</span>
          <span style={{ color: MUTED, fontSize: '16px', letterSpacing: '2px' }}>
            {meta.id} // {meta.status}
          </span>
        </div>

        {/* Title */}
        <span style={{
          color: GREEN,
          fontSize: '56px',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '2px',
          textShadow: '0 0 20px rgba(0,255,65,0.3)',
        }}>
          {meta.title}
        </span>

        {/* Description */}
        <span style={{
          color: MUTED,
          fontSize: '20px',
          lineHeight: 1.4,
          marginTop: '20px',
          maxWidth: '900px',
        }}>
          {firstSentence.length > 120 ? firstSentence.slice(0, 117) + '...' : firstSentence}
        </span>
      </div>

      {/* Bottom scanlines */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 40px 30px 40px' }}>
        <Scanlines />
      </div>
    </div>
  );
}

function renderDefault() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        fontFamily: '"Courier New", monospace',
        borderLeft: `3px solid ${GREEN}`,
        border: `1px solid ${BORDER}`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ color: GREEN, fontSize: '64px', fontWeight: 700, letterSpacing: '4px', textShadow: '0 0 20px rgba(0,255,65,0.3)' }}>
        SHAPENEURAL
      </span>
      <span style={{ color: MUTED, fontSize: '22px', marginTop: '16px', letterSpacing: '6px' }}>
        DESIGNED INTELLIGENCE
      </span>
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
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
