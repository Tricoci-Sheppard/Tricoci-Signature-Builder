import React, { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";

const BRAND = {
  primary: "#0b5a46",
  text: "#111111",
  headline: "#8BC53F"
};

const DEFAULTS = {
  org: "Tricoci University of Beauty Culture",
  tagline: "CELEBRATING 20+ YEARS OF CHANGING LIVES",
  website: "www.tricociuniversity.edu",
  address: "",
  logoUrl: "https://www.tricociuniversity.edu/wp-content/uploads/2025/10/TUBC-Sig-Logo-2.png"
};

const CAMPUSES = [
  { label: "— Select campus —", address: "" },
  { label: "Bridgeview, IL", address: "7350 West 87th Street, Bridgeview, IL" },
  { label: "Chicago NW (O'Hare), IL", address: "5321 North Harlem Avenue, Chicago, IL" },
  { label: "Chicago NE (Rogers Park), IL", address: "6458 North Sheridan Road, Chicago, IL" },
  { label: "Elgin, IL ", address: "264 South Randall Road, Elgin, IL 60123" },
  { label: "Glendale Heights, IL", address: "530 East North Avenue, Glendale Heights, IL" },
  { label: "Libertyville, IL", address: "751 East Park Avenue, Libertyville, IL 60048" },
  { label: "Normal, IL", address: "755 W Raab Road, Normal, IL" },
  { label: "Peoria, IL", address: "602 West Glen Avenue, Peoria, IL 61614" },
  { label: "Rockford, IL", address: "5485 East State Street, Rockford, IL 61108" },
  { label: "Urbana, IL", address: "202 East University Avenue, Urbana, IL 61801" },
  { label: "Bloomington, IN", address: "1681 N College Avenue, Bloomington, IN 47404" },
  { label: "Highland, IN", address: "2549 Highway Avenue, Highland, IN 46322" },
  { label: "Indianapolis, IN", address: "9725 Crosspoint Commons, Indianapolis, IN 46256" },
  { label: "Lafayette, IN", address: "833 Ferry Street, Lafayette, IN 47901" },
  { label: "Janesville, WI", address: "2310 W Court Street, Janesville, WI 53548" },
  { label: "CRC, IL ", address: "222 S. Prospect Avenue, 3rd floor, Park Ridge, IL 60068" }
];

function Row({ label, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

export default function SignatureBuilder() {
  const [values, setValues] = useState({
    fullName: "First Last",
    title: "Your Title",
    campus: "",
    mobile: "",
    email: "",
    website: DEFAULTS.website,
    address: "",
    logoUrl: DEFAULTS.logoUrl,
    headshotUrl: "",
    showHeadshot: true
  });

  const previewRef = useRef(null);

  function handleChange(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  const htmlSignature = useMemo(() => buildHtml(values), [values]);

  async function copyHtml() {
    await navigator.clipboard.writeText(htmlSignature);
    alert("Copied to clipboard");
  }

  async function exportPng() {
    if (!previewRef.current) return;
    const dataUrl = await toPng(previewRef.current, { pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "tricoci-signature.png";
    a.click();
  }

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, system-ui, sans-serif', color: '#111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '600', margin: 0 }}>Tricoci University — Email Signature Builder</h1>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>Fill out the fields below to generate your signature.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={copyHtml} style={buttonPrimary}>Copy HTML</button>
            <button onClick={exportPng} style={buttonSecondary}>Export PNG</button>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={cardStyle}>
            <Row label="Full name">
              <input style={inputStyle} value={values.fullName} onChange={(e)=>handleChange("fullName", e.target.value)} />
            </Row>
            <Row label="Title">
              <input style={inputStyle} value={values.title} onChange={(e)=>handleChange("title", e.target.value)} />
            </Row>
            <Row label="Work email">
              <input style={inputStyle} value={values.email} onChange={(e)=>handleChange("email", e.target.value)} />
            </Row>
            <Row label="Mobile (optional)">
              <input style={inputStyle} value={values.mobile} onChange={(e)=>handleChange("mobile", e.target.value)} />
            </Row>
            <Row label="Website">
              <input style={inputStyle} value={values.website} onChange={(e)=>handleChange("website", e.target.value)} />
            </Row>
            <Row label="Campus address">
              <select style={inputStyle} value={CAMPUSES.find(c=>c.address===values.address)?.label || "— Select campus —"} onChange={(e)=>{const sel=CAMPUSES.find(c=>c.label===e.target.value); handleChange("address", sel?.address || "");}}>
                {CAMPUSES.map((c)=>(<option key={c.label} value={c.label}>{c.label}</option>))}
              </select>
            </Row>
            <Row label="Address">
              <textarea style={{...inputStyle, minHeight:'80px'}} rows={2} value={values.address} onChange={(e)=>handleChange("address", e.target.value)} />
            </Row>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Live Preview</h2>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', background: '#fff' }}>
              <div ref={previewRef}>
                <div dangerouslySetInnerHTML={{ __html: htmlSignature }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#ffffff',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #e5e7eb'
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  fontSize: '0.9rem',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  background: '#fff'
};

const buttonPrimary = {
  background: '#0b5a46',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500'
};

const buttonSecondary = {
  background: '#fff',
  color: '#111',
  border: '1px solid #d1d5db',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500'
};

function formatAddress(address) {
  if (!address) return "";
  const parts = address.split(",").map((p) => p.trim());
  if (address.includes("3rd floor")) {
    return `${parts[0]}, ${parts[1]}<br/>${parts.slice(2).join(", ")}`;
  }
  if (parts.length >= 3) {
    return `${parts[0]}<br/>${parts[1]}, ${parts[2]}`;
  }
  return address;
}

function buildHtml(values) {
  const text = BRAND.text;
  const headline = BRAND.headline;
  const safe = (s) => s || "";

  const phoneBlock = [
    values.mobile
      ? `<span style="font-weight:bold;color:${text}">Mobile:</span> <a href="tel:${safe(values.mobile)}" style="color:${text};text-decoration:none">${safe(values.mobile)}</a>`
      : ""
  ]
    .filter(Boolean)
    .join("<br/>");

  return `
<table cellpadding="0" cellspacing="0" role="presentation" style="font-family:Arial,Helvetica,sans-serif;color:${text};font-size:14px;line-height:1.35">
  <tr>
    <td valign="top" style="padding-right:20px">
      <img src="${safe(DEFAULTS.logoUrl)}" alt="Tricoci University" width="220" style="display:block;width:220px;height:auto;margin-bottom:12px" />
    </td>
    <td valign="top">
      <div style="font-size:24px;font-weight:800;color:${headline}">${safe(values.fullName)}</div>
      <div style="font-size:16px;font-weight:600;color:${text}">${safe(values.title)}</div>
      <div style="font-size:14px;line-height:20px;margin-top:8px">${formatAddress(safe(values.address))}</div>
      ${phoneBlock ? `<div style="margin-top:8px">${phoneBlock}</div>` : ""}
      ${values.email ? `<div><span style="font-weight:bold;color:${text}">Email:</span> <a href="mailto:${safe(values.email)}" style="color:${text};text-decoration:none">${safe(values.email)}</a></div>` : ""}
      ${values.website ? `<div><a href="https://www.tricociuniversity.edu" style="color:${text};text-decoration:none">${safe(values.website)}</a></div>` : ""}
      <div style="color:${headline};font-weight:800;font-style:italic;margin-top:14px;text-transform:uppercase;letter-spacing:0.5px">${DEFAULTS.tagline}</div>
    </td>
  </tr>
</table>
<div style="font-size:10px;font-weight:bold;color:#666;margin-top:12px;max-width:600px;line-height:1.4">
  This message and any accompanying document(s) contain information for the sole use of the above-intended recipient(s) and may contain privileged or confidential information. Any other distribution or use of this communication is strictly prohibited. Please notify this office immediately by return email if you are not the intended recipient and delete this message and any attachments.
</div>`;
}
