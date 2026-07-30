import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useI18n } from "@/lib/i18n";
import { LogIn, UserPlus, Loader2 } from "lucide-react";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s.next) }),
  head: () => ({
    meta: [
      { title: "Connexion — VAST Speech | تسجيل الدخول" },
      {
        name: "description",
        content:
          "Connectez-vous à VAST Speech pour retrouver vos exercices d'orthophonie bilingues et votre progression.",
      },
      { property: "og:title", content: "Connexion — VAST Speech" },
      {
        property: "og:description",
        content: "Accédez à vos séances de rééducation de la parole VAST Speech.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { lang } = useI18n();
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const ar = lang === "ar";
  const T = {
    title: ar ? "تسجيل الدخول" : "Connexion",
    sub: ar
      ? "سجّل الدخول لحفظ تقدّمك وربط حسابك بمساعد ذكي"
      : "Connectez-vous pour enregistrer votre progression et connecter un assistant IA",
    email: ar ? "البريد الإلكتروني" : "E-mail",
    password: ar ? "كلمة المرور" : "Mot de passe",
    signin: ar ? "دخول" : "Se connecter",
    signup: ar ? "إنشاء حساب" : "Créer un compte",
    google: ar ? "المتابعة بحساب Google" : "Continuer avec Google",
    toggleToSignup: ar ? "ليس لديك حساب؟ إنشاء حساب" : "Pas de compte ? Créer un compte",
    toggleToSignin: ar ? "لديك حساب؟ تسجيل الدخول" : "Déjà un compte ? Se connecter",
    check: ar ? "تحقّق من بريدك لتأكيد الحساب." : "Vérifiez votre e-mail pour confirmer le compte.",
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.replace(next);
    });
  }, [next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + next },
        });
        if (error) throw error;
        setMsg(T.check);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.replace(next);
        return;
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    setMsg(null);
    const result = (await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + next,
    })) as { error?: { message?: string } | Error; redirected?: boolean };
    if (result.error) {
      setMsg(result.error.message ?? "OAuth error");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    window.location.replace(next);
  };

  return (
    <div className="py-8 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold">{T.title}</h1>
        <p className="text-sm text-muted-foreground">{T.sub}</p>
      </div>

      <form onSubmit={submit} className="rounded-3xl bg-card shadow-card p-5 space-y-3">
        <label className="block text-xs font-bold text-muted-foreground">{T.email}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
        />
        <label className="block text-xs font-bold text-muted-foreground">{T.password}</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand text-brand-foreground font-bold py-3.5 shadow-soft disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
          {mode === "signin" ? T.signin : T.signup}
        </button>
      </form>

      <button
        onClick={google}
        disabled={busy}
        className="w-full rounded-2xl bg-card shadow-card font-bold py-3.5 disabled:opacity-60"
      >
        {T.google}
      </button>

      {msg && <p className="text-center text-sm text-destructive">{msg}</p>}

      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="w-full text-xs font-bold text-brand"
      >
        {mode === "signin" ? T.toggleToSignup : T.toggleToSignin}
      </button>
    </div>
  );
}
