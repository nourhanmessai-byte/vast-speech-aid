import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthResult = { redirect_url?: string; redirect_to?: string; client?: { name?: string } | null };

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/auth", search: { next: location.pathname + location.searchStr } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  head: () => ({
    meta: [
      { title: "Autoriser l'accès — VAST Speech" },
      { name: "description", content: "Autorisez une application externe à accéder à votre compte VAST Speech." },
      { property: "og:title", content: "Autoriser l'accès — VAST Speech" },
      { property: "og:description", content: "Approuvez ou refusez la connexion d'une application à votre compte." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Consent,
  errorComponent: ({ error }) => (
    <div className="py-16 text-center space-y-2">
      <h1 className="text-lg font-bold">Impossible de charger cette demande</h1>
      <p className="text-sm text-muted-foreground">{String((error as Error)?.message ?? error)}</p>
    </div>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "une application";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error: err } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Aucune redirection renvoyée par le serveur d'autorisation.");
      return;
    }
    window.location.href = target;
  }

  return (
    <div className="py-10 space-y-5">
      <div className="rounded-3xl bg-card shadow-card p-6 space-y-3 text-center">
        <h1 className="text-xl font-extrabold">Connecter {clientName} à VAST Speech</h1>
        <p className="text-sm text-muted-foreground">
          {clientName} pourra utiliser les outils de VAST Speech en votre nom : consulter le catalogue
          d'exercices et lire ou enregistrer vos séances de pratique.
        </p>
        <p className="text-xs text-muted-foreground">
          Cela ne contourne pas les règles d'accès de l'application. Vous pouvez révoquer l'accès à tout moment.
        </p>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          disabled={busy}
          onClick={() => decide(false)}
          className="rounded-2xl bg-card shadow-card font-bold py-3.5 disabled:opacity-60"
        >
          Annuler
        </button>
        <button
          disabled={busy}
          onClick={() => decide(true)}
          className="rounded-2xl bg-gradient-brand text-brand-foreground font-bold py-3.5 shadow-soft disabled:opacity-60"
        >
          Autoriser
        </button>
      </div>
    </div>
  );
}
