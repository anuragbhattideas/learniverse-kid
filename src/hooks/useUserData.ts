import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUserStats = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useUserAchievements = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['userAchievements', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievements (*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useTopics = (subjectId?: string) => {
  return useQuery({
    queryKey: ['topics', subjectId],
    queryFn: async () => {
      if (!subjectId) return [];
      
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('subject_id', subjectId)
        .order('order_index');
      
      if (error) throw error;
      return data;
    },
    enabled: !!subjectId,
  });
};

export const useExercises = (topicId?: string) => {
  return useQuery({
    queryKey: ['exercises', topicId],
    queryFn: async () => {
      if (!topicId) return [];
      
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('topic_id', topicId)
        .order('difficulty_level');
      
      if (error) throw error;
      return data;
    },
    enabled: !!topicId,
  });
};

export const useUserProgress = (userId?: string) => {
  return useQuery({
    queryKey: ['userProgress', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          exercises (
            title,
            topics (
              name,
              subjects (name)
            )
          )
        `)
        .eq('user_id', userId)
        .order('last_attempt_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useUpdateUserProgress = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ exerciseId, completed, score }: { 
      exerciseId: string; 
      completed: boolean; 
      score: number; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          exercise_id: exerciseId,
          completed,
          score,
          last_attempt_at: new Date().toISOString(),
          completed_at: completed ? new Date().toISOString() : null,
          attempts: 1,
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    },
  });
};

export const useAllAchievements = () => {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('requirement_value');
      
      if (error) throw error;
      return data;
    },
  });
};