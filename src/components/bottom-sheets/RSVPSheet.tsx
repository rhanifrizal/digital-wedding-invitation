export function RSVPSheet() {
  return (
    <form className="space-y-4">
      <div>
        <label className="text-sm font-medium text-[#2f2a25]">Nama</label>
        <input
          type="text"
          placeholder="Nama anda"
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">Nombor Telefon</label>
        <input
          type="tel"
          placeholder="Contoh: 0123456789"
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">Kehadiran</label>
        <select className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]">
          <option value="">Pilih kehadiran</option>
          <option value="attending">Hadir</option>
          <option value="not_attending">Tidak hadir</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-[#2f2a25]">Bilangan Pax</label>
        <input
          type="number"
          min="1"
          placeholder="Contoh: 2"
          className="mt-2 w-full rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
        />
      </div>

      <button
        type="button"
        className="w-full rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
      >
        Hantar RSVP
      </button>
    </form>
  );
}