import React from 'react';

enum Levels {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert'
};

enum Categories {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Tools = 'Tools',
  Languages = 'Languages'
};

interface Skill {
  name: string;
  level: Levels;
  category: Categories;
}

const skills: Skill[] = [
  {
    name: 'JavaScript',
    level: Levels.Expert,
    category: Categories.Languages
  },
  {
    name: 'TypeScript',
    level: Levels.Advanced,
    category: Categories.Languages
  },
  {
    name: 'React',
    level: Levels.Expert,
    category: Categories.Frontend
  },
  {
    name: 'Next.js',
    level: Levels.Advanced,
    category: Categories.Frontend
  },
  {
    name: 'Node.js',
    level: Levels.Intermediate,
    category: Categories.Backend
  },
  {
    name: 'Tailwind CSS',
    level: Levels.Advanced,
    category: Categories.Frontend
  },
  {
    name: 'Git',
    level: Levels.Advanced,
    category: Categories.Tools
  },
  {
    name: 'Docker',
    level: Levels.Intermediate,
    category: Categories.Tools
  }
];

const getLevelStyles = (level: Skill['level']) => {
  switch (level) {
    case Levels.Beginner:
      return {
        border: 'border-info/30 hover:border-info',
        badge: 'bg-info/30 text-info font-medium',
        card: 'bg-info/5 hover:bg-info/10'
      };
    case Levels.Intermediate:
      return {
        border: 'border-success/30 hover:border-success',
        badge: 'bg-success/30 text-success font-medium',
        card: 'bg-success/5 hover:bg-success/10'
      };
    case Levels.Advanced:
      return {
        border: 'border-primary/30 hover:border-primary',
        badge: 'bg-primary/30 text-primary font-medium',
        card: 'bg-primary/5 hover:bg-primary/10'
      };
    case Levels.Expert:
      return {
        border: 'border-secondary/30 hover:border-secondary',
        badge: 'bg-secondary/30 text-secondary font-medium',
        card: 'bg-secondary/5 hover:bg-secondary/10'
      };
    default:
      return {
        border: 'border-light/30 hover:border-light',
        badge: 'bg-light/30 text-light font-medium',
        card: 'bg-light/5 hover:bg-light/10'
      };
  }
};

const getCategoryStyles = (category: Skill['category']) => {
  switch (category) {
    case Categories.Frontend:
      return 'text-primary';
    case Categories.Backend:
      return 'text-success';
    case Categories.Tools:
      return 'text-info';
    case Categories.Languages:
      return 'text-secondary';
    default:
      return 'text-foreground';
  }
}

const Skills = () => {
  return (
    <section id='skills' className="skills-section mt-16 py-12 px-4 bg-background text-foreground">
      <div className='container mx-auto max-w-4xl'>
        <h2 className="text-3xl font-bold mb-8 text-primary">My Skills</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SkillsList skills={skills} />
        </div>
      </div>
    </section>
  );
};

const SkillsList = ({ skills }: { skills: Skill[] }) => skills.map((skill, index) => {
  const styles = getLevelStyles(skill.level);
  const categoryStyles = getCategoryStyles(skill.category);

  return (
    <div
      key={index}
      className={`rounded-lg p-2 md:p-4 shadow-lg border ${styles.border} ${styles.card} transition-all duration-300`}
    >
      <h3 className="text-lg font-semibold text-foreground mb-2">{skill.name}</h3>

      <div className="flex items-center justify-start gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
          {skill.level}
        </span>

        <span className={`text-xs ${categoryStyles}`}>
          {skill.category}
        </span>
      </div>
    </div>
  );
})

export default Skills;