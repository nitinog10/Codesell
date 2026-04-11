import { Resend } from "resend";
import PurchaseConfirmationEmail from "../../emails/PurchaseConfirmation";
import CollabInviteEmail from "../../emails/CollabInvite";
import AdminAlertEmail from "../../emails/AdminAlert";

type PurchasedProduct = {
  name: string;
  repoUrl: string;
};

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

async function sendMail({
  to,
  subject,
  react
}: {
  to?: string | null;
  subject: string;
  react: React.ReactElement;
}) {
  if (!to) {
    return;
  }

  const resend = getResend();

  if (!resend) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[email skipped] ${subject} -> ${to}`);
    }

    return;
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "CodeSell <delivered@codesell.dev>",
    to,
    subject,
    react
  });
}

export async function sendPurchaseConfirmationEmail({
  to,
  buyerName,
  products,
  orderId
}: {
  to?: string | null;
  buyerName?: string | null;
  products: PurchasedProduct[];
  orderId: string;
}) {
  await sendMail({
    to,
    subject: "Your CodeSell purchase is confirmed",
    react: (
      <PurchaseConfirmationEmail
        buyerName={buyerName ?? "there"}
        products={products}
        orderId={orderId}
      />
    )
  });
}

export async function sendCollabInviteEmail({
  to,
  buyerName,
  products
}: {
  to?: string | null;
  buyerName?: string | null;
  products: PurchasedProduct[];
}) {
  await sendMail({
    to,
    subject: "Your GitHub repository invite is on its way",
    react: (
      <CollabInviteEmail
        buyerName={buyerName ?? "there"}
        products={products}
      />
    )
  });
}

export async function sendAdminAlertEmail({
  orderId,
  error,
  products
}: {
  orderId: string;
  error: string;
  products: PurchasedProduct[];
}) {
  await sendMail({
    to: process.env.ADMIN_EMAIL,
    subject: `CodeSell collaborator delivery failed for ${orderId}`,
    react: <AdminAlertEmail orderId={orderId} error={error} products={products} />
  });
}
