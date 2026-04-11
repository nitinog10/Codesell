import type { Metadata } from "next";
import { SignInButton } from "@/components/auth/AuthButton";

export const metadata: Metadata = {
  title: "Sign in"
};

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="content-grid grid min-h-[70vh] items-center py-12">
      <div className="max-w-xl rounded-md border border-neutral-200 bg-white p-8">
        <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
          GitHub OAuth
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Login with GitHub</h1>
        <p className="mt-4 leading-7 text-neutral-600">
          CodeSell uses your GitHub account to identify where repository access
          should be delivered.
        </p>
        <div className="mt-8">
          <SignInButton callbackUrl={callbackUrl ?? "/dashboard"} />
        </div>
      </div>
    </div>
  );
}
