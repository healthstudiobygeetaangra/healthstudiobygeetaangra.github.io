import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Log auth events (deferred to avoid deadlock)
        if (session?.user?.email && (event === 'SIGNED_IN' || event === 'SIGNED_OUT')) {
          setTimeout(() => {
            logAuthAction(session.user.email!, event === 'SIGNED_IN' ? 'login' : 'logout');
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logAuthAction = async (email: string, action: 'login' | 'logout') => {
    try {
      await supabase.from('auth_logs').insert({ email, action });
    } catch (error) {
      console.error('Failed to log auth action:', error);
    }
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithGoogle = async (redirectTo?: string) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo ?? `${window.location.origin}/`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    const email = user?.email;
    const { error } = await supabase.auth.signOut();
    if (!error && email) {
      // Log logout action after successful signout
      try {
        await supabase.from('auth_logs').insert({ email, action: 'logout' });
      } catch (e) {
        console.error('Failed to log logout:', e);
      }
    }
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };
};
