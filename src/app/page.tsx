import { Container, Main, Section } from "@/components/craft";
import Header from "@/components/header";

export default function Home() {
  return (
    <Main>
      <Section>
        <Container className="mx-auto">
          <Header />
          <h1 className="text-5xl font-medium uppercase">
            This is biggest heading
          </h1>
        </Container>
      </Section>
    </Main>
  );
}
