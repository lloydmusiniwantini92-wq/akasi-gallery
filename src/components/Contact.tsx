"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Check } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", interest: "original" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "", interest: "original" });
  };

  const inputClass =
    "w-full bg-transparent border border-white/10 px-4 py-3 text-white/80 text-sm placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors duration-200";

  return (
    <section
      id="contact"
      ref={ref}
      className="py-48 lg:py-64 bg-[#0d0d0d] border-t border-white/5"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-12 lg:px-24 2xl:px-48">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white/30" />
              <span
                className="text-[10px] tracking-[0.35em] text-white/40 uppercase"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Get in Touch
              </span>
            </div>
            <h2
              id="contact-heading"
              className="text-[clamp(3.5rem,8vw,6.5rem)] font-light text-white leading-[0.85] tracking-[-0.02em] mb-10"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Let's Talk
              <br />
              <em className="italic text-white/50">Art.</em>
            </h2>

            <div
              className="space-y-6 text-white/50 leading-[1.8] text-lg max-w-lg"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <p>
                Whether you're interested in acquiring an original work, commissioning
                a piece, exploring print options, or scheduling a studio visit —
                Akasi would love to hear from you.
              </p>
              <p>Corporate collections, private commissions, and gallery partnerships
              are all warmly welcomed.</p>
            </div>

            <div className="mt-12 space-y-4">
              {[
                { label: "Commissions", detail: "Custom original works available" },
                { label: "Originals", detail: "Inquire for pricing and availability" },
                { label: "Prints", detail: "Worldwide via Printify" },
                { label: "Gallery / Press", detail: "partnerships@akasisart.com" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border-b border-white/5 pb-4"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                  <div>
                    <p
                      className="text-white/80 text-sm font-medium"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-white/35 text-xs"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-label="Contact form"
              noValidate
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-interest" className="sr-only">Interest</label>
                <select
                  id="contact-interest"
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className={`${inputClass} cursor-pointer bg-[#0d0d0d] text-white/50`}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  <option value="original">Original Artwork</option>
                  <option value="commission">Commission a Piece</option>
                  <option value="print">Fine Art Print</option>
                  <option value="studio">Studio Visit</option>
                  <option value="gallery">Gallery / Press Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Your message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  placeholder="Tell Akasi about yourself, what draws you to her work, and how you'd like to connect..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  submitted
                    ? "bg-white/15 text-white border border-white/20"
                    : "bg-white text-black hover:bg-white/90"
                }`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {submitted ? (
                  <>
                    <Check size={14} />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
