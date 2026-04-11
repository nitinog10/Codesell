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

export default function AdminAlertEmail({
  orderId,
  error,
  products
}: {
  orderId: string;
  error: string;
  products: Array<{ name: string; repoUrl: string }>;
}) {
  return (
    <Html>
      <Head />
      <Preview>CodeSell collaborator delivery failed.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Delivery failed</Heading>
          <Text style={styles.text}>Order {orderId} needs manual review.</Text>
          <Text style={styles.error}>{error}</Text>
          <Section>
            {products.map((product) => (
              <Text key={product.repoUrl} style={styles.item}>
                <Link href={product.repoUrl} style={styles.link}>
                  {product.name}
                </Link>
              </Text>
            ))}
          </Section>
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
    color: "#d94f45",
    fontSize: "28px",
    lineHeight: "36px"
  },
  text: {
    fontSize: "16px",
    lineHeight: "24px"
  },
  error: {
    backgroundColor: "#fff3f1",
    border: "1px solid #e4a29a",
    borderRadius: "8px",
    color: "#8f2d24",
    fontSize: "14px",
    lineHeight: "22px",
    padding: "12px"
  },
  item: {
    fontSize: "16px",
    lineHeight: "24px",
    margin: "10px 0"
  },
  link: {
    color: "#126b59"
  }
} as const;
