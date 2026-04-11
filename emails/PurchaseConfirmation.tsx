import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text
} from "@react-email/components";

export default function PurchaseConfirmationEmail({
  buyerName,
  products,
  orderId
}: {
  buyerName: string;
  products: Array<{ name: string; repoUrl: string }>;
  orderId: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your CodeSell purchase is confirmed.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Purchase confirmed</Heading>
          <Text style={styles.text}>Hi {buyerName},</Text>
          <Text style={styles.text}>
            Your payment was received. We are sending GitHub read-only
            collaborator invites for the repositories below.
          </Text>
          <Section>
            {products.map((product) => (
              <Text key={product.repoUrl} style={styles.item}>
                <Link href={product.repoUrl} style={styles.link}>
                  {product.name}
                </Link>
              </Text>
            ))}
          </Section>
          <Text style={styles.muted}>Order ID: {orderId}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f5f7f8",
    color: "#1b1b1b",
    fontFamily: "Arial, sans-serif"
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #dedede",
    borderRadius: "8px",
    margin: "32px auto",
    padding: "28px",
    width: "560px"
  },
  heading: {
    color: "#1f8a70",
    fontSize: "28px",
    lineHeight: "36px"
  },
  text: {
    fontSize: "16px",
    lineHeight: "24px"
  },
  item: {
    fontSize: "16px",
    lineHeight: "24px",
    margin: "10px 0"
  },
  link: {
    color: "#126b59"
  },
  muted: {
    color: "#686868",
    fontSize: "13px"
  }
} as const;
