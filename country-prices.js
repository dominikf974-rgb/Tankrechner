/* /prices/country-prices.js
   Stand: 2025-01-01 (manuell)
   Einheit: EUR pro Liter
   Felder:
   - unleaded91  = Benzin (E10/91)  (≈ Regular)
   - unleaded95  = Super (E5/95)    (≈ Premium)
   - diesel      = Diesel
*/
(function () {
  const COUNTRY_FUEL_PRICES_EUR = {
    // --- Europa ---
    DE: { unleaded91: 1.85, unleaded95: 1.95, diesel: 1.80, name: "Deutschland" }, // Backup (DE live via Tankerkoenig)
    AT: { unleaded91: 1.75, unleaded95: 1.85, diesel: 1.72, name: "Österreich" },
    CH: { unleaded91: 1.95, unleaded95: 2.05, diesel: 1.92, name: "Schweiz" },
    FR: { unleaded91: 1.85, unleaded95: 1.95, diesel: 1.82, name: "Frankreich" },
    IT: { unleaded91: 1.90, unleaded95: 2.00, diesel: 1.88, name: "Italien" },
    ES: { unleaded91: 1.65, unleaded95: 1.75, diesel: 1.62, name: "Spanien" },
    PT: { unleaded91: 1.75, unleaded95: 1.85, diesel: 1.75, name: "Portugal" },
    NL: { unleaded91: 2.05, unleaded95: 2.15, diesel: 1.95, name: "Niederlande" },
    BE: { unleaded91: 1.85, unleaded95: 1.95, diesel: 1.80, name: "Belgien" },
    LU: { unleaded91: 1.70, unleaded95: 1.80, diesel: 1.65, name: "Luxemburg" },
    DK: { unleaded91: 1.95, unleaded95: 2.05, diesel: 1.90, name: "Dänemark" },
    SE: { unleaded91: 1.95, unleaded95: 2.05, diesel: 1.90, name: "Schweden" },
    NO: { unleaded91: 2.10, unleaded95: 2.20, diesel: 2.05, name: "Norwegen" },
    FI: { unleaded91: 1.95, unleaded95: 2.05, diesel: 1.90, name: "Finnland" },
    IS: { unleaded91: 2.20, unleaded95: 2.30, diesel: 2.10, name: "Island" },
    GB: { unleaded91: 2.00, unleaded95: 2.10, diesel: 2.05, name: "Vereinigtes Königreich" },
    IE: { unleaded91: 1.90, unleaded95: 2.00, diesel: 1.90, name: "Irland" },

    PL: { unleaded91: 1.55, unleaded95: 1.65, diesel: 1.55, name: "Polen" },
    CZ: { unleaded91: 1.55, unleaded95: 1.65, diesel: 1.60, name: "Tschechien" },
    SK: { unleaded91: 1.60, unleaded95: 1.70, diesel: 1.60, name: "Slowakei" },
    HU: { unleaded91: 1.55, unleaded95: 1.65, diesel: 1.60, name: "Ungarn" },
    SI: { unleaded91: 1.65, unleaded95: 1.75, diesel: 1.65, name: "Slowenien" },
    HR: { unleaded91: 1.60, unleaded95: 1.70, diesel: 1.60, name: "Kroatien" },
    RO: { unleaded91: 1.45, unleaded95: 1.55, diesel: 1.50, name: "Rumänien" },
    BG: { unleaded91: 1.35, unleaded95: 1.45, diesel: 1.40, name: "Bulgarien" },
    GR: { unleaded91: 1.95, unleaded95: 2.05, diesel: 1.90, name: "Griechenland" },
    TR: { unleaded91: 1.25, unleaded95: 1.35, diesel: 1.20, name: "Türkei" },

    EE: { unleaded91: 1.65, unleaded95: 1.75, diesel: 1.60, name: "Estland" },
    LV: { unleaded91: 1.60, unleaded95: 1.70, diesel: 1.55, name: "Lettland" },
    LT: { unleaded91: 1.55, unleaded95: 1.65, diesel: 1.50, name: "Litauen" },

    UA: { unleaded91: 1.25, unleaded95: 1.35, diesel: 1.25, name: "Ukraine" },
    BY: { unleaded91: 0.95, unleaded95: 1.05, diesel: 0.95, name: "Belarus" },
    RU: { unleaded91: 0.65, unleaded95: 0.70, diesel: 0.68, name: "Russland" },

    // --- Nordamerika ---
    US: { unleaded91: 1.05, unleaded95: 1.15, diesel: 1.20, name: "USA" },
    CA: { unleaded91: 1.30, unleaded95: 1.40, diesel: 1.35, name: "Kanada" },
    MX: { unleaded91: 1.20, unleaded95: 1.30, diesel: 1.15, name: "Mexiko" },

    // --- Südamerika ---
    BR: { unleaded91: 1.25, unleaded95: 1.35, diesel: 1.20, name: "Brasilien" },
    AR: { unleaded91: 1.10, unleaded95: 1.20, diesel: 1.05, name: "Argentinien" },
    CL: { unleaded91: 1.35, unleaded95: 1.45, diesel: 1.30, name: "Chile" },
    CO: { unleaded91: 1.10, unleaded95: 1.20, diesel: 1.05, name: "Kolumbien" },
    PE: { unleaded91: 1.20, unleaded95: 1.30, diesel: 1.15, name: "Peru" },
    UY: { unleaded91: 1.70, unleaded95: 1.80, diesel: 1.65, name: "Uruguay" },

    // --- Ozeanien ---
    AU: { unleaded91: 1.35, unleaded95: 1.45, diesel: 1.40, name: "Australien" },
    NZ: { unleaded91: 1.80, unleaded95: 1.90, diesel: 1.70, name: "Neuseeland" },

    // --- Asien ---
    JP: { unleaded91: 1.75, unleaded95: 1.85, diesel: 1.70, name: "Japan" },
    KR: { unleaded91: 1.80, unleaded95: 1.90, diesel: 1.75, name: "Südkorea" },
    CN: { unleaded91: 1.20, unleaded95: 1.30, diesel: 1.10, name: "China" },
    HK: { unleaded91: 2.60, unleaded95: 2.70, diesel: 2.40, name: "Hongkong" },
    TW: { unleaded91: 1.15, unleaded95: 1.25, diesel: 1.05, name: "Taiwan" },
    SG: { unleaded91: 2.20, unleaded95: 2.30, diesel: 2.10, name: "Singapur" },
    MY: { unleaded91: 0.55, unleaded95: 0.65, diesel: 0.50, name: "Malaysia" },
    TH: { unleaded91: 1.20, unleaded95: 1.30, diesel: 1.15, name: "Thailand" },
    VN: { unleaded91: 1.05, unleaded95: 1.15, diesel: 0.95, name: "Vietnam" },
    ID: { unleaded91: 0.95, unleaded95: 1.05, diesel: 0.85, name: "Indonesien" },
    PH: { unleaded91: 1.05, unleaded95: 1.15, diesel: 0.95, name: "Philippinen" },
    IN: { unleaded91: 1.10, unleaded95: 1.20, diesel: 1.05, name: "Indien" },
    PK: { unleaded91: 0.95, unleaded95: 1.05, diesel: 0.90, name: "Pakistan" },
    BD: { unleaded91: 1.00, unleaded95: 1.10, diesel: 0.95, name: "Bangladesch" },
    LK: { unleaded91: 1.20, unleaded95: 1.30, diesel: 1.10, name: "Sri Lanka" },

    // Nahost
    AE: { unleaded91: 0.85, unleaded95: 0.95, diesel: 0.80, name: "VAE" },
    SA: { unleaded91: 0.60, unleaded95: 0.70, diesel: 0.55, name: "Saudi-Arabien" },
    QA: { unleaded91: 0.70, unleaded95: 0.80, diesel: 0.65, name: "Katar" },
    KW: { unleaded91: 0.45, unleaded95: 0.55, diesel: 0.45, name: "Kuwait" },
    OM: { unleaded91: 0.65, unleaded95: 0.75, diesel: 0.60, name: "Oman" },
    IL: { unleaded91: 2.00, unleaded95: 2.10, diesel: 1.95, name: "Israel" },
    IR: { unleaded91: 0.20, unleaded95: 0.25, diesel: 0.20, name: "Iran" },

    // --- Afrika (wichtige Beispiele) ---
    ZA: { unleaded91: 1.35, unleaded95: 1.45, diesel: 1.30, name: "Südafrika" },
    EG: { unleaded91: 0.75, unleaded95: 0.85, diesel: 0.70, name: "Ägypten" },
    MA: { unleaded91: 1.45, unleaded95: 1.55, diesel: 1.35, name: "Marokko" },
    TN: { unleaded91: 0.95, unleaded95: 1.05, diesel: 0.90, name: "Tunesien" },
    NG: { unleaded91: 0.60, unleaded95: 0.70, diesel: 0.55, name: "Nigeria" },
    KE: { unleaded91: 1.45, unleaded95: 1.55, diesel: 1.35, name: "Kenia" }
  };

  window.COUNTRY_FUEL_PRICES_EUR = COUNTRY_FUEL_PRICES_EUR;
  window.COUNTRY_FUEL_PRICES_STAND = "2025-01-01";
})();
