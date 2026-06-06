import { annualReports } from "@/data/reports";

export default function AnnualReports() {
  return (
    <section id="reports" className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <p className="text-center text-[#5A8F2D] uppercase tracking-widest text-xs font-semibold mb-2">
          TRANSPARENCY &amp; ACADEMIC REPORTS
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2E6D] text-center mb-3">
          Annual Reports
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
          We are committed to maintaining responsible use of every contribution received.
          Our academic year reports provide a clear overview of our financials and activities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {annualReports.map((report) => (
            <div
              key={report.year}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <p className="text-gray-500 text-sm mb-1">Academic Year</p>
              <h3 className="text-xl font-bold text-[#0A2E6D] mb-4">{report.year}</h3>

              <div className="space-y-3 mb-5">
                {report.donationReport && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A8F2D" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Donation Report (PDF)
                  </div>
                )}
                {report.expenditureReport && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A8F2D" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Expenditure Report (PDF)
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {report.donationReport && (
                  <a
                    href={report.donationReport}
                    download
                    className="inline-flex items-center justify-center gap-2 border border-[#0A2E6D] text-[#0A2E6D] px-4 py-2 rounded text-sm font-medium hover:bg-[#0A2E6D] hover:text-white transition-colors"
                  >
                    Download Donation Report
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                )}
                {report.expenditureReport && (
                  <a
                    href={report.expenditureReport}
                    download
                    className="inline-flex items-center justify-center gap-2 border border-[#5A8F2D] text-[#5A8F2D] px-4 py-2 rounded text-sm font-medium hover:bg-[#5A8F2D] hover:text-white transition-colors"
                  >
                    Download Expenditure Report
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
