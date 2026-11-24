import { motion } from 'framer-motion'
import { services } from '../data/profile'

const serviceIcons = {
  code: (
    <svg className="w-6 h-6 text-crimson-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  cube: (
    <svg className="w-6 h-6 text-crimson-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  sparkles: (
    <svg className="w-6 h-6 text-crimson-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  rocket: (
    <svg className="w-6 h-6 text-crimson-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

export default function ServicesSection() {
  return (
    <div className="w-full">
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card-red flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-crimson/50 group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/15 border border-crimson/30 group-hover:scale-110 transition-transform">
                  {serviceIcons[service.icon]}
                </div>
                <span className="font-mono text-xs font-bold text-content-dim tracking-widest">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-white group-hover:text-crimson-bright transition-colors">
                {service.title}
              </h3>

              <p className="mt-2.5 text-sm text-content-secondary leading-relaxed">
                {service.description}
              </p>

              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-crimson-bright mb-3">
                  Key Capabilities
                </p>
                <ul className="space-y-2">
                  {service.deliverables.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-crimson-bright" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-crimson-bright transition-colors"
              >
                <span>Inquire About This Service</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
