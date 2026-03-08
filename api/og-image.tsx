import { ImageResponse } from '@vercel/og';
import { OG_META } from '../shared/og-metadata.js';

export const config = { runtime: 'edge' };

const BG = '#050505';
const GREEN = '#00ff41';
const CYAN = '#00ccff';
const MUTED = '#888888';
const BRAND_MUTED = '#666666';
const GREEN_60 = '#00ff4199';
const GREEN_40 = '#00ff4166';

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

function ScanlineCluster() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ width: '100%', height: '1px', backgroundColor: GREEN, opacity: 0.15 }} />
      ))}
    </div>
  );
}

function TopBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: GREEN_60, fontSize: '20px', fontWeight: 700, fontFamily: 'Courier New, monospace' }}>SN_</span>
      <span style={{ color: BRAND_MUTED, fontSize: '16px', fontFamily: 'Courier New, monospace' }}>shapeneural.com</span>
    </div>
  );
}

function BottomBar({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: MUTED, fontSize: '16px', fontFamily: 'Courier New, monospace' }}>{left}</span>
      <span style={{ color: MUTED, fontSize: '16px', fontFamily: 'Courier New, monospace' }}>{right}</span>
    </div>
  );
}

function renderInsight(meta: any) {
  const parts = (meta.title as string).split(' // ');
  const main = parts[0] || '';
  const sub = parts[1] || '';

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: BG,
      fontFamily: 'Courier New, monospace',
    }}>
      {/* Left accent bar */}
      <div style={{ width: '4px', backgroundColor: GREEN, flexShrink: 0 }} />

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '40px 48px',
      }}>
        <TopBar />
        <ScanlineCluster />

        {/* Center block */}
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${GREEN_40}`,
            padding: '24px 32px',
            width: '100%',
          }}>
            <span style={{ color: CYAN, fontSize: '18px', marginBottom: '16px', fontFamily: 'Courier New, monospace' }}>
              {meta.lens}
            </span>
            <span style={{
              color: GREEN,
              fontSize: '42px',
              fontWeight: 700,
              lineHeight: 1.2,
              fontFamily: 'Courier New, monospace',
            }}>
              {main} //
            </span>
            {sub && (
              <span style={{
                color: GREEN,
                fontSize: '42px',
                fontWeight: 700,
                lineHeight: 1.2,
                fontFamily: 'Courier New, monospace',
              }}>
                {sub}
              </span>
            )}
          </div>
        </div>

        <ScanlineCluster />
        <BottomBar
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
  const desc = firstSentence.length > 120 ? firstSentence.slice(0, 117) + '...' : firstSentence;

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: BG,
      fontFamily: 'Courier New, monospace',
    }}>
      <div style={{ width: '4px', backgroundColor: GREEN, flexShrink: 0 }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '40px 48px',
      }}>
        <TopBar />
        <ScanlineCluster />

        <div style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '5px', backgroundColor: statusColor }} />
            <span style={{ color: MUTED, fontSize: '16px', fontFamily: 'Courier New, monospace' }}>
              [{meta.id}] // {meta.status}
            </span>
          </div>

          <span style={{
            color: GREEN,
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.1,
            fontFamily: 'Courier New, monospace',
          }}>
            {meta.title}
          </span>

          <span style={{
            color: MUTED,
            fontSize: '18px',
            lineHeight: 1.4,
            marginTop: '16px',
            maxWidth: '900px',
            fontFamily: 'Courier New, monospace',
          }}>
            {desc}
          </span>
        </div>

        <ScanlineCluster />
        <BottomBar left="shapeneural.com" right="" />
      </div>
    </div>
  );
}

function renderDefault() {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: BG,
      fontFamily: 'Courier New, monospace',
    }}>
      <div style={{ width: '4px', backgroundColor: GREEN, flexShrink: 0 }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ color: GREEN, fontSize: '64px', fontWeight: 700, letterSpacing: '4px' }}>SHAPENEURAL</span>
        <span style={{ color: MUTED, fontSize: '22px', marginTop: '16px', letterSpacing: '6px' }}>DESIGNED INTELLIGENCE</span>
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
