import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calculator, 
  Trophy, 
  Star, 
  Target, 
  Clock, 
  Award,
  TrendingUp,
  Flame,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile, useUserStats, useUserAchievements, useSubjects, useUserProgress } from "@/hooks/useUserData";
import heroImage from "@/assets/hero-students.jpg";

// Icon mapping for dynamic rendering
const iconMap: { [key: string]: React.ReactNode } = {
  'BookOpen': <BookOpen className="h-6 w-6" />,
  'Calculator': <Calculator className="h-6 w-6" />,
  'Star': <Star className="h-4 w-4" />,
  'Flame': <Flame className="h-4 w-4" />,
  'Trophy': <Trophy className="h-4 w-4" />,
  'Award': <Award className="h-4 w-4" />,
};

export const LearningDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  const { data: profile } = useUserProfile();
  const { data: stats } = useUserStats();
  const { data: userAchievements } = useUserAchievements();
  const { data: subjects } = useSubjects();
  const { data: userProgress } = useUserProgress(user?.id);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Welcome back, {profile.display_name}! 🌟
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ready to continue your learning adventure? Let's explore new topics and earn some badges today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="text-lg px-8"
                    onClick={() => navigate('/english')}
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Continue Learning
                  </Button>
                  <Button variant="secondary" size="lg" className="text-lg px-8">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    View Progress ({stats?.exercises_completed || 0} completed)
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src={heroImage} 
                alt="Happy students learning" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats?.total_points || 0}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{stats?.exercises_completed || 0}</div>
              <div className="text-sm text-muted-foreground">Exercises Completed</div>
            </div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{stats?.current_streak || 0}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </Card>
        </div>

        {/* Subject Selection */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {subjects?.map((subject) => {
              const subjectProgress = userProgress?.filter(p => 
                p.exercises?.topics?.subjects?.name === subject.name && p.completed
              ) || [];
              const totalExercises = userProgress?.filter(p => 
                p.exercises?.topics?.subjects?.name === subject.name
              ) || [];
              const progress = totalExercises.length > 0 
                ? Math.round((subjectProgress.length / totalExercises.length) * 100) 
                : 0;

              return (
                <Card 
                  key={subject.id} 
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div 
                      className="p-2 rounded-full mr-4"
                      style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
                    >
                      {iconMap[subject.icon] || <BookOpen className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      <CardDescription>
                        {subjectProgress.length} of {totalExercises.length} exercises completed
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <Link to={`/${subject.name.toLowerCase()}`}>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          Continue Learning
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Your Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userAchievements?.slice(0, 4).map((userAchievement) => {
              const achievement = userAchievement.achievements;
              return (
                <Card 
                  key={userAchievement.id}
                  className="text-center p-4 transition-all duration-300 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
                >
                  <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-primary to-secondary text-white">
                    {iconMap[achievement.icon] || <Star className="h-4 w-4" />}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Earned! 🎉
                  </Badge>
                </Card>
              );
            })}
            
            {(!userAchievements || userAchievements.length === 0) && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Complete your first exercise to start earning achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {userProgress?.slice(0, 4).map((progress) => (
                  <div key={progress.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {progress.exercises?.topics?.subjects?.name === "English" ? (
                          <BookOpen className="h-4 w-4 text-primary" />
                        ) : (
                          <Calculator className="h-4 w-4 text-secondary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {progress.exercises?.topics?.subjects?.name} - {progress.exercises?.topics?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {progress.last_attempt_at 
                            ? new Date(progress.last_attempt_at).toLocaleDateString()
                            : 'Recently'
                          }
                        </div>
                      </div>
                    </div>
                    <Badge variant={progress.completed ? "default" : "outline"}>
                      {progress.completed ? `${progress.score}%` : 'In Progress'}
                    </Badge>
                  </div>
                ))}
                
                {(!userProgress || userProgress.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activity yet. Start learning to see your progress here!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};