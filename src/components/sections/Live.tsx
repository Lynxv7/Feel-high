import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { getTrackSubtitle, tracks } from "@/lib/tracks";

const featuredTracks = tracks.slice(0, 3);

export function Live() {
  return (
    <section id="live" className="relative py-32 sm:py-40 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <span className="text-overline" data-i18n="live.overline">
              03 / Releases
            </span>
            <h2 className="text-display text-5xl sm:text-7xl mt-4">
              Built for <span className="italic text-[var(--color-ember-soft)]">presence</span>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 text-sm text-white/50 leading-relaxed"
            data-i18n="live.description"
          >
            Recent official SoundCloud uploads from the FEEL HIGH catalog.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {featuredTracks.map((track, i) => (
            <motion.a
              key={track.id}
              href={track.soundcloudUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={track.cover}
                alt={track.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4">
                <span className="text-overline">{getTrackSubtitle(track)}</span>
                <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-white/60 group-hover:text-[var(--color-ember)] group-hover:rotate-12 transition" />
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-display text-2xl sm:text-3xl leading-[0.95] break-words">
                  {track.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
