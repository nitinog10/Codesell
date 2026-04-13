```
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
import { sharedStyles } from "src/lib/shared-styles";

export default function CollabInviteEmail({
  buyerName,
  products
}: {
  buyerName: string;
  products: Array<{ name: string; repoUrl: string }>;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your GitHub collaborator invite has been sent.</Preview>
      <Body style={sharedStyles.body}>
        <Container style={sharedStyles.container}>
          <Heading style={sharedStyles.heading}>GitHub invite sent</Heading>
          <Text style={sharedStyles.text}>Hi {buyerName},</Text>
          <Text style={sharedStyles.text}>
            The collaboration invite has been sent to your GitHub email.
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
          <Text style={sharedStyles.muted}>
            Accept the invite from GitHub to clone and view the repository.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```