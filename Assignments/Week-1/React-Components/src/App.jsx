import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";
import Form from "./components/Form";
import "./components/components.css";

function App() {
  return (
    <>
      <Header />

      <main className="container">
        <h2 className="title">Reusable React Components</h2>

        <div className="card-container">
          <Card
            title="React"
            description="Build interactive user interfaces using reusable components."
          />

          <Card
            title="Props"
            description="Props allow components to receive data from parent components."
          />

          <Card
            title="State"
            description="State helps components store and update dynamic information."
          />
        </div>

        <div className="button-section">
          <Button text="Primary Button" />
          <Button text="Learn React" />
        </div>

        <Form />
      </main>

      <Footer />
    </>
  );
}

export default App;