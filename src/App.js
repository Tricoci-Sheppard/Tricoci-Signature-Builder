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
    <div className="grid grid-cols-12 gap-3 items-center">
      <div className="col-span-12 md:col-span-3 text-sm text-gray-600">{label}</div>
      <div className="col-span-12 md:col-span-9">{children}</div>
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Tricoci University — Email Signature Builder</h1>
            <p className="text-sm text-gray-600">Fill the fields, preview on the right, then copy HTML for your email client.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={copyHtml} className="px-4 py-2 rounded-2xl bg-black text-white text-sm shadow hover:opacity-90">
              Copy HTML
            </button>
            <button onClick={exportPng} className="px-4 py-2 rounded-2xl bg-white border text-sm shadow hover:bg-gray-100">
              Export PNG
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 bg-white rounded-2xl shadow p-5 space-y-5">
            <Row label="Full name">
              <input className="w-full px-3 py-2 border rounded-xl" value={values.fullName} onChange={(e)=>handleChange("fullName", e.target.value)} />
            </Row>
            <Row label="Title">
              <input className="w-full px-3 py-2 border rounded-xl" value={values.title} onChange={(e)=>handleChange("title", e.target.value)} />
            </Row>
            <Row label="Work email">
              <input className="w-full px-3 py-2 border rounded-xl" value={values.email} onChange={(e)=>handleChange("email", e.target.value)} />
            </Row>
            <Row label="Mobile (optional)">
              <input className="w-full px-3 py-2 border rounded-xl" value={values.mobile} onChange={(e)=>handleChange("mobile", e.target.value)} />
            </Row>
            <Row label="Website">
              <input className="w-full px-3 py-2 border rounded-xl" value={values.website} onChange={(e)=>handleChange("website", e.target.value)} />
            </Row>
            <Row label="Campus address">
              <select className="w-full px-3 py-2 border rounded-xl" value={CAMPUSES.find(c=>c.address===values.address)?.label || "— Select campus —"} onChange={(e)=>{const sel=CAMPUSES.find(c=>c.label===e.target.value); handleChange("address", sel?.address || "");}}>
                {CAMPUSES.map((c)=>(<option key={c.label} value={c.label}>{c.label}</option>))}
              </select>
            </Row>
            <Row label="Address">
              <textarea className="w-full px-3 py-2 border rounded-xl" rows={2} value={values.address} onChange={(e)=>handleChange("address", e.target.value)} />
            </Row>
          </div>

          <div className="col-span-12 lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl shadow p-5">
              <h2 className="font-medium text-lg mb-3">Live Preview</h2>
              <div className="border rounded-xl p-4 overflow-auto">
                <div ref={previewRef}>
                  <div dangerouslySetInnerHTML={{ __html: htmlSignature }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatAddress(address) {
  if (!address) return "";
  const parts = address.split(",").map(p => p.trim());
  // CRC special case: keep '3rd floor' on the first line
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
    values.mobile ? `<span style="font-weight:bold;color:${text}">Mobile:</span> <a href="tel:${safe(values.mobile)}" style="color:${text};text-decoration:none">${safe(values.mobile)}</a>` : ""
  ].filter(Boolean).join("<br/>");

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
