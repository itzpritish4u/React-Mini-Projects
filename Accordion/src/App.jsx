import { useState } from "react";
import Accordion from "./components/Accordion";

const questions = [
  {
    id: 1,
    title: "Do I have to allow the use of cookies?",
    info: "Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art.",
  },
  {
    id: 2,
    title: "How do I change my My Page password?",
    info: "Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse.",
  },
  {
    id: 3,
    title: "What is BankID?",
    info: "Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial.",
  },
  {
    id: 4,
    title: "Whose birth number can I use?",
    info: "Edison bulb direct trade gentrify beard lo-fi seitan sustainable roof party franzen occupy squid. Knausgaard cronut succulents, scenester readymade shabby chic lyft. Copper mug meh vegan gentrify.",
  },
  {
    id: 5,
    title: "When do I recieve a password ordered by letter?",
    info: "Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan ",
  },
];


function App() {
  const [multiple, setMultiple] = useState(true);
  const [questionId, setQuestionId] = useState([]);

  function handleClick() {
    if (multiple) {
      questionId.map((curr) => {
        curr((prev) => !prev);
      });
      setQuestionId([]);
    }
    setMultiple(!multiple);
  }

  return (
    <>
      <h1>Accordion</h1>
      <div>
        <label htmlFor="checkbox">Is multiple open accordion allowed?</label>
        <input
          type="checkbox"
          name=""
          id="checkbox"
          checked={multiple}
          onChange={() => handleClick()}
        />
      </div>

      <div>
        {questions.map((question) => (
          <Accordion
            key={question.id}
            questionId={questionId}
            setQuestionId={setQuestionId}
            multiple={multiple}
            {...question}
          />
        ))}
      </div>
    </>
  );
}

export default App;