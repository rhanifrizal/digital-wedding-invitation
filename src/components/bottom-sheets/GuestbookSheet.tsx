export function GuestbookSheet() {
  return (
    <div className="space-y-6">
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
          <label className="text-sm font-medium text-[#2f2a25]">Ucapan</label>
          <textarea
            rows={4}
            placeholder="Tulis ucapan anda..."
            className="mt-2 w-full resize-none rounded-2xl border border-[#ead8bc] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58a54]"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-[#2f2a25] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4a3b31]"
        >
          Hantar Ucapan
        </button>
      </form>

      <div className="rounded-3xl border border-[#ead8bc] bg-white/70 p-5">
        <p className="font-medium text-[#2f2a25]">Contoh Ucapan</p>
        <p className="mt-2 text-sm leading-6 text-[#7a6b5e]">
          Semoga perkahwinan ini diberkati dan menjadi permulaan hidup yang
          penuh bahagia.
        </p>
      </div>
    </div>
  );
}