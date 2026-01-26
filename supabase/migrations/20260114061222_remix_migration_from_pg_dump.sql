CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: get_email_by_mobile(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_email_by_mobile(mobile text) RETURNS text
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT email FROM public.profiles WHERE mobile_number = mobile LIMIT 1;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: auth_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    action text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT auth_logs_action_check CHECK ((action = ANY (ARRAY['login'::text, 'logout'::text])))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    email text NOT NULL,
    mobile_number text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: auth_logs auth_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_logs
    ADD CONSTRAINT auth_logs_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: idx_auth_logs_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_auth_logs_created_at ON public.auth_logs USING btree (created_at DESC);


--
-- Name: idx_auth_logs_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_auth_logs_email ON public.auth_logs USING btree (email);


--
-- Name: idx_profiles_mobile_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_profiles_mobile_number ON public.profiles USING btree (mobile_number);


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: auth_logs No one can delete auth logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "No one can delete auth logs" ON public.auth_logs FOR DELETE USING (false);


--
-- Name: auth_logs Users can insert their own auth logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own auth logs" ON public.auth_logs FOR INSERT WITH CHECK ((email = (auth.jwt() ->> 'email'::text)));


--
-- Name: profiles Users can insert their own profile only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile only" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: auth_logs Users can view their own auth logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own auth logs" ON public.auth_logs FOR SELECT TO authenticated USING ((email = ( SELECT (auth.jwt() ->> 'email'::text))));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view their own profile only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile only" ON public.profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: auth_logs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;