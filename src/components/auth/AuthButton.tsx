import { signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export function SignInButton({
  label = "Login with GitHub",
  callbackUrl = "/dashboard"
}: {
  label?: string;
  callbackUrl?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: callbackUrl });
      }}
    >
      <Button type="submit">{label}</Button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit" variant="secondary">
        Logout
      </Button>
    </form>
  );
}
