```typescript
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
import { sharedStyles } from "../../utils/sharedStyles";

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
      <Body style={sharedStyles.body}>
        <Container style={sharedStyles.container}>
          <Heading style={sharedStyles.heading}>Purchase confirmed</Heading>
          <Text style={sharedStyles.text}>Hi {buyerName},</Text>
          <Text style={sharedStyles.text}>
            Your payment was received. We are sending GitHub read-only
            collaborator invites for the repositories below.
          </Text>
          <Section>
            {products.map((product) => (
              <Text key={product.repoUrl} style={sharedStyles.item}>
                <Link href={product.repoUrl} style={sharedStyles.link}>
                  {product.name}
                </Link>
              </Text>
            ))}
          </Section>
          <Text style={sharedStyles.muted}>Order ID: {orderId}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```