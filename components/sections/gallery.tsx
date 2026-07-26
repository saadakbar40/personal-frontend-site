'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ZoomIn, Camera } from 'lucide-react'
import { useProfile } from '@/components/profile-context'

// const galleryImages = [
//   {
//     src: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900',
//     alt: 'Soft purple flowers in a quiet field',
//     label: 'Quiet blooms',
//   },
//   {
//     src: 'https://images.pexels.com/photos/36717/person-people-girl-hair.jpg?auto=compress&cs=tinysrgb&w=900',
//     alt: 'A calm portrait in soft light',
//     label: 'Soft light',
//   },
//   {
//     src: 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&w=900',
//     alt: 'A peaceful path through green trees',
//     label: 'The path',
//   },
//   {
//     src: 'https://images.pexels.com/photos/255464/pexels-photo-255464.jpeg?auto=compress&cs=tinysrgb&w=900',
//     alt: 'A cup of tea resting on a wooden table',
//     label: 'Slow mornings',
//   },
// ];

const galleryImages = [
  {
    src: '/images/coffee.face.png',
    alt: 'Couple holding hands',
    label: 'Together',
  },
  {
    src: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Romantic sunset',
    label: 'Golden Sunset',
  },
  {
    src: '/images/cofi.jpg',
    alt: 'Heart shaped leaves',
    label: 'Little Moments',
  },
  {
    src: '/images/couple-4027859_1280.jpg',
    alt: 'Rose flowers',
    label: 'Beautiful Roses',
  },
  {
    src: '/images/couple-6976409_640.jpg',
    alt: 'Love letter',
    label: 'Sweet Words',
  },
  {
    src: '/images/feling.jpg',
    alt: 'Coffee for two',
    label: 'Coffee Time',
  },
  {
    src: '/images/hart.jpg',
    alt: 'Red heart',
    label: 'Pure Heart',
  },
  {
    src: '/images/kiss.jpg',
    alt: 'Romantic flowers',
    label: 'Forever Bloom',
  },
  {
    src: '/images/laptop.webp',
    alt: 'Romantic lights',
    label: 'Dream Lights',
  },
  {
    src: '/images/smile.jpg',
    alt: 'Sunset together',
    label: 'Endless Journey',
  },
  {
    src: '/images/studi.jpg',
    alt: 'Sunset together',
    label: 'Endless Journey',
  },
  {
    src: '/images/studi2.png',
    alt: 'Sunset together',
    label: 'Endless Journey',
  },
  {
    src: '/images/camra.jpg',
    alt: 'Sunset together',
    label: 'Endless Journey',
  },
]

export function Gallery() {
  const { photo, setPhoto } = useProfile()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Gallery
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            A few quiet moments
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Small, still images — like postcards from a calm afternoon. You can
            also set your own profile photo here.
          </p>
        </motion.div>

        {/* Profile photo card with change button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-md"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-8 text-center">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-card bg-gradient-to-br from-purple-500/15 to-emerald-500/10 shadow-xl sm:h-48 sm:w-48">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt="Your profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl">
                  🌸
                </div>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all hover:scale-105 hover:bg-primary/90"
            >
              <Camera className="h-4 w-4" />
              Change Profile Photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <p className="mt-4 text-xs text-muted-foreground">
              Choose a photo from your device — preview only, nothing is
              uploaded.
            </p>
          </div>
        </motion.div>

        {/* Image grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-strong text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </div>
              <figcaption className="absolute bottom-4 left-4 text-sm font-medium text-white drop-shadow">
                {img.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
