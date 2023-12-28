import Container from "./Container";
import Counter from "./Counter";

function AppCounter() {
  const model = {
    a: "1",
    b: "2",
    c: "3",
  };
  return (
    <Container>
      <div>
        <Counter model={model} />
      </div>
    </Container>
  );
}

export default AppCounter;
