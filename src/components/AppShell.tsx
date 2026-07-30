import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Video, Mic, BarChart3, Stethoscope, Languages, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export function AppShell() {
  const { t, lang, setLang } = useI18n();
  const { pathname } = useLocation();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const tabs = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/exercises", icon: BookOpen, label: t("exercises") },
    { to: "/videos", icon: Video, label: t("videos") },
    { to: "/record", icon: Mic, label: t("record") },
    { to: "/progress", icon: BarChart3, label: t("progress") },
    { to: "/therapist", icon: Stethoscope, label: t("therapist") },
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
    setEmail(null);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="mx-auto max-w-md flex items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-brand shadow-soft flex items-center justify-center text-brand-foreground font-bold">
              V
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm">{t("appName")}</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="flex items-center gap-1.5 rounded-full bg-card shadow-card px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:text-brand transition"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "fr" ? "العربية" : "Français"}
            </button>
            {email ? (
              <button
                onClick={signOut}
                title={email}
                className="flex items-center gap-1.5 rounded-full bg-card shadow-card px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:text-brand transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                {lang === "ar" ? "خروج" : "Sortir"}
              </button>
            ) : (
              <Link
                to="/auth"
                search={{ next: "/" }}
                className="flex items-center gap-1.5 rounded-full bg-gradient-brand text-brand-foreground shadow-soft px-3 py-1.5 text-xs font-semibold"
              >
                <LogIn className="h-3.5 w-3.5" />
                {lang === "ar" ? "دخول" : "Connexion"}
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-5 pb-28 pt-2 animate-in fade-in duration-500" key={pathname}>
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-30 backdrop-blur-xl bg-background/85 border-t border-border/50">
        <div className="mx-auto max-w-md grid grid-cols-6 px-2 py-2">
          {tabs.map(({ to, icon: Icon, label }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium"
              >
                <div
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center transition-all ${
                    active ? "bg-gradient-brand text-brand-foreground shadow-soft scale-105" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                </div>
                <span className={active ? "text-brand" : "text-muted-foreground"}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
