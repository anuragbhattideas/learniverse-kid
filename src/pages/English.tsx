import { Navigation } from "@/components/Navigation";
import { EnglishExercise } from "@/components/exercises/EnglishExercise";

const English = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <EnglishExercise />
    </div>
  );
};

export default English;