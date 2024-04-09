import React, { useEffect, useState } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import Button from "../components/Button";

const sampleDreams = [
  "Travel the world",
  "Learn to play the guitar",
  "Write a novel",
  "Start my own business",
  "Run a marathon",
  "Learn a new language",
  "Build my dream house",
  "Have a family",
  "Achieve financial independence",
  "Make a significant contribution to my community"
];

const SummaryDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [coreDream, setCoreDream] = useState([]);

  const groupItems = (items, groupSize) => {
    let grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  // Using your dreams array
  const groupedDreams = groupItems(dreams, 3);

  useEffect(() => {
    const fetchedDreams = getClaudeResponse();
    console.log(fetchedDreams);
    const fetchedDreamGeneral = fetchedDreams.slice(0, -1);
    console.log(fetchedDreamGeneral);
    const fetchedCoreDream = [fetchedDreams.slice(-1)[0]];
    console.log(fetchedCoreDream);
    setDreams(fetchedDreamGeneral); // for testing setDreams(sampleDreams);
    setCoreDream(fetchedCoreDream);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-2xl">you're breathtaking...</h1>
        <p className="text-lg">Here is a summary of your dreams</p>
      </header>

      <div className="flex flex-col items-center">
        {groupedDreams.map((group, index) => (
          <div key={index} className="mb-4 flex justify-center gap-4">
            {group.map((dream, index) => (
              <div className="" key={index}>
                <SelectableButton
                  initialText={dream}
                  canSelect={false}
                  startSelected={true}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center ">
        <span className="text-lg font-bold">And the core dream</span>
        {coreDream.length > 0 && (
          <div className="mt-4 flex justify-center">
            <SelectableButton
              initialText={coreDream[0]}
              canSelect={false}
              startSelected={true}
            />
          </div>
        )}
      </div>

      <footer className="summary-footer mt-8 text-center">
        <Button className="m-auto" navigateTo="/welcome-back">
          save & continue
        </Button>
      </footer>
    </div>
  );
};

export default SummaryDreams;
