import Link from "next/link";

export default function SummerIntensive() {
  return (
    <main>
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 md:pt-20 pb-16 md:pb-24">
        <h1 className="hero-title text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] leading-[0.98] tracking-normal mb-4 sm:mb-6 font-semibold">
          <span className="text-accent">Summer Intensive</span>
        </h1>

        <div className="text-[17px] sm:text-[19px] leading-[1.7] text-text mb-8 space-y-4">
          <p className="font-semibold">
            Applications for the Summer 2026 intensive are now closed.
          </p>

          <hr className="border-t border-gray-200 !my-8" />

          <p>
            Mornings are discussions on threat models, mechanistic interpretability, RLHF, scalable oversight, and more. Afternoons are technical sessions where you leave with a GitHub repo or technical writeup. Compute and API credits covered.
          </p>
          <ul className="space-y-2 pl-0 list-none">
            <li className="flex gap-2.5">
              <span className="text-accent font-bold shrink-0">&#8594;</span>
              <span>One day/week (Sat or Sun), <strong>compatible with internships or other summer commitments</strong></span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-accent font-bold shrink-0">&#8594;</span>
              <span>Hosted at Trajectory Labs, an off-campus AI safety lab near King Station</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-accent font-bold shrink-0">&#8594;</span>
              <span>Free lunch with AI safety researchers</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-accent font-bold shrink-0">&#8594;</span>
              <span>Leave with finished projects for your portfolio</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-accent font-bold shrink-0">&#8594;</span>
              <span>Top participants get research opportunities after</span>
            </li>
          </ul>
          <p>
            Cohorts monthly May&ndash;August. No prior ML or AI safety experience required.
          </p>
        </div>

        <div className="border border-black/10 p-5 sm:p-6 max-w-[560px]">
          <p className="text-[15px] sm:text-[16px] leading-[1.7] text-text mb-4">
            <strong>Are you a researcher or Trajectory Labs staff?</strong> Let us know
            which lunch dates work for you — cohorts are looking forward to meeting you.
          </p>
          <Link
            href="/summer-intensive/researcher-lunches"
            className="primary-cta px-6 py-3 text-[15px]"
          >
            Mark your availability &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
