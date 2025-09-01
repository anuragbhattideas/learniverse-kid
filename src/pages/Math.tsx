import { Navigation } from "@/components/Navigation";
import { MathExercise } from "@/components/exercises/MathExercise";

const Math = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <MathExercise />
    </div>
  );
};

export default Math;