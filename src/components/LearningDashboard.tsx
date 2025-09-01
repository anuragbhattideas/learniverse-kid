import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, Trophy, Star, Flame, Target } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  type: 'gold' | 'silver' | 'bronze';
}

export const LearningDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects: Subject[] = [
    {
      id: 'english',
      name: 'English',
      icon: BookOpen,
      color: 'english',
      progress: 75,
      completedLessons: 15,
      totalLessons: 20,
      description: 'Master vocabulary, grammar, and reading comprehension'
    },
    {
      id: 'math',
      name: 'Mathematics', 
      icon: Calculator,
      color: 'math',
      progress: 60,
      completedLessons: 12,
      totalLessons: 20,
      description: 'Learn arithmetic, fractions, decimals, and geometry'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'vocab-master',
      title: 'Vocabulary Master',
      description: 'Learned 100 new words',
      icon: Star,
      earned: true,
      type: 'gold'
    },
    {
      id: 'math-whiz',
      title: 'Math Whiz',
      description: 'Solved 50 word problems',
      icon: Target,
      earned: true,
      type: 'silver'
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Study 7 days in a row',
      icon: Flame,
      earned: false,
      type: 'bronze'
    }
  ];

  const recentActivity = [
    { subject: 'English', activity: 'Completed Reading Comprehension Quiz', score: 95, time: '2 hours ago' },
    { subject: 'Math', activity: 'Mastered Fraction Basics', score: 88, time: '1 day ago' },
    { subject: 'English', activity: 'Grammar Challenge', score: 92, time: '2 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-float">
                Welcome to{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Learniverse
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Your magical journey to master English and Math! Track your progress, earn achievements, and have fun learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Trophy className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  View Progress Report
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src={heroImage} 
                alt="Happy students learning" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-card animate-bounce-gentle"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">1,250</div>
              <div className="text-primary-foreground/90">Total Points</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary text-secondary-foreground shadow-soft">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">27</div>
              <div className="text-secondary-foreground/90">Lessons Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-accent text-accent-foreground shadow-soft">
            <CardContent className="p-6 text-center">
              <Flame className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-accent-foreground/90">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Selection */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Choose Your Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <Card 
                  key={subject.id}
                  className={`hover:shadow-card transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedSubject === subject.id ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${subject.color}/10`}>
                        <IconComponent className={`h-8 w-8 text-${subject.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{subject.name}</CardTitle>
                        <CardDescription className="text-base">{subject.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-3" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {subject.completedLessons}/{subject.totalLessons} lessons completed
                        </span>
                        <Button 
                          size="sm" 
                          className={`bg-${subject.color} hover:bg-${subject.color}/90`}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <Card 
                  key={achievement.id}
                  className={`text-center ${achievement.earned ? 'bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20' : 'opacity-50'}`}
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex p-4 rounded-full mb-4 ${
                      achievement.earned 
                        ? `bg-${achievement.type}/20 text-${achievement.type}` 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="outline" className={`border-${achievement.type} text-${achievement.type}`}>
                        Earned!
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        In Progress
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{activity.activity}</div>
                      <div className="text-sm text-muted-foreground">{activity.subject} • {activity.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{activity.score}%</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};