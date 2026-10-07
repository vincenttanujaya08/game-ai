export default function MaintenancePage() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-mark" aria-hidden="true">N</div>
      <p className="maintenance-eyebrow">NUSA LAB</p>
      <h1>Situs sedang dalam pemeliharaan</h1>
      <p className="maintenance-copy">
        Kami sedang melakukan perbaikan agar pengalaman belajar kamu lebih baik.
        Silakan coba kembali beberapa saat lagi.
      </p>
      <span className="maintenance-status"><span /> Maintenance berlangsung</span>
    </main>
  );
}
