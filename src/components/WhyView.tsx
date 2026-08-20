// src/components/WhyView.tsx
import { theme } from '../constants/theme';

export function WhyView() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Why August, Not January?</h1>
      <div style={styles.content}>
        <p>
          The absolute proof that the true cosmic year begins in <strong>August</strong>—and can never begin in January or September—is written directly in front of our eyes, especially here in the Southern Hemisphere. Ancient Africans did not rely on artificial, foreign timelines; they simply looked up at the living canvas of the sky to read the uncorrupted clockwork of nature. All these occurrences vibrate around us in real time. We do not need complex, engineered theology to see them; we simply need to tap into these natural frequencies and apply universal common sense.
        </p>

        <p>
          The cosmic matrix of time operates through the <strong>7 Planetary Gods / Celestial Bodies</strong>, which systematically rule the days of the week, the calendar months, and the human chakra system. These seven bodies move in a strict, unchangeable hierarchy: the <strong>Sun</strong> leads, followed by the <strong>Moon, Mercury, Venus, Mars, Jupiter</strong>, and finally, <strong>Saturn</strong>. This exact sequence dictates the rhythm of our weeks, moving from Sunday (ruled by the Sun) sequentially down to Saturday (ruled by Saturn).
        </p>

        <p>
          This celestial hierarchy is mirrored perfectly within the human energetic anatomy. Your first and highest energy point is the <strong>Crown Chakra</strong>, the seat of higher consciousness and cosmic intelligence, which is ruled exclusively by the <strong>Sun</strong>. At the very bottom of the highway sits the seventh energy point, the <strong>Root Chakra</strong>, which governs physical density and survival, ruled by <strong>Saturn</strong>. Common sense dictates that the root chakra can never supersede or lead the crown. The Crown Chakra resides in the head and brain, where the pure fire energy of the Sun ignites, boiling the spiritual water in your body and driving human behavior through your thoughts. When the brain stops working, the vessel is dead. Because the Sun is the first celestial body leading the crown, and Saturn is the seventh body ruling the root, the cycle must flow from the top down. The Sun rules everything, and the Moon naturally follows.
        </p>

        <p>
          Without any further ado, the calendar months are similarly governed by these planetary gods and their respective star signs:
        </p>

        <ul style={styles.list}>
          <li>
            <strong>Month 01 (August) — Ruled by the Sun (Leo / Fire Element):</strong> The true beginning of the cycle, where the solar fire ignites creation.
          </li>
          <li>
            <strong>Month 02 (September) — Ruled by Mercury:</strong> The immediate sequential step down of mental processing.
          </li>
          <li>
            <strong>Month 12 (July) — Ruled by the Moon (Cancer / Water Element):</strong> The ultimate closing of the womb of the year.
          </li>
          <li>
            <strong>January — Ruled by Saturn (Capricorn):</strong> A distorted, mid-summer solar peak that is falsely celebrated as a beginning, while spiritually locked in the cold, restrictive density of the root chakra.
          </li>

        </ul>

        <p>
          Since the Sun rules the entire system and always leads the process, it is a basic law of nature that the month ruled by the Sun must start the calendar year. Therefore, August is definitively the first month, and July is the absolute last. This macro-cosmic law is proven every single morning on the micro-scale of a day. It is the Sun that rises first to give birth to a brand-new day, while the Moon symbolizes the closing and completion of that day. Modern linear systems claim that a new day begins in the pitch-black darkness of midnight when the Moon is active. But common sense asks: when did that midnight Moon rise? It did not rise to start the day; it rose yesterday. It is a remnant of the old cycle, not the architect of the new one.
        </p>

        <p>
          This paradigm of August being the first month of the year is not a new invention; it is a profound <strong>restoration</strong>. It completely predates modern calendar systems, including the Gregorian calendar, which is merely a 16th-century derivative of the Julian calendar established in 1582 outside of Africa. Living under both cycles demands a <strong>LuniSolar system</strong>; a calendar cannot logically be restricted to just one when we are influenced by both the Sun and the Moon. To prove this historical reality, ancient Egypt celebrated their new year exactly after the heliacal rise of Sirius, and our neighbors in Lesotho, within South Africa, explicitly begin their traditional calendar year in August.
        </p>

        <p>
          It defies nature for a new year, especially in the Southern Hemisphere, to commence in the middle of summer. A true year begins in Spring when the Earth rebirths, renews, and rejuvenates right in front of our eyes. Furthermore, seasons do not wait for human dates; they naturally manifest a full month before their officially stated calendar coordinates. For example, November is already scorchingly hot with the undeniable friction of Summer, yet the modern calendar claims summer only starts in mid-December. Similarly, May is already cataclysmically frigid, glacial, and bone-annihilatingly cold, yet winter is falsely clocked to begin in the last week of June.
        </p>

        <p>
          This physical reality exposes why January and September can never be the first months of the year: they hold a <strong>negative polarity phase</strong>. Even the popular tracking of September via <em>Inzalo yelanga</em> (Adam's Calendar) fails as an absolute spiritual anchor, because it relies on tracking the new year through fixed stone and rock formations. Common sense dictates that the shifting earth and soil move the rocks over time, introducing physical inaccuracy into a purely geological clock.
        </p>

        <p>
          Let me not act clever and fail to give credit where it is due. Under the brilliant tutelage of <strong>HSRM Dr. Imboni uZwilezwe Radebe (iNkosi YamaKhosi Omoya)</strong> and the <strong>African Hidden Voices (AHV)</strong> research team at The Revelation Spiritual Home, this is what I have learned, unlearned, and relearned in the journey of going back to find my true African roots. I did not accept this knowledge blindly. While my sources, especially HSRM, have thoroughly validated themselves through precision events, internal alignment, and external proof leaving no room for doubt, it remains vital to stand as a knower rather than a mere believer. If you seek absolute truth, conduct your own intensive research into the exact geometric alignments that perfected in the cosmos during the month of <strong>July 2026</strong>.
        </p>

        <p style={styles.greetings}>HAPPY 2027!</p>
        <p style={styles.signature}>
          P + P = F
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    color: theme.text,
  },
  title: {
    color: theme.gold,
    fontSize: '2.5rem',
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  content: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
  },
  list: {
    paddingLeft: '20px',
    listStyleType: 'disc',
    marginBottom: '20px',
  },
  greetings: {
    marginTop: '30px',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    color: theme.gold,
  },
  signature: {
    marginTop: '10px',
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.gold,
  },
};