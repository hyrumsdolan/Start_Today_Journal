import React, { useState, useEffect } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useMutation } from "@apollo/client";
import { ADD_LITTLE_DREAMS } from "../utils/mutations";
import useUserNavigation from "../utils/userNavigation";

const AndNext = ({ user }) => {
  const [selectedDreams, setSelectedDreams] = useState({});
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();
  const [addLittleDreams] = useMutation(ADD_LITTLE_DREAMS);
  const [isLoading, setIsLoading] = useState(false);
  const handleMutationCompleted = useUserNavigation();

const REQUIRED_COUNT = 10

  useEffect(() => {
    const fetchedDreams = getClaudeResponse(); // Core dream is last element
    setDreams(fetchedDreams);
  }, []);

  const toggleDreamSelection = (dream, isSelected) => {
    setSelectedDreams(prevSelected => ({
      ...prevSelected,
      [dream]: isSelected
    }));
    console.log(Object.keys(selectedDreams).filter(
      dream => selectedDreams[dream]
    ).length)
    console.log(Object.keys(selectedDreams).filter(
      dream => selectedDreams[dream]
    ).length === REQUIRED_COUNT)
  };


  const handleSave = async () => {
    try {
      setIsLoading(true);
      // const selectedDreamsArray = Object.keys(selectedDreams).filter(
      //   dream => selectedDreams[dream]
      // );
      // await addLittleDreams({
      //   variables: { littleDreams: selectedDreamsArray }
      // });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <main className="grid grid-cols-1 justify-around gap-1 md:grid-cols-2 lg:grid-cols-3">
        {dreams.map((dream, index) => (
          <div className="m-10" key={index}>
            <SelectableButton
            
              initialText={dream}
              onSelect={isSelected => toggleDreamSelection(dream, isSelected)}
            />
          </div>
        ))}
      </main>
      <Button
        onClick={handleSave}
        className="r-0 absolute right-0 m-10"
        user={user}
        saveToUser="littledreams"
        isEnabled={Object.keys(selectedDreams).filter(
          dream => selectedDreams[dream]
        ).length === REQUIRED_COUNT}
        inputForDBSave={Object.keys(selectedDreams).filter(
          dream => selectedDreams[dream]
        )}
        onMutationCompleted={handleMutationCompleted}
      >
        save & continue
      </Button>
    </div>
  );
};

export default AndNext;
