import { experience, education } from '@/data/index'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { EducationTimeline } from '@/components/EducationTimeline'
import { Card } from '@/components/ui/Card'
import { skills } from '@/data/skills'
import { bio } from '@/data/bio'

export default function About() {
  return (
    <div className="container mx-auto p-6 py-20">
      {/* Hero Bio */}
      <section className="max-w-4xl mx-auto mb-20">
        <Card header="About Me">
          <p className="text-gray-300 leading-relaxed text-lg">
            {bio.full}
          </p>
        </Card>
      </section>

      {/* Skills Grid */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skills.map((skillGroup, index) => (
            <Card key={index} header={skillGroup.category}>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, sIndex) => (
                  <span key={sIndex} className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-purple-300 font-medium text-sm border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Experience Timeline
          </h2>
        </div>
        <ExperienceTimeline experiences={experience} />
      </section>

      {/* Academic Background */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Academic Background
          </h2>
        </div>
        <EducationTimeline education={education} />
      </section>
    </div>
  );
}

