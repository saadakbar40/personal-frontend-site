'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useForm } from '@/components/form-context';
import {
  User,
  Calendar,
  Palette,
  UtensilsCrossed,
  Sun,
  Heart,
  Plane,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const ratingLabels = [
  'Trust',
  'Respect',
  'Honesty',
  'Kindness',
  'Communication',
  'Family Values',
];

const groups = {
  personality: ['Introvert', 'Extrovert'],
  drink: ['Tea', 'Coffee'],
  timeOfDay: ['Morning', 'Night'],
  landscape: ['Mountains', 'Beach'],
  entertainment: ['Books', 'Movies'],
};

const choiceMeta: {
  key: keyof typeof groups;
  label: string;
}[] = [
  { key: 'personality', label: 'Personality' },
  { key: 'drink', label: 'Tea or Coffee' },
  { key: 'timeOfDay', label: 'Morning or Night' },
  { key: 'landscape', label: 'Mountains or Beach' },
  { key: 'entertainment', label: 'Books or Movies' },
];

const inputFields: {
  key:
    | 'fullName'
    | 'dateOfBirth'
    | 'favouriteColor'
    | 'favouriteFood'
    | 'favouriteSeason'
    | 'favouriteHobby'
    | 'dreamDestination';
  label: string;
  icon: LucideIcon;
  type?: string;
}[] = [
  { key: 'fullName', label: 'Full Name', icon: User },
  { key: 'dateOfBirth', label: 'Date of Birth', icon: Calendar, type: 'date' },
  { key: 'favouriteColor', label: 'Favourite Color', icon: Palette },
  { key: 'favouriteFood', label: 'Favourite Food', icon: UtensilsCrossed },
  { key: 'favouriteSeason', label: 'Favourite Season', icon: Sun },
  { key: 'favouriteHobby', label: 'Favourite Hobby', icon: Heart },
  { key: 'dreamDestination', label: 'Dream Destination', icon: Plane },
];

const openQuestions = [
  { key: 'happyAnswer' as const, label: 'What makes you genuinely happy?' },
  {
    key: 'qualitiesAnswer' as const,
    label: 'What qualities do you admire most in people?',
  },
  { key: 'trustAnswer' as const, label: 'What does trust mean to you?' },
];

export function AboutYou() {
  const { form, setField, setRating } = useForm();

  return (
    <section id="about-you" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            About you
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Tell me a little about yourself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Nothing here is saved — it&apos;s just a gentle conversation
            between you and this little page.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="glass mt-14 rounded-3xl p-6 sm:p-10"
        >
          {/* Basic fields */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {inputFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <field.icon className="h-4 w-4 text-accent" />
                  {field.label}
                </Label>
                <Input
                  type={field.type ?? 'text'}
                  value={form[field.key] as string}
                  onChange={(e) =>
                    setField(field.key, e.target.value as never)
                  }
                  placeholder={field.label}
                  className="h-11 rounded-xl bg-background/60"
                />
              </div>
            ))}
          </div>

          {/* Personality choices */}
          <div className="mt-10">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-accent" />
              A few little choices
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {choiceMeta.map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {label}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {groups[key].map((opt) => {
                      const active = form[key] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setField(key, opt as never)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            active
                              ? 'border-primary bg-primary text-primary-foreground shadow-md'
                              : 'border-border bg-background/50 text-foreground/70 hover:border-accent hover:text-foreground'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value sliders */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">What you value</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Slide each one to where it sits in your heart.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {ratingLabels.map((label) => (
                <div key={label} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{label}</Label>
                    <span className="text-sm font-semibold text-primary tabular-nums">
                      {form.ratings[label] ?? 5}
                    </span>
                  </div>
                  <Slider
                    value={[form.ratings[label] ?? 5]}
                    onValueChange={([v]) => setRating(label, v)}
                    min={1}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-primary [&_[role=slider]]:shadow-md [&>span:first-child]:bg-muted"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Open questions */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Open questions</h3>
            <div className="mt-5 space-y-5">
              {openQuestions.map((q) => (
                <div key={q.key} className="space-y-2">
                  <Label className="text-sm font-medium">{q.label}</Label>
                  <Textarea
                    value={form[q.key]}
                    onChange={(e) => setField(q.key, e.target.value)}
                    placeholder="Take your time..."
                    className="min-h-[90px] resize-none rounded-xl bg-background/60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ask anything */}
          <div className="mt-6 space-y-2">
            <Label className="text-sm font-medium">
              Ask Saad anything you like.
            </Label>
            <Textarea
              value={form.askAnything}
              onChange={(e) => setField('askAnything', e.target.value)}
              placeholder="Type your question here..."
              className="min-h-[100px] resize-none rounded-xl bg-background/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
